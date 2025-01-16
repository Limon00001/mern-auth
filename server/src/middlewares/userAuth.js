/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import jwt from "jsonwebtoken";

// Middleware
const userAuth = (req, res, next) => {
    const { token } = req.cookies;

    // Check if token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated! Please log in again."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if token is valid
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated!"
            })
        }

        // Attach user ID to request
        req.body.userId = decoded.id;

        next();

    } catch (error) {
        // Return an error response
        return res.status(401).json({
            success: false,
            message: "User not authenticated!"
        })
    }

}

// Export
export default userAuth