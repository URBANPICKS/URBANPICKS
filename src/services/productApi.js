// src/services/productApi.js
import { apiGet } from "./apiClient.js";

// Get all products from backend
export async function fetchProducts() {
  const response = await apiGet("/api/products");
  return response.products;
}

// Get single product by slug
export async function fetchProductBySlug(slug) {
  const response = await apiGet(`/api/products/${slug}`);
  return response.product;
}