// server/src/controllers/productController.js
import Product from "../models/Product.js";
import { createError } from "../utils/validationUtils.js";

// GET /api/products
// Optional query: ?category=Wearable&tag=Premium
export async function getProducts(req, res, next) {
  try {
    const { category, tag } = req.query;

    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (tag) {
      filter.tag = tag;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/products/:slug
export async function getProductBySlug(req, res, next) {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug });

    if (!product) {
      throw createError("Product not found", 404);
    }

    res.json({
      success: true,
      product,
    });
  } catch (err) {
    next(err);
  }
}