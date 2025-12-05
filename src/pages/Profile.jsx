// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { fetchMyOrders } from "../services/orderApi.js";
import { getUser, getToken } from "../services/authClient.js";

export default function Profile() {
  const user = getUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = getToken();

  useEffect(() => {
    async function load() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchMyOrders(token);
        setOrders(data || []);
      } catch (err) {
        console.log("Orders unavailable");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  if (!user) {
    return (
      <section className="shop-page">
        <h2 className="shop-title">Profile</h2>
        <p className="shop-subtitle">Please log in to view your dashboard.</p>
      </section>
    );
  }

  const xp = user.xpTotal || 0;
  const tier =
    xp < 1000 ? "Bronze" : xp < 3000 ? "Silver" : xp < 7000 ? "Gold" : "Platinum";
  const nextTierXP =
    tier === "Bronze" ? 1000 : tier === "Silver" ? 3000 : tier === "Gold" ? 7000 : 10000;
  const progress = Math.min(100, Math.round((xp / nextTierXP) * 100));

  return (
    <section className="shop-page">
      <header className="shop-header">
        <h2 className="shop-title">Profile</h2>
        <p className="shop-subtitle">Welcome back, {user.name || "User"}!</p>
      </header>

      <div className="product-grid">
        <div className="product-card">
          <div
            className="product-glass"
            style={{
              border: "1px solid rgba(255,215,100,0.35)",
              background:
                "linear-gradient(145deg, rgba(30,30,30,0.75), rgba(0,0,0,0.70))",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "6px",
                background: "linear-gradient(90deg,#F7D472,#CBA841)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: "bold",
              }}
            >
              {tier} Member
            </h3>

            <p style={{ fontSize: "12px", textAlign: "center", marginBottom: "12px" }}>
              XP: {xp} / {nextTierXP}
            </p>

            {/* XP Progress bar */}
            <div
              style={{
                height: "7px",
                borderRadius: "4px",
                background: "rgba(255,255,255,0.1)",
                marginBottom: "14px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg,#F1D87A,#C69F3A)",
                  boxShadow: "0 0 8px rgba(255,200,120,0.7)",
                }}
              ></div>
            </div>

            <p style={{ fontSize: "11px", marginBottom: "6px" }}>
              <b>Email:</b> {user.email}
            </p>

            <p style={{ fontSize: "11px", marginBottom: "6px" }}>
              <b>Orders Placed:</b> {orders.length}
            </p>

            <p style={{ fontSize: "11px", opacity: 0.8 }}>
              <b>Member Since:</b>{" "}
              {user.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}