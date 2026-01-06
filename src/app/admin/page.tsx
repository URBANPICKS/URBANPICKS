import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { DollarSign, ShoppingBag, Package, ArrowUpRight } from "lucide-react";

// ড্যাশবোর্ড সবসময় ফ্রেশ ডাটা দেখাবে
export const revalidate = 0;

export default async function AdminDashboard() {
  
  // ১. ডাটাবেস থেকে সব তথ্য আনা
  const { data: orders } = await supabase.from('orders').select('*');
  const { data: products } = await supabase.from('products').select('*');

  // ২. হিসাব-নিকাশ করা
  const totalOrders = orders?.length || 0;
  const totalProducts = products?.length || 0;
  
  // মোট আয় যোগ করা (Total Revenue)
  const totalRevenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      {/* ১. পরিসংখ্যান কার্ড (Stats Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* মোট আয় */}
        <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Total Revenue</h3>
            <div className="p-2 bg-green-900/30 rounded-lg text-green-500">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">₹{totalRevenue}</p>
          <p className="text-sm text-green-500 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-4 h-4" /> +10% from last month
          </p>
        </div>

        {/* মোট অর্ডার */}
        <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Total Orders</h3>
            <div className="p-2 bg-blue-900/30 rounded-lg text-blue-500">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{totalOrders}</p>
          <p className="text-sm text-gray-500 mt-2">Pending delivery</p>
        </div>

        {/* মোট প্রোডাক্ট */}
        <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400 font-medium">Active Products</h3>
            <div className="p-2 bg-purple-900/30 rounded-lg text-purple-500">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white">{totalProducts}</p>
          <Link href="/admin/add-product" className="text-sm text-[#D4AF37] mt-2 hover:underline block">
            + Add New Product
          </Link>
        </div>

      </div>

      {/* ২. রিসেন্ট অর্ডার টেবিল */}
      <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center">
          <h3 className="text-xl font-bold">Recent Orders</h3>
          <Link href="/admin/orders" className="text-sm text-[#D4AF37] hover:underline">View All</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black text-gray-400 text-sm uppercase">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Status</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {orders && orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="p-4 font-mono text-sm">#{order.id}</td>
                    <td className="p-4">
                      <div className="font-bold text-white">{order.shipping_address?.fullName || "Guest"}</div>
                      <div className="text-xs text-gray-500">{order.user_email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'delivered' ? 'bg-green-900 text-green-400' :
                        order.status === 'shipped' ? 'bg-blue-900 text-blue-400' :
                        'bg-yellow-900 text-yellow-400'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 font-bold">₹{order.total_amount}</td>
                    <td className="p-4 text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No orders found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
