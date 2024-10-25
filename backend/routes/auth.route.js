import express from "express";
import { login, signup, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken,checkAuth)

router.post("/signup", signup);     // Signup route
router.post("/login", login);       // Login route
router.post("/logout", logout);     // Logout route
router.post("/verify-email", verifyEmail);   // Verify email route
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);


export default router;
