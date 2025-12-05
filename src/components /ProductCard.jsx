// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ product, onSelect }) {
  const handleClick = () => {
    if (onSelect) {
      onSelect(product);
    }
  };

  // Support both demo data (xp) and backend data (xpReward)
  const xpValue =
    product.xp !== undefined && product.xp !== null
      ? product.xp
      : product.xpReward || 0;

  return (
    <div
      className="product-card"
      onClick={handleClick}
      style={{ cursor: onSelect ? "pointer" : "default" }}
    >
      <div className="product-glass">
        <div className="product-img-placeholder">
          <span className="product-chip">{product.tag || "Premium"}</span>
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-category">{product.category}</p>

          <div className="product-meta-row">
            <span className="product-price">₹{product.price}</span>
            <span className="product-xp">+{xpValue} XP</span>
          </div>

          <button className="pill-btn pill-secondary product-btn">
            View in 3D (Soon)
          </button>
        </div>
      </div>
    </div>
  );
}