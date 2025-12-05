// src/services/authApi.js
import { apiPost, apiGet } from "./apiClient";
import { saveToken, saveUser } from "./authClient";

export async function registerUser(name, email, password) {
  const res = await apiPost("/api/auth/register", { name, email, password });
  if (res.success && res.token) {
    saveToken(res.token);
    saveUser(res.user);
  }
  return res;
}

export async function loginUser(email, password) {
  const res = await apiPost("/api/auth/login", { email, password });
  if (res.success && res.token) {
    saveToken(res.token);
    saveUser(res.user);
  }
  return res;
}

export async function fetchProfile(token) {
  return apiGet("/api/auth/me", token);
}