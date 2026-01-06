"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Save, Facebook, Instagram, Youtube, Twitter, Phone, Mail, Globe } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  
  // স্ট্যাট ম্যানেজমেন্ট
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [contactInfo, setContactInfo] = useState({ phone: "", email: "" });

  // ডাটা লোড করা
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // ১. সোশ্যাল লিংক আনা
    const { data: links } = await supabase.from('social_links').select('*').order('id');
    if (links) setSocialLinks(links);

    // ২. কন্টাক্ট ইনফো আনা
    const { data: settings } = await supabase.from('site_settings').select('*');
    if (settings) {
      const phone = settings.find(s => s.key === 'phone')?.value || "";
      const email = settings.find(s => s.key === 'email')?.value || "";
      setContactInfo({ phone, email });
    }
  };

  // সেভ করা
  const handleSave = async () => {
    setLoading(true);
    try {
      // ১. সোশ্যাল লিংক আপডেট
      const linkUpdates = socialLinks.map(link => ({
        id: link.id, platform: link.platform, url: link.url
      }));
      await supabase.from('social_links').upsert(linkUpdates);

      // ২. কন্টাক্ট ইনফো আপডেট
      const settingsUpdates = [
        { key: 'phone', value: contactInfo.phone },
        { key: 'email', value: contactInfo.email }
      ];
      // সুপাবেসে 'key' ইউনিক, তাই upsert কাজ করবে যদি কনফ্লিক্ট হ্যান্ডেল করা থাকে, 
      // তবে সহজ উপায়ে আমরা লুপ চালিয়ে আপডেট করব
      for (const item of settingsUpdates) {
        await supabase.from('site_settings').update({ value: item.value }).eq('key', item.key);
      }

      alert("✅ All Settings Updated Successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving settings!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-10">
      <h1 className="text-3xl font-bold mb-8">Site Settings</h1>
      
      {/* ১. কন্টাক্ট ইনফরমেশন সেকশন */}
      <div className="bg-[#111] border border-gray-800 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Globe className="text-[#D4AF37]" /> Contact Information
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Support Phone
            </label>
            <input
              type="text"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className="w-full bg-black border border-gray-700 p-3 rounded-lg text-white focus:border-[#D4AF37] outline-none"
              placeholder="+91 98765..."
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" /> Support Email
            </label>
            <input
              type="text"
              value={contactInfo.email}
              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              className="w-full bg-black border border-gray-700 p-3 rounded-lg text-white focus:border-[#D4AF37] outline-none"
              placeholder="support@urbanpicks.com"
            />
          </div>
        </div>
      </div>

      {/* ২. সোশ্যাল মিডিয়া সেকশন */}
      <div className="bg-[#111] border border-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Globe className="text-[#D4AF37]" /> Social Media Links
        </h2>
        
        <div className="space-y-4">
          {socialLinks.map((link, index) => (
            <div key={link.id}>
              <label className="block text-gray-400 mb-2 capitalize flex items-center gap-2">
                {link.platform} URL
              </label>
              <input
                type="text"
                value={link.url}
                onChange={(e) => {
                  const newLinks = [...socialLinks];
                  newLinks[index].url = e.target.value;
                  setSocialLinks(newLinks);
                }}
                className="w-full bg-black border border-gray-700 p-3 rounded-lg text-white focus:border-[#D4AF37] outline-none"
              />
            </div>
          ))}
        </div>

        <button 
          onClick={handleSave}
          disabled={loading}
          className="mt-8 w-full bg-[#D4AF37] text-black font-bold py-4 rounded-lg hover:bg-white transition-all flex items-center justify-center gap-2"
        >
          {loading ? "Saving..." : <><Save className="w-5 h-5" /> Save All Changes</>}
        </button>
      </div>
    </div>
  );
}
