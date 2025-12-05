// src/components/FloatingDock.jsx
import React from "react";

export default function FloatingDock({ routes, currentKey, onNavigate }) {
  return (
    <nav className="floating-dock">
      {routes.map((route) => (
        <button
          key={route.key}
          className={
            currentKey === route.key ? "dock-btn dock-btn-active" : "dock-btn"
          }
          onClick={() => onNavigate(route.key)}
        >
          {route.label}
        </button>
      ))}
    </nav>
  );
}