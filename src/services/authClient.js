// src/services/authClient.js

export function saveToken(token) {
  localStorage.setItem("zentrix_token", token);
}

export function getToken() {
  return localStorage.getItem("zentrix_token");
}

export function clearToken() {
  localStorage.removeItem("zentrix_token");
  localStorage.removeItem("zentrix_user");
}

export function saveUser(user) {
  localStorage.setItem("zentrix_user", JSON.stringify(user));
}

export function getUser() {
  try {
    const stored = localStorage.getItem("zentrix_user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}