// src/components/XPCelebration.jsx
import React from "react";

export default function XPCelebration({ xp = 0 }) {
  return (
    <div className="xp-celebration-overlay">
      <div className="xp-burst">
        +{xp} XP
      </div>
    </div>
  );
}