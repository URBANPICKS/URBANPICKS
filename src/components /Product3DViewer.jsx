// src/components/Product3DViewer.jsx
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function FloatingBox({ color = "#00f5ff" }) {
  return (
    <mesh>
      <boxGeometry args={[1.4, 0.4, 2]} />
      <meshStandardMaterial
        color={color}
        metalness={0.6}
        roughness={0.2}
      />
    </mesh>
  );
}

export default function Product3DViewer({ accent = "#00f5ff" }) {
  return (
    <div
      style={{
        width: "100%",
        height: "220px",
        borderRadius: "18px",
        overflow: "hidden",
        background:
          "radial-gradient(circle at top, rgba(0,245,255,0.25), transparent 55%)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <Canvas camera={{ position: [0, 1, 4], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 6, 3]} intensity={1.2} />
        <FloatingBox color={accent} />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}