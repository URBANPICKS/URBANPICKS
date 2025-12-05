// server/server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";

import env from "./src/config/env.js";
import connectDatabase from "./src/config/database.js";

// (Later we'll fill these files; for now just keep imports ready)
import userRoutes from "./src/routes/userRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import xpRoutes from "./src/routes/xpRoutes.js";
import assistantRoutes from "./src/routes/assistantRoutes.js";

import logger from "./src/middleware/logger.js";
import errorHandler from "./src/middleware/errorHandler.js";

const app = express();

// Connect to MongoDB
connectDatabase();

// Basic middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

// Simple health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Zentrix backend is running (demo mode)",
    env: env.nodeEnv,
  });
});

// Attach API routes (will be implemented later)
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/xp", xpRoutes);
app.use("/api/assistant", assistantRoutes);

// Error handler (last middleware)
app.use(errorHandler);

// Start server
app.listen(env.port, () => {
  console.log(`🚀 Zentrix API running on port ${env.port}`);
});