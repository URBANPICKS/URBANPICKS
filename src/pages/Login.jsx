// src/pages/Login.jsx
import React, { useState } from "react";
import { loginUser } from "../services/authApi";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await loginUser(email, password);
      if (res.success) {
        setMsg("Login success!");
        onLogin();
      } else {
        setMsg(res.message || "Login failed");
      }
    } catch {
      setMsg("Connection error");
    }
    setLoading(false);
  }

  return (
    <section className="shop-page">
      <header className="shop-header">
        <h2 className="shop-title">Login</h2>
      </header>

      <div className="product-grid">
        <form className="product-card product-glass" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="pill-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="pill-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="pill-btn pill-primary" type="submit">
            {loading ? "Loading..." : "Login"}
          </button>
          {msg && (
            <p style={{ fontSize: "11px", marginTop: "8px" }}>{msg}</p>
          )}
        </form>
      </div>
    </section>
  );
}