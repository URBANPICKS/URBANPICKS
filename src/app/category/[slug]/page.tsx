import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/components/ProductCard";

// পেজটি যাতে প্রতিবার ফ্রেশ ডাটা দেখায়
export const revalidate = 0;

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = params;

  // ১. স্লাগ (যেমন: gadgets-tech) দিয়ে ক্যাটাগরি আইডি খুঁজে বের করা
  const { data: category, error: catError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  // যদি ক্যাটাগরি না পাওয়া যায়, 404 পেজ দেখাও
  if (catError || !category) {
    return notFound();
  }

  // ২. ওই ক্যাটাগরির সব প্রোডাক্ট নিয়ে আসা
  const { data: products, error: prodError } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', category.id);

  return (
    <main className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      {/* শিরোনাম */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white uppercase tracking-wider">
          {category.name}
        </h1>
        <div className="h-1 w-24 bg-[#D4AF37] mx-auto rounded-full"></div>
        <p className="text-gray-400 mt-4">
          Explore the best {category.name.toLowerCase()} curated just for you.
        </p>
      </div>

      {/* প্রোডাক্ট গ্রিড */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        // যদি কোনো প্রোডাক্ট না থাকে
        <div className="text-center py-20 bg-[#111] rounded-xl border border-dashed border-gray-800">
          <p className="text-xl text-gray-500 mb-4">No products found in this category yet.</p>
          <p className="text-sm text-gray-600">Admin needs to upload some items!</p>
        </div>
      )}
    </main>
  );
}
