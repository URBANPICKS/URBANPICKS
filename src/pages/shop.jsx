// src/pages/Shop.jsx
import React, { useEffect, useState } from "react";
import fallbackProducts from "../data.js";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts } from "../services/productApi.js";

export default function Shop({ onSelectProduct }) {
  const [items, setItems] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSelect = (product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  // Try to load products from backend API
  useEffect(() => {
    let isMounted = true;

    async function loadFromApi() {
      setLoading(true);
      setError(null);

      try {
        const apiProducts = await fetchProducts();

        if (
          isMounted &&
          Array.isArray(apiProducts) &&
          apiProducts.length > 0
        ) {
          setItems(apiProducts);
        }
      } catch (err) {
        console.warn(
          "Product API failed, using fallback demo data:",
          err.message
        );
        if (isMounted) {
          setError("Backend not reachable, showing demo products.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadFromApi();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="shop-page">
      <header className="shop-header">
        <div>
          <h2 className="shop-title">Curated Quantum Collection</h2>
          <p className="shop-subtitle">
            Browse premium devices tuned for 3D exploration, X-ray breakdowns
            and XP-powered loyalty rewards.
          </p>

          {error && (
            <p
              style={{
                fontSize: "11px",
                marginTop: "6px",
                color: "rgba(255,200,200,0.9)",
              }}
            >
              {error}
            </p>
          )}
        </div>

        <div className="shop-filters">
          <button className="chip chip-active">All</button>
          <button className="chip">Wearables</button>
          <button className="chip">Audio</button>
          <button className="chip">Limited</button>
        </div>
      </header>

      {loading && (
        <p
          style={{
            fontSize: "11px",
            marginBottom: "8px",
            color: "rgba(210,220,255,0.8)",
          }}
        >
          Loading products…
        </p>
      )}

      <div className="product-grid">
        {items.map((p) => (
          <ProductCard key={p.id || p._id} product={p} onSelect={handleSelect} />
        ))}
      </div>
    </section>
  );
}