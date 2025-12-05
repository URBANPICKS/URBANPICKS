// src/app.jsx
import React, { useState } from "react";
import routes from "./router.js";
import Orders from "./pages/Orders.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Checkout from "./pages/Checkout.jsx";
import Profile from "./pages/Profile.jsx";
import XPDashboard from "./pages/XPDashboard.jsx";
import Login from "./pages/Login.jsx";

import Navbar from "./components/Navbar.jsx";
import FloatingDock from "./components/FloatingDock.jsx";
import DynamicIsland from "./components/DynamicIsland.jsx";
import AssistantBubble from "./components/AssistantBubble.jsx";

import { getToken } from "./services/authClient.js";

const pageComponents = {
  Home,
  Shop,
  Checkout,
  Profile,
  XPDashboard,
  Login,
  Orders,
};

export default function App() {
  const [currentPageKey, setCurrentPageKey] = useState("home");
  const [viewMode, setViewMode] = useState("page"); // "page" or "detail"
  const [selectedProduct, setSelectedProduct] = useState(null);

  const currentRoute =
    routes.find((r) => r.key === currentPageKey) || routes[0];

  const BasePageComponent = pageComponents[currentRoute.page] || Home;

  const handleNavigate = (key) => {
    setCurrentPageKey(key);
    setViewMode("page");
    setSelectedProduct(null);
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setViewMode("detail");
  };

  const handleBackToShop = () => {
    setViewMode("page");
    setCurrentPageKey("shop");
    setSelectedProduct(null);
  };

  let content = null;

  if (viewMode === "detail") {
    // প্রোডাক্ট ডিটেইল ভিউ
    content = (
      <ProductDetail product={selectedProduct} onBack={handleBackToShop} />
    );
  } else {
    // নরমাল পেজ ভিউ
    if (currentRoute.key === "shop") {
      // Shop পেজে প্রোডাক্ট সিলেক্ট করার জন্য extra prop
      content = <Shop onSelectProduct={handleSelectProduct} />;
    } else if (currentRoute.key === "checkout") {
      // Checkout এ real token পাঠানো হচ্ছে (না থাকলে demo mode)
      content = <Checkout token={getToken()} />;
    } else if (currentRoute.page === "Login") {
      // Login পেজে লগইন হলে প্রোফাইলে নেভিগেট
      content = <Login onLogin={() => handleNavigate("profile")} />;
    } else {
      // বাকি সব পেজ (Home, Profile, XPDashboard ইত্যাদি)
      content = <BasePageComponent />;
    }
  }

  return (
    <div className="app-root">
      <DynamicIsland />

      <Navbar
        routes={routes}
        currentKey={currentPageKey}
        onNavigate={handleNavigate}
      />

      <main className="page-shell">
        {/* এই wrapper এর জন্যই এখন পেজ বদলালে smooth animation হবে */}
        <div
          className="view-transition"
          key={`${currentRoute.key}-${viewMode}`}
        >
          {content}
        </div>
      </main>

      <FloatingDock
        routes={routes}
        currentKey={currentPageKey}
        onNavigate={handleNavigate}
      />

      <AssistantBubble />
    </div>
  );
}