"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-16 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          
          {/* ১. লোগো (বামে) */}
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            URBAN<span className="text-[#D4AF37]">PICKS</span>
          </Link>

          {/* ২. মেনু লিংক (মাঝখানে - ডেস্কটপের জন্য) */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <Link href="/category/gadgets-tech" className="hover:text-[#D4AF37] transition-colors">Gadgets</Link>
            <Link href="/category/home-living" className="hover:text-[#D4AF37] transition-colors">Decor</Link>
            <Link href="/category/men-fashion" className="hover:text-[#D4AF37] transition-colors">Fashion</Link>
          </div>

          {/* ৩. আইকনস (ডানে) */}
          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            <Link href="/cart" className="relative text-gray-300 hover:text-[#D4AF37] transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {/* কার্ট ব্যাজ (পরে আমরা ডায়নামিক করব) */}
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>

            <Link href="/login" className="hidden md:block text-gray-300 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* মোবাইল মেনু বাটন */}
            <button 
              className="md:hidden text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল মেনু ড্রপডাউন (ছোট স্ক্রিনের জন্য) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/" className="block py-2 text-gray-300 border-b border-gray-800">Home</Link>
            <Link href="/category/gadgets-tech" className="block py-2 text-gray-300 border-b border-gray-800">Gadgets</Link>
            <Link href="/category/fashion" className="block py-2 text-gray-300">Fashion</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
