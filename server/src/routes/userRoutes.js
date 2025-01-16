/**
 * Author: Monayem Hossain Limon
 * GitHub: https://github.com/Limon00001
 * Date: 01/14/2024
 * @copyright 2024 monayem_hossain_limon
 */

// External Dependencies
import express from "express";

// Internal Dependencies
import { getUser } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

// Routes Initialize
const userRouter = express.Router();

// Routes Setup
userRouter.get("/get-user", userAuth, getUser);

// Export
export default userRouter;
