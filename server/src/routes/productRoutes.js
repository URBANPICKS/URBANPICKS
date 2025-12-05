// server/src/routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getProductBySlug,
} from "../controllers/productController.js";

const router = express.Router();

// GET /api/products
router.get("/", getProducts);

// GET /api/products/:slug
router.get("/:slug", getProductBySlug);

export default router;