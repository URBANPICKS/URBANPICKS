// server/src/routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getMyOrders,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new order (protected)
router.post("/", authMiddleware, createOrder);

// Get current user's orders (protected)
router.get("/my", authMiddleware, getMyOrders);

export default router;