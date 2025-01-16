/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import express from "express";

// Internal Dependencies
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, verifyEmail, verifyOtp } from "../controllers/authController.js";
import userAuth from "../middlewares/userAuth.js";

// Routes Initialize
const authRouter = express.Router();

// Routes Setup
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", userAuth, verifyOtp);
authRouter.post("/verify-account", userAuth, verifyEmail);
authRouter.get("/is-auth", userAuth, isAuthenticated);
authRouter.post("/send-reset-otp", sendResetOtp);
authRouter.post("/reset-password", resetPassword);

// Export
export default authRouter;