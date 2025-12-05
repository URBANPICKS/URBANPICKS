// server/src/config/env.js
import dotenv from "dotenv";

dotenv.config();

const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/zentrix_dev",
  jwtSecret: process.env.JWT_SECRET || "zentrix_dev_secret_key",
  nodeEnv: process.env.NODE_ENV || "development",
};

export default env;