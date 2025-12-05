// server/src/controllers/userController.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import env from "../config/env.js";
import { isValidEmail, createError } from "../utils/validationUtils.js";

// Helper to create JWT token
function generateToken(userId) {
  return jwt.sign({ id: userId }, env.jwtSecret, { expiresIn: "7d" });
}

// POST /api/users/register
export async function registerUser(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw createError("Name, email and password are required", 400);
    }

    if (!isValidEmail(email)) {
      throw createError("Invalid email format", 400);
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      throw createError("User already exists with this email", 409);
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        tier: user.tier,
      },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/users/login
export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError("Email and password are required", 400);
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      throw createError("Invalid email or password", 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw createError("Invalid email or password", 401);
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        xp: user.xp,
        tier: user.tier,
      },
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/users/profile  (protected)
export async function getProfile(req, res, next) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw createError("Not authorized", 401);
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw createError("User not found", 404);
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
}