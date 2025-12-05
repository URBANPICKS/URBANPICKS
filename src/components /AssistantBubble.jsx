// src/components/AssistantBubble.jsx
import React, { useState } from "react";

export default function AssistantBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          right: "18px",
          bottom: "90px",
          width: "44px",
          height: "44px",
          borderRadius: "999px",
          border: "1px solid rgba(120,255,255,0.7)",
          background:
            "radial-gradient(circle at 20% 0, #00f5ff, #7b61ff 60%, #050509)",
          boxShadow: "0 0 20px rgba(0,245,255,0.6)",
          cursor: "pointer",
          zIndex: 35,
        }}
      >
        ?
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            right: "18px",
            bottom: "150px",
            width: "230px",
            padding: "10px 12px",
            borderRadius: "16px",
            background: "rgba(8,8,20,0.96)",
            border: "1px solid rgba(120,255,255,0.35)",
            backdropFilter: "blur(18px)",
            fontSize: "11px",
            color: "rgba(230,235,255,0.9)",
            boxShadow: "0 18px 40px rgba(0,0,0,0.9)",
            zIndex: 35,
          }}
        >
          <div style={{ marginBottom: "6px", fontWeight: 600 }}>
            AI Concierge (Demo)
          </div>
          <p>
            In the final version, I will suggest products and help you navigate
            the store. For now this is just a visual preview.
          </p>
        </div>
      )}
    </>
  );
}