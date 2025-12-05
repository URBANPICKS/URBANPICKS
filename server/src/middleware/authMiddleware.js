// server/src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { createError } from "../utils/validationUtils.js";

export default function authMiddleware(req, _res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  if (!token) {
    return next(createError("Not authorized, token missing", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    return next(createError("Not authorized, token invalid", 401));
  }
}