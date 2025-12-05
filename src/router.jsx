// src/router.jsx
const routes = [
  { key: "home", label: "Home", page: "Home" },
  { key: "shop", label: "Shop", page: "Shop" },
  { key: "checkout", label: "Checkout", page: "Checkout" },
  { key: "profile", label: "Profile", page: "Profile" },
  { key: "xp", label: "XP", page: "XPDashboard" },
  { key: "orders", label: "Orders", page: "Orders" },

  // 🔐 নতুন Login route
  { key: "login", label: "Login", page: "Login" },
];

export default routes;