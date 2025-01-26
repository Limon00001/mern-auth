/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies

// Internal Dependencies
import User from "../models/userModel.js";

// 
const getUser = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(400).json({
                error: {
                    success: false,
                    message: "Invalid user."
                }
            })
        }

        res.status(200).json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                lastLogin: user.lastLogin
            }
        })
    } catch (error) {
        return res.status(500).json({ 
            error: { 
                success: false, 
                message: error.message || "Something went wrong."
            }
        });
    }
}

export { getUser };
