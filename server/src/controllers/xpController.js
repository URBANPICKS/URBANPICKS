// server/src/controllers/xpController.js
import User from "../models/User.js";
import XPLog from "../models/XPLog.js";
import { applyXPToUser } from "../utils/xpCalculator.js";
import { createError } from "../utils/validationUtils.js";

// POST /api/xp/add
// body: { event: "purchase", xp: 20, meta: { productId, amount } }
export async function addXP(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw createError("Not authorized", 401);
    }

    const { event, xp, meta } = req.body;

    if (!event || typeof xp !== "number") {
      throw createError("Event and numeric xp are required", 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createError("User not found", 404);
    }

    // Apply XP change to user
    applyXPToUser(user, xp);
    await user.save();

    // Create XP log
    const log = await XPLog.create({
      userId: user._id,
      event,
      xp,
      meta: meta || {},
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        xp: user.xp,
        tier: user.tier,
      },
      log,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/xp/overview
// Returns current XP, tier and a simple "next tier" hint
export async function getXPOverview(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw createError("Not authorized", 401);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createError("User not found", 404);
    }

    const currentXP = user.xp || 0;
    let nextTier = null;
    let xpToNext = 0;

    if (currentXP < 500) {
      nextTier = "Silver";
      xpToNext = 500 - currentXP;
    } else if (currentXP < 1500) {
      nextTier = "Gold";
      xpToNext = 1500 - currentXP;
    } else {
      nextTier = null;
      xpToNext = 0;
    }

    res.json({
      success: true,
      xp: currentXP,
      tier: user.tier,
      nextTier,
      xpToNext,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/xp/history
// List of XP logs for the current user (latest first)
export async function getXPHistory(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw createError("Not authorized", 401);
    }

    const logs = await XPLog.find({ userId })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      count: logs.length,
      logs,
    });
  } catch (err) {
    next(err);
  }
}