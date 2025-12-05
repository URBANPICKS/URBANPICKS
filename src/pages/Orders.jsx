// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { fetchMyOrders } from "../services/orderApi.js";
import { getToken } from "../services/authClient.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    async function load() {
      const token = getToken();

      if (!token) {
        setStatus({
          type: "info",
          message:
            "You are not logged in. Please login first to see your orders.",
        });
        setLoading(false);
        return;
      }

      try {
        const data = await fetchMyOrders(token);
        setOrders(data || []);
        if (!data || data.length === 0) {
          setStatus({
            type: "info",
            message: "No orders found yet. Try placing your first order.",
          });
        }
      } catch (err) {
        setStatus({
          type: "error",
          message: "Unable to load orders. Backend might be offline.",
        });
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section className="shop-page">
      <header className="shop-header">
        <div>
          <h2 className="shop-title">My Orders</h2>
          <p className="shop-subtitle">
            Track your purchases, payment status and XP rewards.
          </p>
        </div>
      </header>

      <div className="product-grid">
        <div className="product-card">
          <div className="product-glass">
            {loading && (
              <p style={{ fontSize: "11px" }}>Loading your orders...</p>
            )}

            {!loading && status && (
              <p
                style={{
                  fontSize: "11px",
                  marginBottom: "10px",
                  color:
                    status.type === "error"
                      ? "rgba(255,180,180,0.9)"
                      : "rgba(200,220,255,0.9)",
                }}
              >
                {status.message}
              </p>
            )}

            {!loading && orders.length > 0 && (
              <div
                style={{
                  maxHeight: "260px",
                  overflowY: "auto",
                  paddingRight: "4px",
                }}
              >
                {orders.map((order) => (
                  <div
                    key={order._id}
                    style={{
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                      paddingBottom: "8px",
                      marginBottom: "8px",
                      fontSize: "11px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <span>
                        <b>Order:</b>{" "}
                        {String(order._id).slice(-6).toUpperCase()}
                      </span>
                      <span>
                        <b>Status:</b> {order.status || "pending"}
                      </span>
                    </div>

                    <div style={{ marginBottom: "4px" }}>
                      <b>Amount:</b> ₹{order.totalAmount} &nbsp; | &nbsp;
                      <b>XP:</b> {order.totalXP}
                    </div>

                    <div style={{ marginBottom: "4px" }}>
                      <b>Payment:</b>{" "}
                      {order.paymentProvider
                        ? order.paymentProvider.toUpperCase()
                        : "NONE"}{" "}
                      ({order.paymentStatus || "unpaid"})
                    </div>

                    {order.items && order.items.length > 0 && (
                      <div style={{ opacity: 0.9 }}>
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div key={idx}>
                            • {item.name} × {item.quantity}
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div>…+ more items</div>
                        )}
                      </div>
                    )}

                    <div
                      style={{
                        marginTop: "3px",
                        opacity: 0.7,
                        fontSize: "10px",
                      }}
                    >
                      {order.createdAt &&
                        `Placed: ${new Date(
                          order.createdAt
                        ).toLocaleString()}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}