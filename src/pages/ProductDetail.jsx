// src/pages/ProductDetail.jsx
import React from "react";
import Product3DViewer from "../components/Product3DViewer.jsx";

export default function ProductDetail({ product, onBack }) {
  if (!product) {
    return (
      <section className="shop-page">
        <header className="shop-header">
          <h2 className="shop-title">Product Detail</h2>
          <p className="shop-subtitle">
            No product selected. Go back to shop.
          </p>
        </header>
        <button className="pill-btn pill-primary" onClick={onBack}>
          Back to Shop
        </button>
      </section>
    );
  }

  const accent =
    product.tag === "Ultra"
      ? "#ff6bd5"
      : product.tag === "Pro"
      ? "#00f5ff"
      : "#c5ff8a";

  return (
    <section className="shop-page">
      <header className="shop-header">
        <div>
          <h2 className="shop-title">{product.name}</h2>
          <p className="shop-subtitle">
            Immersive 3D preview + premium specs.
          </p>
        </div>
        <button className="pill-btn pill-ghost" onClick={onBack}>
          ← Back to Shop
        </button>
      </header>

      <div className="product-grid">
        <div className="product-card">
          <div className="product-glass">
            {/* 3D viewer */}
            <Product3DViewer accent={accent} />

            {/* Info */}
            <h3
              className="product-title"
              style={{ marginTop: "14px", marginBottom: "4px" }}
            >
              {product.name}
            </h3>
            <p className="product-category">{product.category}</p>
            <p
              className="product-price"
              style={{ marginTop: "8px", marginBottom: "4px" }}
            >
              ₹{product.price}
            </p>
            <p style={{ fontSize: "11px", opacity: 0.9 }}>
              This is a preview of how your product can appear in an immersive
              3D space. In the full version, users will be able to rotate and
              zoom real 3D models of each item.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}