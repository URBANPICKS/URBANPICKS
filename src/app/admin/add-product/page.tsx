"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // ক্যাটাগরি লোড করার জন্য
  const [categories, setCategories] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  // ফর্মের ডাটা
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    compare_at_price: "",
    category_id: "",
    sub_category_id: "",
    image1: "", // মেইন ছবি
    image2: "", // অতিরিক্ত ছবি
    image3: "", // অতিরিক্ত ছবি
  });

  // ১. পেজ লোড হলে ক্যাটাগরিগুলো নিয়ে এসো
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('categories').select('*');
      if (data) setCategories(data);
    };
    fetchCategories();
  }, []);

  // ২. ক্যাটাগরি সিলেক্ট করলে সাব-ক্যাটাগরি লোড করো
  useEffect(() => {
    const fetchSubCats = async () => {
      if (!formData.category_id) return;
      const { data } = await supabase
        .from('sub_categories')
        .select('*')
        .eq('category_id', formData.category_id);
      if (data) setSubCategories(data);
    };
    fetchSubCats();
  }, [formData.category_id]);

  // ইনপুট হ্যান্ডেল করা
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ৩. প্রোডাক্ট সেভ করা (Submit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ইমেজের লিংকগুলোকে অ্যারে (Array) বানানো
      const imagesArray = [formData.image1, formData.image2, formData.image3].filter(Boolean);

      const { error } = await supabase.from('products').insert([
        {
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          compare_at_price: formData.compare_at_price ? Number(formData.compare_at_price) : null,
          category_id: Number(formData.category_id),
          sub_category_id: formData.sub_category_id ? Number(formData.sub_category_id) : null,
          images: imagesArray,
          stock: 100, // ডিফল্ট স্টক
          is_featured: true
        }
      ]);

      if (error) throw error;

      alert("✅ Product Added Successfully!");
      router.push("/admin"); // ড্যাশবোর্ডে ফিরে যাও

    } catch (error: any) {
      console.error(error);
      alert("Error adding product: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* নাম */}
        <div>
          <label className="block text-gray-400 mb-2">Product Title</label>
          <input required name="title" onChange={handleChange} className="w-full bg-[#111] border border-gray-800 p-3 rounded-lg text-white focus:border-[#D4AF37] outline-none" placeholder="e.g. Wireless Headphones" />
        </div>

        {/* বর্ণনা */}
        <div>
          <label className="block text-gray-400 mb-2">Description</label>
          <textarea required name="description" rows={4} onChange={handleChange} className="w-full bg-[#111] border border-gray-800 p-3 rounded-lg text-white focus:border-[#D4AF37] outline-none" placeholder="Product details..." />
        </div>

        {/* দাম */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-2">Sale Price (₹)</label>
            <input required type="number" name="price" onChange={handleChange} className="w-full bg-[#111] border border-gray-800 p-3 rounded-lg text-white outline-none" placeholder="999" />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Original Price (₹)</label>
            <input type="number" name="compare_at_price" onChange={handleChange} className="w-full bg-[#111] border border-gray-800 p-3 rounded-lg text-white outline-none" placeholder="2000" />
          </div>
        </div>

        {/* ক্যাটাগরি সিলেকশন */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-2">Category</label>
            <select required name="category_id" onChange={handleChange} className="w-full bg-[#111] border border-gray-800 p-3 rounded-lg text-white outline-none">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 mb-2">Sub-Category</label>
            <select name="sub_category_id" onChange={handleChange} className="w-full bg-[#111] border border-gray-800 p-3 rounded-lg text-white outline-none">
              <option value="">Select Sub-Category</option>
              {subCategories.map((sub) => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* ছবি (URL) */}
        <div className="space-y-3">
          <label className="block text-gray-400">Image URLs (Copy from supplier)</label>
          <input required name="image1" onChange={handleChange} className="w-full bg-[#111] border border-gray-800 p-3 rounded-lg text-white outline-none" placeholder="Main Image URL (https://...)" />
          <input name="image2" onChange={handleChange} className="w-full bg-[#111] border border-gray-800 p-3 rounded-lg text-white outline-none" placeholder="Second Image URL (Optional)" />
          <input name="image3" onChange={handleChange} className="w-full bg-[#111] border border-gray-800 p-3 rounded-lg text-white outline-none" placeholder="Third Image URL (Optional)" />
        </div>

        {/* সাবমিট বাটন */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#D4AF37] text-black font-bold py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2"
        >
          {loading ? "Saving..." : <><Save className="w-5 h-5" /> Save Product</>}
        </button>

      </form>
    </div>
  );
}
