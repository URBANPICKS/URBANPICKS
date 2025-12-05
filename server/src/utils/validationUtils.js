// server/src/utils/validationUtils.js

// Simple email format check
export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email.trim().toLowerCase());
}

// Helper to create an error with statusCode
export function createError(message, statusCode = 400) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}