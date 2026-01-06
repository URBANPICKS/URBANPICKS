"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // সুপাবেস ম্যাজিক লিংক লগইন (পাসওয়ার্ড ছাড়া)
      const { error } = await supabase.auth.signInWithOtp({ email });
      
      if (error) throw error;
      
      alert("Check your email for the login link!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111] border border-gray-800 p-8 rounded-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Sign in to manage your orders & profile</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-gray-700 pl-10 p-3 rounded-lg text-white focus:border-[#D4AF37] outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black font-bold py-3 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Sending..." : <><Lock className="w-4 h-4" /> Send Magic Link</>}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">
          We'll send a secure link to your email. No password needed.
        </p>
      </div>
    </div>
  );
}
