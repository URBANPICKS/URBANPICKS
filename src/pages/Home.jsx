// src/pages/Home.jsx
import React from "react";

export default function Home() {
  return (
    <section className="home-page">
      <div className="home-grid">
        {/* Left: Text side */}
        <div className="home-hero-text">
          <h1 className="home-heading">
            Futuristic{" "}
            <span className="highlight">
              Immersive<span className="highlight-glow">.</span>
            </span>
            <br />
            Cyber-Minimal Commerce.
          </h1>

          <p className="home-subtext">
            Explore premium next-gen gadgets in a spatial, story-driven
            storefront. Rotate products in 3D, peel back the layers with X-ray
            views, and earn XP every time you shop.
          </p>

          <div className="home-actions">
            <button className="pill-btn pill-primary">Enter Store</button>
            <button className="pill-btn pill-outline">
              Watch Experience Demo
            </button>
          </div>

          <div className="home-footer-meta">
            <span className="meta-pill">AI Concierge · Always On</span>
            <span className="meta-pill">XP Tiers · Bronze / Silver / Gold</span>
          </div>
        </div>

        {/* Right: Visual side */}
        <div className="home-visual">
          <div className="orbital-shell">
            <div className="orbital-inner">
              <div className="orbital-ring ring-1" />
              <div className="orbital-ring ring-2" />
              <div className="orbital-ring ring-3" />
              <div className="orbital-core" />
            </div>
          </div>
          <p className="visual-caption">
            Quantum Series · Holographic Display Mock
          </p>
        </div>
      </div>
    </section>
  );
}