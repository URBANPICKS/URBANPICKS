// server/src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/validationUtils.js";

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

// POST /api/auth/register
// body: { name, email, password }
export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw createError("Name, email and password are required", 400);
    }

    const existing = await User.findOne({ email });
    if (existing) {
      throw createError("Email already registered", 400);
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
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

// POST /api/auth/login
// body: { email, password }
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError("Email and password are required", 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createError("Invalid credentials", 401);
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw createError("Invalid credentials", 401);
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

// GET /api/auth/me
export async function getProfile(req, res, next) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw createError("Not authorized", 401);
    }

    const user = await User.findById(userId);
    if (!user) {
      throw createError("User not found", 404);
    }

    res.json({
      success: true,
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