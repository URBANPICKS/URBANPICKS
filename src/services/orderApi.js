// src/services/orderApi.js
import { apiGet, apiPost } from "./apiClient.js";

// Create a new order
// items: [{ productId, quantity }]
// payment: { paymentProvider?, paymentRef? }
export async function createOrder(items, token, payment = {}) {
  const body = { items, ...payment };
  const response = await apiPost("/api/orders", body, token);
  return response;
}

// Get current user's orders
export async function fetchMyOrders(token) {
  const response = await apiGet("/api/orders/my", token);
  return response.orders;
}