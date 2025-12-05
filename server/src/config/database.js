// server/src/config/database.js
import mongoose from "mongoose";
import env from "./env.js";

async function connectDatabase() {
  try {
    await mongoose.connect(env.mongoUri, {
      // অপশনগুলো নতুন mongoose ভার্সনে প্রয়োজন নেই,
      // তবে future compatible রাখলাম
    });

    console.log("✅ MongoDB connected:", env.mongoUri);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}

export default connectDatabase;