// server/src/routes/xpRoutes.js
import express from "express";
import {
  addXP,
  getXPOverview,
  getXPHistory,
} from "../controllers/xpController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/xp/add       -> add XP for an event
router.post("/add", authMiddleware, addXP);

// GET  /api/xp/overview  -> current XP + tier + next tier info
router.get("/overview", authMiddleware, getXPOverview);

// GET  /api/xp/history   -> recent XP logs
router.get("/history", authMiddleware, getXPHistory);

export default router;