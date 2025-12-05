// src/pages/Checkout.jsx
import React, { useState } from "react";
import { createOrder } from "../services/orderApi.js";
import XPCelebration from "../components/XPCelebration.jsx";
import PayPalButton from "../components/PayPalButton.jsx"; // ⭐ NEW

export default function Checkout({ token }) {
  const [cartItems, setCartItems] = useState([
    {
      productId: "demo123",
      name: "Demo Premium Smartwatch",
      quantity: 1,
      price: 1499,
    },
    {
      productId: "demo456",
      name: "Demo Noise Cancelling Earbuds",
      quantity: 1,
      price: 999,
    },
  ]);

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [xpPop, setXpPop] = useState(null);

  async function handlePlaceOrder() {
    setLoading(true);
    setStatus(null);

    try {
      const itemsPayload = cartItems.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
      }));

      const orderResponse = token
        ? await createOrder(itemsPayload, token)
        : null;

      if (orderResponse && orderResponse.success) {
        setStatus({
          type: "success",
          message: `Order placed successfully! +${orderResponse.xpGranted} XP earned`,
        });
        setXpPop(orderResponse?.xpGranted || 120);
        setTimeout(() => setXpPop(null), 2000);
      } else {
        setStatus({
          type: "success",
          message: "Demo order placed! (+120 XP simulated)",
        });
        setXpPop(120);
        setTimeout(() => setXpPop(null), 2000);
      }
    } catch (err) {
      setStatus({
        type: "error",
        message: "Order failed — backend unreachable. (Demo mode active)",
      });
    }

    setLoading(false);
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="shop-page">
      <header className="shop-header">
        <div>
          <h2 className="shop-title">Checkout</h2>
          <p className="shop-subtitle">
            Confirm your purchase — XP will be earned on every order.
          </p>
        </div>
      </header>

      <div className="product-grid">
        <div className="product-card">
          <div className="product-glass">
            <h3 className="product-title" style={{ marginBottom: "8px" }}>
              Cart Summary
            </h3>

            {cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  fontSize: "11px",
                  marginBottom: "9px",
                  lineHeight: "1.4",
                }}
              >
                • <b>{item.name}</b> × {item.quantity} — ₹
                {item.price * item.quantity}
              </div>
            ))}

            <p
              style={{
                fontSize: "12px",
                marginTop: "12px",
                marginBottom: "16px",
                fontWeight: "bold",
              }}
            >
              Total Amount: ₹{totalAmount}
            </p>

            {/* Demo Order */}
            <button
              className="pill-btn pill-primary product-btn"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>

            {/* ⭐ Real PayPal Payment Button */}
            <PayPalButton
              cartItems={cartItems}
              onSuccess={(info) => {
                setStatus({
                  type: "success",
                  message: `Paid via PayPal (Ref: ${info.ref}). XP applied to your account.`,
                });
                setXpPop(150);
                setTimeout(() => setXpPop(null), 2000);
              }}
              onError={() =>
                setStatus({
                  type: "error",
                  message: "PayPal payment failed. Please try again.",
                })
              }
            />

            {status && (
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  color:
                    status.type === "success"
                      ? "rgba(140,255,180,0.9)"
                      : "rgba(255,180,180,0.9)",
                }}
              >
                {status.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {xpPop && <XPCelebration xp={xpPop} />}
    </section>
  );
}