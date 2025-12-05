// server/src/middleware/errorMiddleware.js
export function notFound(req, res, _next) {
  res.status(404).json({
    success: false,
    message: `Not Found: ${req.originalUrl}`,
  });
}

export function errorHandler(err, req, res, _next) {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Server error",
  });
}