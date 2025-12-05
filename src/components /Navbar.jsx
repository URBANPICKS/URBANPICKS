// src/components/Navbar.jsx
import React from "react";

export default function Navbar({ routes, currentKey, onNavigate }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo-orb" />
        <div className="logo-text">
          <span className="logo-main">Zentrix</span>
          <span className="logo-sub">Immersive Commerce</span>
        </div>
      </div>

      <nav className="navbar-links">
        {routes
          .filter((r) => ["home", "shop"].includes(r.key))
          .map((route) => (
            <button
              key={route.key}
              className={
                currentKey === route.key
                  ? "nav-link nav-link-active"
                  : "nav-link"
              }
              onClick={() => onNavigate(route.key)}
            >
              {route.label}
            </button>
          ))}
      </nav>

      <div className="navbar-right">
        <button className="pill-btn pill-outline">Sign In</button>
        <button className="pill-btn pill-primary">Join XP Club</button>
      </div>
    </header>
  );
}