"use client";

import { useState } from "react";
import Image from "next/image";
import { ShoppingCart, Heart, Check, Star, Truck, ShieldCheck } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [mainImage, setMainImage] = useState(product.images?.[0] || "");
  const [activeTab, setActiveTab] = useState("desc"); // ট্যাব চেঞ্জ করার জন্য
  const [isAdded, setIsAdded] = useState(false);

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* ছবি গ্যালারি */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-[#111] rounded-2xl overflow-hidden border border-gray-800">
            {mainImage ? (
              <Image src={mainImage} alt={product.title} fill className="object-contain p-4" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  mainImage === img ? "border-[#D4AF37]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* প্রোডাক্ট ইনফো */}
        <div className="text-white space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#D4AF37] text-black text-xs font-bold px-2 py-0.5 rounded">Top Rated</span>
              <div className="flex text-yellow-500 text-xs">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="text-gray-400 ml-1">(128 Reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="text-green-500 font-medium flex items-center gap-1"><Check className="w-3 h-3" /> In Stock</span>
              <span>•</span>
              <span>Official Merch</span>
            </div>
          </div>

          <div className="border-y border-gray-800 py-6">
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-white">₹{product.price}</span>
              {product.compare_at_price && (
                <>
                  <span className="text-xl text-gray-500 line-through">₹{product.compare_at_price}</span>
                  <span className="text-red-500 font-bold">-{discount}% OFF</span>
                </>
              )}
            </div>
            <p className="text-gray-400 text-xs mt-2">Inclusive of all taxes.</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                isAdded ? "bg-green-600 text-white" : "bg-[#D4AF37] text-black hover:bg-white"
              }`}
            >
              {isAdded ? "Added to Cart" : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
            </button>
            <button className="p-4 rounded-xl border border-gray-700 hover:border-white transition-all text-gray-300">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* ট্রাস্ট ব্যাজ */}
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 pt-4">
            <div className="flex items-center gap-2 bg-[#1a1a1a] p-3 rounded-lg">
              <Truck className="w-5 h-5 text-[#D4AF37]" /> Fast Delivery (2-4 Days)
            </div>
            <div className="flex items-center gap-2 bg-[#1a1a1a] p-3 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37]" /> 1 Year Warranty
            </div>
          </div>
        </div>
      </div>

      {/* ডেসক্রিপশন এবং রিভিউ ট্যাব (Amazon Style) */}
      <div className="border-t border-gray-800 pt-10">
        <div className="flex gap-8 border-b border-gray-800 mb-6">
          <button 
            onClick={() => setActiveTab("desc")}
            className={`pb-4 text-lg font-bold transition-all ${activeTab === "desc" ? "text-[#D4AF37] border-b-2 border-[#D4AF37]" : "text-gray-400 hover:text-white"}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 text-lg font-bold transition-all ${activeTab === "reviews" ? "text-[#D4AF37] border-b-2 border-[#D4AF37]" : "text-gray-400 hover:text-white"}`}
          >
            Reviews (128)
          </button>
        </div>

        {activeTab === "desc" ? (
          <div className="text-gray-300 leading-loose space-y-4">
            <p>{product.description || "No description available."}</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-400">
              <li>Premium quality material</li>
              <li>Designed for modern urban lifestyle</li>
              <li>Durable and long-lasting</li>
              <li>Imported design</li>
            </ul>
          </div>
        ) : (
          <div className="space-y-6">
            {/* ডামি রিভিউ (পরে ডাটাবেস থেকে আসবে) */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#111] p-4 rounded-xl border border-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold">U</div>
                  <span className="font-bold">Verified User</span>
                  <div className="flex text-yellow-500 text-xs"><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /></div>
                </div>
                <p className="text-gray-400 text-sm">Amazing product! The quality is top-notch and delivery was super fast. Highly recommended for everyone.</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
