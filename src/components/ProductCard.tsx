import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // ডিসকাউন্ট পার্সেন্টেজ হিসাব করা
  const discount = product.compare_at_price 
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  return (
    <div className="group bg-[#111] border border-gray-800 rounded-xl overflow-hidden hover:border-accent/50 transition-all duration-300">
      {/* ছবির অংশ */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        {product.images?.[0] ? (
           <Image
             src={product.images[0]}
             alt={product.title}
             fill
             className="object-cover group-hover:scale-110 transition-transform duration-500"
           />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
        )}
        
        {/* ডিসকাউন্ট ব্যাজ */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            {discount}% OFF
          </span>
        )}
      </Link>

      {/* তথ্যের অংশ */}
      <div className="p-4">
        <h3 className="text-gray-200 font-medium truncate group-hover:text-accent transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-end gap-2 mt-2">
          <span className="text-xl font-bold text-white">₹{product.price}</span>
          {product.compare_at_price && (
            <span className="text-sm text-gray-500 line-through">₹{product.compare_at_price}</span>
          )}
        </div>

        {/* কার্ট বাটন */}
        <button className="w-full mt-4 bg-gray-800 hover:bg-accent hover:text-black text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all font-medium text-sm">
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
