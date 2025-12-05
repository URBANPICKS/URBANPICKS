// server/src/middleware/logger.js

// Simple request logger middleware
export default function logger(req, res, next) {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.originalUrl}`);
  next();
}