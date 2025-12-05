// server/src/models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Product slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    xpReward: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
      default: "",
      trim: true,
    },
    // later you can store real image & 3D model URLs here:
    imageUrl: {
      type: String,
      default: "",
    },
    model3DUrl: {
      type: String,
      default: "",
    },
    isXRayEnabled: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;