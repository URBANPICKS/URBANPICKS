"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabaseClient";
import { Truck, CreditCard, Lock, Banknote, ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // ডিফল্ট COD

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", zip: ""
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ১. অর্ডার ডাটাবেসে সেভ করার ফাংশন (কমন ফাংশন)
  const saveOrderToSupabase = async (paymentId: string | null, status: string) => {
    const { data: orderData, error } = await supabase
      .from('orders')
      .insert([{
        user_email: formData.email,
        total_amount: cartTotal,
        status: status === 'paid' ? 'processing' : 'pending',
        payment_id: paymentId,
        shipping_address: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
          paymentMethod: paymentMethod
        }
      }])
      .select().single();

    if (error) throw error;

    // আইটেম সেভ করা
    const orderItems = cart.map((item) => ({
      order_id: orderData.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    await supabase.from('order_items').insert(orderItems);
    
    clearCart();
    alert(status === 'paid' ? "🎉 Payment Successful! Order Placed." : "🎉 Order Placed Successfully via COD!");
    router.push("/");
  };

  // ২. পেমেন্ট প্রসেস হ্যান্ডেল করা
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMethod === "online") {
        // --- অনলাইন পেমেন্ট লজিক ---
        
        // ১. অর্ডার আইডি তৈরি করা
        const res = await fetch("/api/payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: cartTotal }),
        });
        
        const order = await res.json();

        if (order.error) {
          alert("Payment gateway not ready yet. Please use COD.");
          setLoading(false);
          return;
        }

        // ২. Razorpay ওপেন করা
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // ভার্সেল থেকে চাবি নেবে
          amount: order.amount,
          currency: "INR",
          name: "Urban Picks",
          description: "Order Payment",
          order_id: order.id,
          handler: async function (response: any) {
            // পেমেন্ট সফল হলে ডাটাবেসে সেভ
            await saveOrderToSupabase(response.razorpay_payment_id, 'paid');
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            contact: formData.phone,
          },
          theme: { color: "#D4AF37" },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();

      } else {
        // --- COD লজিক ---
        await saveOrderToSupabase(null, 'pending');
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      if (paymentMethod === 'cod') setLoading(false);
    }
  };

  if (cart.length === 0) return <div className="p-10 text-center text-white">Cart is empty</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-white">
      {/* Razorpay স্ক্রিপ্ট লোড করা হচ্ছে */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <h1 className="text-3xl font-bold mb-8">Secure Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* ফর্ম */}
        <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-6">
          <div className="bg-[#111] border border-gray-800 p-6 rounded-xl space-y-4">
             <h2 className="text-xl font-bold mb-4 flex gap-2"><Truck className="text-[#D4AF37]" /> Shipping Details</h2>
             <div className="grid grid-cols-2 gap-4">
               <input required name="firstName" placeholder="First Name" onChange={handleInputChange} className="input-style" />
               <input required name="lastName" placeholder="Last Name" onChange={handleInputChange} className="input-style" />
             </div>
             <input required name="email" type="email" placeholder="Email" onChange={handleInputChange} className="input-style" />
             <input required name="phone" type="tel" placeholder="Phone" onChange={handleInputChange} className="input-style" />
             <input required name="address" placeholder="Address" onChange={handleInputChange} className="input-style" />
             <div className="grid grid-cols-2 gap-4">
               <input required name="city" placeholder="City" onChange={handleInputChange} className="input-style" />
               <input required name="zip" placeholder="Zip Code" onChange={handleInputChange} className="input-style" />
             </div>
          </div>

          {/* পেমেন্ট অপশন সিলেকশন */}
          <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 flex gap-2"><CreditCard className="text-[#D4AF37]" /> Payment Method</h2>
            <div className="space-y-3">
              
              {/* COD অপশন */}
              <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[#D4AF37] bg-gray-900' : 'border-gray-800'}`}>
                <input type="radio" name="pay" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="accent-[#D4AF37]" />
                <Banknote className="w-5 h-5 text-green-500" />
                <span className="font-bold">Cash on Delivery (COD)</span>
              </label>
              
              {/* Online অপশন */}
              <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'online' ? 'border-[#D4AF37] bg-gray-900' : 'border-gray-800'}`}>
                <input type="radio" name="pay" value="online" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="accent-[#D4AF37]" />
                <CreditCard className="w-5 h-5 text-blue-500" />
                <span className="font-bold">Online Payment (UPI/Cards)</span>
                <span className="ml-auto text-[10px] bg-[#D4AF37] text-black px-2 rounded font-bold">FAST</span>
              </label>

            </div>
          </div>
        </form>

        {/* সামারি */}
        <div className="bg-[#111] border border-gray-800 p-6 rounded-xl h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between text-xl font-bold mb-6 border-b border-gray-800 pb-4">
            <span>Total to Pay</span>
            <span className="text-[#D4AF37]">₹{cartTotal}</span>
          </div>

          <button 
            type="submit" 
            form="checkout-form"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black py-4 rounded-xl font-bold hover:bg-white transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Processing..." : (
              paymentMethod === 'online' ? <><Lock className="w-4 h-4" /> Pay Now</> : <><Truck className="w-4 h-4" /> Place Order (COD)</>
            )}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-4">
            <ShieldCheck className="w-3 h-3 inline mr-1" /> 
            {paymentMethod === 'online' ? "Payments are 100% secured by Razorpay" : "Pay securely upon delivery"}
          </p>
        </div>
      </div>
      
      <style jsx>{`
        .input-style {
          width: 100%; background: black; border: 1px solid #333; padding: 12px; border-radius: 8px; color: white; outline: none;
        }
        .input-style:focus { border-color: #D4AF37; }
      `}</style>
    </div>
  );
          }
                 
      
