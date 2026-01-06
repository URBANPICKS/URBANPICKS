import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabaseClient';

// পেজ লোড হওয়ার সময় ক্যাশ আপডেট করবে না (সবসময় ফ্রেশ ডাটা দেখাবে)
export const revalidate = 0;

export default async function Home() {
  // ১. সুপাবেস থেকে প্রোডাক্ট আনা
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .limit(8);

  return (
    <main className="min-h-screen pb-20">
      {/* হিরো ব্যানার */}
      <HeroBanner />

      {/* ক্যাটাগরি সেকশন */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Gadgets & Tech', 'Home & Living', 'Men Fashion', 'Women Fashion'].map((cat) => (
            <div key={cat} className="h-32 bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-gray-800 hover:border-[#D4AF37] cursor-pointer transition-all hover:scale-105">
              <span className="font-bold text-lg text-white">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ফিচারড প্রোডাক্ট সেকশন */}
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Now 🔥</h2>
          <span className="text-[#D4AF37] cursor-pointer hover:underline">View All</span>
        </div>

        {/* প্রোডাক্ট গ্রিড */}
        {featuredProducts && featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#111] rounded-xl border border-dashed border-gray-700">
            <p className="text-gray-400">No products found. Add some from Admin Panel!</p>
          </div>
        )}
      </section>
    </main>
  );
}
