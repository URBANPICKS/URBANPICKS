// src/pages/XPDashboard.jsx
import React, { useEffect, useState } from "react";
import { fetchXPOverview, fetchXPHistory } from "../services/xpApi.js";

export default function XPDashboard({ token }) {
  const [xpData, setXpData] = useState(null);
  const [logs, setLogs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadXP() {
      if (!token) {
        setError("Not logged in — showing demo XP.");
        return;
      }

      try {
        const overview = await fetchXPOverview(token);
        const history = await fetchXPHistory(token);
        setXpData(overview);
        setLogs(history);
      } catch (err) {
        console.warn("XP dashboard API failed:", err.message);
        setError("Backend unreachable — showing demo XP.");
      }
    }

    loadXP();
  }, [token]);

  // fallback demo data
  const fallbackXP = {
    xp: 1250,
    tier: "Silver",
    nextTier: "Gold",
    xpToNext: 750,
  };

  const data = xpData || fallbackXP;

  const hasNextTier = !!data.nextTier;
  const requiredForNext = hasNextTier ? data.xp + data.xpToNext : data.xp || 1;
  const progress = hasNextTier
    ? Math.min(Math.round((data.xp / requiredForNext) * 100), 100)
    : 100;

  const demoLogs = [
    { event: "purchase", xp: 120, createdAt: "Recent" },
    { event: "view_product", xp: 5, createdAt: "Today" },
    { event: "add_to_cart", xp: 15, createdAt: "Yesterday" },
  ];

  const displayLogs = logs && logs.length > 0 ? logs : demoLogs;

  return (
    <section className="shop-page">
      <header className="shop-header">
        <div>
          <h2 className="shop-title">XP & Loyalty Dashboard</h2>
          <p className="shop-subtitle">
            Track your experience points, tier status and milestones. Every
            interaction in the store will grow this meter.
          </p>
          {error && (
            <p
              style={{
                fontSize: "11px",
                marginTop: "6px",
                color: "rgba(255,180,180,0.8)",
              }}
            >
              {error}
            </p>
          )}
        </div>
      </header>

      <div className="product-grid">
        {/* XP Progress */}
        <div className="product-card">
          <div className="product-glass">
            <h3 className="product-title" style={{ marginBottom: "6px" }}>
              Current Tier: {data.tier}
            </h3>
            <p className="product-category" style={{ marginBottom: "10px" }}>
              {hasNextTier
                ? `Next tier: ${data.nextTier}`
                : "You have reached the highest tier."}
            </p>

            <div
              style={{
                width: "100%",
                height: "8px",
                borderRadius: "999px",
                background: "rgba(20,25,60,0.9)",
                overflow: "hidden",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  borderRadius: "999px",
                  background:
                    "linear-gradient(90deg, #00f5ff, #7b61ff, #ff4ecd)",
                  boxShadow: "0 0 12px rgba(125,249,255,0.8)",
                  transition: "width 0.3s ease-out",
                }}
              />
            </div>

            <p
              style={{
                fontSize: "11px",
                color: "rgba(210,220,255,0.9)",
                marginBottom: "8px",
              }}
            >
              {data.xp} XP
              {hasNextTier && ` / ${requiredForNext} XP`}
            </p>

            {hasNextTier && (
              <p
                style={{
                  fontSize: "11px",
                  color: "rgba(210,220,255,0.7)",
                  marginBottom: "10px",
                }}
              >
                {data.xpToNext} XP away from{" "}
                <b>{data.nextTier}</b> tier.
              </p>
            )}

            <button className="pill-btn pill-primary product-btn">
              See How to Earn More XP
            </button>
          </div>
        </div>

        {/* XP History */}
        <div className="product-card">
          <div className="product-glass">
            <h3 className="product-title" style={{ marginBottom: "8px" }}>
              Recent XP Activity
            </h3>

            <ul
              style={{
                listStyle: "none",
                fontSize: "11px",
                color: "rgba(210,220,255,0.9)",
                maxHeight: "170px",
                overflowY: "auto",
              }}
            >
              {displayLogs.map((log, index) => {
                const when =
                  log.createdAt === "Recent" || log.createdAt === "Today"
                    ? log.createdAt
                    : log.createdAt === "Yesterday"
                    ? "Yesterday"
                    : log.createdAt
                    ? new Date(log.createdAt).toLocaleString()
                    : "Unknown";

                return (
                  <li key={log._id || index} style={{ marginBottom: "6px" }}>
                    • <b>{log.event}</b> &nbsp;(+{log.xp} XP) —{" "}
                    <span
                      style={{
                        color: "rgba(180,190,230,0.9)",
                        fontSize: "10px",
                      }}
                    >
                      {when}
                    </span>
                  </li>
                );
              })}
            </ul>

            <p
              style={{
                fontSize: "10px",
                color: "rgba(180,190,230,0.8)",
                marginTop: "10px",
              }}
            >
              This dashboard uses live XP data when available, and demo data
              when backend or login is not active.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}