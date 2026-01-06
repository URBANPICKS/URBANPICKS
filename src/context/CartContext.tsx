"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem, Product } from "@/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // পেজ লোড হলে লোকাল স্টোরেজ থেকে কার্ট লোড করো
  useEffect(() => {
    const savedCart = localStorage.getItem("urban-picks-cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // কার্ট আপডেট হলে লোকাল স্টোরেজে সেভ করো
  useEffect(() => {
    localStorage.setItem("urban-picks-cart", JSON.stringify(cart));
  }, [cart]);

  // কার্টে পণ্য যোগ করার ফাংশন
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      if (existingItem) {
        // যদি পণ্যটি আগেই থাকে, তাহলে সংখ্যা (Quantity) বাড়াও
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // নতুন পণ্য যোগ করো
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images?.[0] || "",
            quantity: 1,
          },
        ];
      }
    });
    alert("Product added to cart!"); // আপাতত সিম্পল অ্যালার্ট, পরে আমরা সুন্দর টোস্ট নোটিফিকেশন দেব
  };

  // পণ্য ডিলিট করার ফাংশন
  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // পুরো কার্ট খালি করার ফাংশন
  const clearCart = () => {
    setCart([]);
  };

  // মোট বিল হিসাব করা
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // মোট কয়টি পণ্য আছে
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
