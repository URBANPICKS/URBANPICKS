// server/src/models/XPLog.js
import mongoose from "mongoose";

const xpLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    event: {
      type: String,
      required: true,
      trim: true,
    },
    xp: {
      type: Number,
      required: true,
    },
    meta: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const XPLog = mongoose.model("XPLog", xpLogSchema);

export default XPLog;