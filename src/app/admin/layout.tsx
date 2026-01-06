import Link from "next/link";
import { LayoutDashboard, PlusCircle, Package, ArrowLeft, Settings } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* বাম পাশের সাইডবার */}
      <aside className="w-64 border-r border-gray-800 p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-[#D4AF37]">Admin Panel</h2>
        
        <nav className="space-y-4">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900 text-gray-400 hover:text-white transition-all">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          
          <Link href="/admin/add-product" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900 text-gray-400 hover:text-white transition-all">
            <PlusCircle className="w-5 h-5" /> Add Product
          </Link>

          <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900 text-gray-400 hover:text-white transition-all">
            <Package className="w-5 h-5" /> Orders
          </Link>

          {/* নতুন Settings বাটন এখানে যুক্ত করা হয়েছে */}
          <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900 text-gray-400 hover:text-white transition-all">
            <Settings className="w-5 h-5" /> Settings
          </Link>

          <div className="pt-8 border-t border-gray-800 mt-8">
            <Link href="/" className="flex items-center gap-3 text-sm text-gray-500 hover:text-white">
              <ArrowLeft className="w-4 h-4" /> Back to Website
            </Link>
          </div>
        </nav>
      </aside>

      {/* ডান পাশের মেইন কন্টেন্ট */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
