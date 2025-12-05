// server/src/controllers/orderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { createError } from "../utils/validationUtils.js";
import { applyXPToUser } from "../utils/xpCalculator.js";
import User from "../models/User.js";
import XPLog from "../models/XPLog.js";

// POST /api/orders
// body: { items: [{ productId, quantity }], paymentProvider?, paymentRef? }
export async function createOrder(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw createError("Not authorized", 401);
    }

    const { items, paymentProvider, paymentRef } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      throw createError("Order items are required", 400);
    }

    // Load product details
    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== items.length) {
      throw createError("One or more products not found", 404);
    }

    let totalAmount = 0;
    let totalXP = 0;

    const orderItems = items.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.productId
      );
      const quantity = item.quantity || 1;

      const lineAmount = product.price * quantity;
      const lineXP = (product.xpReward || 0) * quantity;

      totalAmount += lineAmount;
      totalXP += lineXP;

      return {
        productId: product._id,
        name: product.name,
        quantity,
        price: product.price,
        xpReward: product.xpReward || 0,
      };
    });

    // Decide payment fields (even if gateway not integrated yet)
    const provider = paymentProvider || "none";
    const ref = paymentRef || null;

    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      totalXP,
      paymentProvider: provider,
      paymentRef: ref,
      status: provider === "none" ? "pending" : "paid",
      paymentStatus: provider === "none" ? "unpaid" : "paid",
    });

    // Apply XP to user + log
    const user = await User.findById(userId);
    if (user && totalXP > 0) {
      applyXPToUser(user, totalXP);
      await user.save();

      await XPLog.create({
        userId: user._id,
        event: "purchase",
        xp: totalXP,
        meta: { orderId: order._id, totalAmount },
      });
    }

    res.status(201).json({
      success: true,
      order,
      xpGranted: totalXP,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/orders/my
export async function getMyOrders(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw createError("Not authorized", 401);
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    next(err);
  }
}