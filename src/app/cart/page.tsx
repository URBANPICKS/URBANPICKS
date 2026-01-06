"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, addToCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
        <Link 
          href="/" 
          className="bg-[#D4AF37] text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* বাম পাশ: কার্ট আইটেম লিস্ট */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-[#111] border border-gray-800 rounded-xl p-4 flex gap-4 items-center">
              
              {/* ছবি */}
              <div className="relative w-24 h-24 bg-black rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                   <Image src={item.image} alt={item.title} fill className="object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">No Image</div>
                )}
              </div>

              {/* নাম ও দাম */}
              <div className="flex-grow">
                <Link href={`/product/${item.id}`} className="font-bold text-lg hover:text-[#D4AF37] transition-colors line-clamp-1">
                  {item.title}
                </Link>
                <p className="text-gray-400 mt-1">₹{item.price}</p>
              </div>

              {/* অ্যাকশন বাটন */}
              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center gap-3 bg-gray-900 rounded-lg p-1">
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="p-1 hover:text-red-500 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => addToCart(item as any)} 
                    className="p-1 hover:text-green-500 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm flex items-center gap-1 hover:underline"
                >
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* ডান পাশ: অর্ডার সামারি */}
        <div className="bg-[#111] border border-gray-800 rounded-xl p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-3 text-gray-400 text-sm mb-6 border-b border-gray-800 pb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-white">₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold mb-8">
            <span>Total</span>
            <span className="text-[#D4AF37]">₹{cartTotal}</span>
          </div>

          <Link 
            href="/checkout" 
            className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-all"
          >
            Proceed to Checkout <ArrowRight className="w-5 h-5" />
          </Link>
          
          <div className="mt-4 flex items-center justify-center gap-2 text-gray-500 text-xs">
            <span>🔒 Secure Checkout</span>
          </div>
        </div>

      </div>
    </div>
  );
}
