// src/services/xpApi.js
import { apiGet } from "./apiClient.js";

// Get XP overview (xp, tier, xpToNext, nextTier)
export async function fetchXPOverview(token) {
  const response = await apiGet("/api/xp/overview", token);
  return response;
}

// Get XP history logs
export async function fetchXPHistory(token) {
  const response = await apiGet("/api/xp/history", token);
  return response.logs;
}