import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProductDetails from "@/components/ProductDetails";
import ProductCard from "@/components/ProductCard";
import SectionHeader from "@/components/SectionHeader";

export const revalidate = 0;

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = params;

  // ১. মেইন প্রোডাক্ট খোঁজা
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }

  // ২. একই ক্যাটাগরির অন্যান্য প্রোডাক্ট খোঁজা (Similar Products)
  // কিন্তু বর্তমান প্রোডাক্টটি বাদ দিয়ে
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', product.category_id)
    .neq('id', product.id) // বর্তমান প্রোডাক্ট বাদ
    .limit(4);

  return (
    <main className="min-h-screen py-12 px-4 max-w-7xl mx-auto">
      {/* মেইন প্রোডাক্ট ডিটেইলস */}
      <ProductDetails product={product} />

      {/* ৩. সিমিলার প্রোডাক্ট সেকশন (Amazon স্টাইল) */}
      <div className="mt-20 border-t border-gray-800 pt-12">
        <SectionHeader 
          title="Similar Products" 
          subtitle="Customers who viewed this item also viewed" 
        />
        
        {relatedProducts && relatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No similar products found.</p>
        )}
      </div>
    </main>
  );
}
