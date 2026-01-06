"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Check, Clock, Truck, XCircle } from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ১. সব অর্ডার লোড করা
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // অর্ডার এবং তার ভেতরের আইটেমগুলো একসাথে আনা
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*, product:products(title))') // জয়েন কোয়েরি
      .order('created_at', { ascending: false });

    if (data) setOrders(data);
    setLoading(false);
  };

  // ২. স্ট্যাটাস আপডেট করা (যেমন: Shipped, Delivered)
  const updateStatus = async (orderId: number, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (!error) {
      alert(`Order #${orderId} status updated to ${newStatus}`);
      fetchOrders(); // লিস্ট রিফ্রেশ করা
    } else {
      alert("Failed to update status");
    }
  };

  // স্ট্যাটাস অনুযায়ী কালার সেট করা
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-900 text-green-400 border-green-700';
      case 'shipped': return 'bg-blue-900 text-blue-400 border-blue-700';
      case 'cancelled': return 'bg-red-900 text-red-400 border-red-700';
      default: return 'bg-yellow-900 text-yellow-400 border-yellow-700';
    }
  };

  if (loading) return <div className="text-white p-8">Loading orders...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Orders ({orders.length})</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-[#111] border border-gray-800 rounded-xl p-6 transition-all hover:border-[#D4AF37]">
            
            {/* অর্ডারের হেডার */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-800 pb-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Order ID: #{order.id}</p>
                <h3 className="text-xl font-bold text-white mt-1">
                  {order.shipping_address?.fullName}
                </h3>
                <p className="text-xs text-gray-400">{order.user_email} • {order.shipping_address?.phone}</p>
              </div>

              <div className="flex items-center gap-4">
                <span className={`px-4 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.status)} uppercase`}>
                  {order.status}
                </span>
                
                {/* স্ট্যাটাস চেঞ্জ ড্রপডাউন */}
                <select 
                  className="bg-black border border-gray-700 text-white text-sm rounded-lg p-2 outline-none focus:border-[#D4AF37]"
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* অর্ডারের আইটেম ও ঠিকানা */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* কী কী কিনেছে */}
              <div>
                <h4 className="text-gray-400 text-sm mb-2 font-bold">Items Ordered:</h4>
                <ul className="space-y-2">
                  {order.order_items?.map((item: any, idx: number) => (
                    <li key={idx} className="flex justify-between text-sm text-gray-300">
                      <span>{item.quantity}x {item.product?.title || "Unknown Product"}</span>
                      <span className="text-gray-500">₹{item.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 pt-3 border-t border-gray-800 flex justify-between font-bold text-[#D4AF37]">
                  <span>Total Amount</span>
                  <span>₹{order.total_amount}</span>
                </div>
              </div>

              {/* ডেলিভারি ঠিকানা */}
              <div className="bg-black p-4 rounded-lg">
                <h4 className="text-gray-400 text-sm mb-2 font-bold flex items-center gap-2">
                  <Truck className="w-4 h-4" /> Shipping Address
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {order.shipping_address?.address}, <br />
                  {order.shipping_address?.city} - {order.shipping_address?.zip}
                </p>
                <p className="text-xs text-gray-500 mt-2">Payment: {order.shipping_address?.paymentMethod?.toUpperCase()}</p>
              </div>

            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="text-center py-20 bg-[#111] rounded-xl">
            <p className="text-gray-500">No orders received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
