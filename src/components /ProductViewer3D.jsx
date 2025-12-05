// src/components/ProductViewer3D.jsx
import React from "react";

export default function ProductViewer3D({ label = "3D Preview (Coming Soon)" }) {
  return (
    <div className="viewer3d-shell">
      <div className="viewer3d-core">
        <div className="viewer3d-orbit viewer3d-orbit-1" />
        <div className="viewer3d-orbit viewer3d-orbit-2" />
        <div className="viewer3d-orbit viewer3d-orbit-3" />
        <div className="viewer3d-dot" />
      </div>
      <p className="viewer3d-caption">{label}</p>
    </div>
  );
}