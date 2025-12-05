// server/src/routes/userRoutes.js
import express from "express";
import { registerUser, loginUser, getProfile } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/users/register  -> create new user
router.post("/register", registerUser);

// POST /api/users/login  -> login existing user
router.post("/login", loginUser);

// GET /api/users/profile  -> get logged-in user's profile (protected)
router.get("/profile", authMiddleware, getProfile);

export default router;