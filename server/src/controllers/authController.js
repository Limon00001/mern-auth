/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Internal Dependencies
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplate.js";
import transporter from "../config/nodemailer.js";
import User from "../models/userModel.js";
import { generateCode } from "../utils/generateCode.js";

// Registration
const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            error: {
                success: false,
                message: "All fields are required"
            }
        });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "User already exists."
                }
            });
        }

        // Hash the password
        const salt = parseInt(process.env.SALT_NUMBER);
        const hashedPassword = await bcrypt.hash(password, salt);  // Fixed spelling

        // Create a new user
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        await user.save();

        // Create a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        // Set cookie with the token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // Send the welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Authentication",
            text: `Welcome ${name}. Your account was successfully registered with email: ${email}!`
        };

        await transporter.sendMail(mailOptions);

        // Return a success response
        return res.status(200).json({
            success: true
        });

    } catch (error) {
        // Return an error response
        return res.status(500).json({
            error: {
                success: false,
                message: error.message || 'Something went wrong.'
            }
        });
    }
};

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.status(400).json({
            error: {
                success: false,
                message: "All fields are required."
            }
        })
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "Invalid email or password. Please try again."
                }
            })
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "Invalid email or password. Please try again."
                }
            })
        }

        // Create a token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        // Set cookie with the token
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000    // 7 day
        });

        // Update last login
        user.lastLogin = Date.now();

        // Save the user
        await user.save();

        // Return a success response
        return res.status(200).json({
            success: true,
        });

    } catch (error) {
        // Return an error response
        return res.status(500).json({
            error: {
                success: false,
                message: error.message || 'Something went wrong.'
            }
        })
    }
}

// Logout
const logout = async (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "Logged out successfully."
        });

    } catch (error) {
        // Return an error response
        return res.status(500).json({
            error: {
                success: false,
                message: error.message || 'Something went wrong.'
            }
        })
    }
}

// Send verification OTP to user's email
const verifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);

        // Check if user is already verified
        if (user.isAccountVerified) {
            return res.status(400).json({
                success: false,
                message: "Account already verified."
            })
        }

        // Generate a random 6-digit OTP
        // const otp = (Math.floor(100000 + Math.random() * 1000000)).toString();
        const otp = generateCode(6);

        // Save the OTP to the user's document
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000; // 5 minutes

        // Save the user
        await user.save();

        // Send the OTP to the user's email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify your account",
            // text: `Your verification code is: ${otp}`,
            html: EMAIL_VERIFY_TEMPLATE.replace('{{otp}}', otp).replace('{{email}}', user.email)
        };

        await transporter.sendMail(mailOptions);

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully."
        });

    } catch (error) {
        // Return an error response
        return res.status(500).json({
            error: {
                success: false,
                message: error.message || 'Something went wrong.'
            }
        })
    }
}

// Verify user's email
const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    // Validation
    if (!userId || !otp) {
        return res.status(400).json({
            error: {
                success: false,
                message: "Missing details."
            }
        })
    }

    try {
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "Invalid user."
                }
            })
        }

        // Check if the OTP is correct
        if (user.verifyOtp !== otp || user.verifyOtp === '') {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "Invalid OTP."
                }
            })
        }

        // Check if the OTP has expired
        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "OTP expired."
                }
            })
        }

        // Mark the user as verified
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        // Save the user
        await user.save();

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "Email verified successfully."
        });

    } catch (error) {
        // Return an error response
        return res.status(500).json({
            error: {
                success: false,
                message: error.message || 'Something went wrong.'
            }
        })
    }
}

// Check if user is authenticated
const isAuthenticated = async (req, res, next) => {
    try {
        // Send a success response
        return res.status(200).json({
            success: true,
        })
    } catch (error) {
        // Return an error response
        return res.status(401).json({
            success: false,
            message: "Not authenticated."
        })
    }
}

// Send reset OTP to user's email
const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    // Validation
    if (!email) {
        return res.status(400).json({
            error: {
                success: false,
                message: "Email is required."
            }
        })
    }

    try {
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "Invalid user."
                }
            })
        }

        // Generate a random 6-digit OTP
        const otp = (Math.floor(100000 + Math.random() * 1000000)).toString();

        // Save the OTP to the user's document
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 5 * 60 * 1000; // 5 minutes

        // Save the user
        await user.save();

        // Send the OTP to the user's email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password Reset OTP",
            // text: `Your reset code is: ${otp}`,
            html: PASSWORD_RESET_TEMPLATE.replace('{{otp}}', otp).replace('{{email}}', user.email)
        };

        await transporter.sendMail(mailOptions);

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully."
        });
    } catch (error) {
        // Return an error response
        return res.status(500).json({
            error: {
                success: false,
                message: error.message || 'Something went wrong.'
            }
        })
    }
}

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Validation
    if (!email || !otp || !newPassword) {
        return res.status(400).json({
            error: {
                success: false,
                message: "Missing details."
            }
        })
    }

    try {
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "Invalid user."
                }
            })
        }

        // Check if the OTP is correct
        if (user.resetOtp !== otp || user.resetOtp === '') {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "Invalid OTP."
                }
            })
        }

        // Check if the OTP has expired
        if (user.resetOtpExpireAt < Date.now()) {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "OTP expired."
                }
            })
        }

        // Hash the password
        const salt = parseInt(process.env.SALT_NUMBER);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = 0;

        // Save the user
        await user.save();

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully."
        });
    } catch (error) {
        // Return an error response
        return res.status(500).json({
            error: {
                success: false,
                message: error.message || 'Something went wrong.'
            }
        })
    }
}

// Export
export { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, verifyEmail, verifyOtp };

