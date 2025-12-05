// src/components/PayPalButton.jsx
import React, { useEffect, useRef, useState } from "react";
import { createOrder } from "../services/orderApi.js";
import { getToken } from "../services/authClient.js";

export default function PayPalButton({ cartItems, onSuccess, onError }) {
  const btnRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // PayPal SDK script already loaded in index.html হলে সোজা কাজ করবে
    if (window.paypal && btnRef.current && !ready) {
      window.paypal
        .Buttons({
          style: {
            shape: "pill",
            color: "gold",
            layout: "vertical",
          },
          createOrder: (data, actions) => {
            const total = cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: String(total / 100), // ধরে নিলাম amount ₹ এ, পরে USD এর জন্য adjust করবে
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            try {
              const details = await actions.order.capture();
              const token = getToken();

              const itemsPayload = cartItems.map((i) => ({
                productId: i.productId,
                quantity: i.quantity,
              }));

              // Backend order with PayPal info
              if (token) {
                await createOrder(itemsPayload, token, {
                  paymentProvider: "paypal",
                  paymentRef: details.id || data.orderID,
                });
              }

              onSuccess &&
                onSuccess({
                  provider: "paypal",
                  ref: details.id || data.orderID,
                });
            } catch (err) {
              console.error(err);
              onError && onError(err);
            }
          },
        })
        .render(btnRef.current);

      setReady(true);
    }
  }, [cartItems, ready, onSuccess, onError]);

  return (
    <div
      style={{
        marginTop: "10px",
        borderRadius: "999px",
        overflow: "hidden",
        background: "rgba(255,255,255,0.02)",
        padding: "4px",
      }}
    >
      <div ref={btnRef}></div>
    </div>
  );
}