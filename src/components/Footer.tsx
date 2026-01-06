import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export const revalidate = 0; 

export default async function Footer() {
  // ১. সোশ্যাল লিংক আনা
  const { data: socialLinks } = await supabase.from('social_links').select('*');
  
  // ২. কন্টাক্ট সেটিংস আনা
  const { data: settings } = await supabase.from('site_settings').select('*');

  // হেল্পার ফাংশন
  const getLink = (platform: string) => socialLinks?.find(l => l.platform === platform)?.url || '#';
  const getSetting = (key: string) => settings?.find(s => s.key === key)?.value || "Not Available";

  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* ব্র্যান্ড */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            URBAN<span className="text-[#D4AF37]">PICKS</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Premium Dropshipping Store. Quality & Trust.
          </p>
        </div>

        {/* লিংকস */}
        <div>
          <h3 className="text-white font-bold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/category/gadgets-tech" className="hover:text-[#D4AF37]">Gadgets</Link></li>
            <li><Link href="/category/men-fashion" className="hover:text-[#D4AF37]">Fashion</Link></li>
          </ul>
        </div>

        {/* লিগ্যাল */}
        <div>
          <h3 className="text-white font-bold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:text-[#D4AF37]">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-[#D4AF37]">Terms of Service</Link></li>
          </ul>
        </div>

        {/* ডায়নামিক কন্টাক্ট */}
        <div>
          <h3 className="text-white font-bold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" /> Kolkata, West Bengal
            </li>
            
            {/* ফোন নাম্বার (ডাটাবেস থেকে) */}
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D4AF37]" /> {getSetting('phone')}
            </li>

            {/* ইমেইল (ডাটাবেস থেকে) */}
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D4AF37]" /> {getSetting('email')}
            </li>
            
            {/* সোশ্যাল আইকন */}
            <li className="flex gap-4 mt-4">
              {getLink('facebook') && <a href={getLink('facebook')} target="_blank"><Facebook className="w-5 h-5 hover:text-[#D4AF37]" /></a>}
              {getLink('instagram') && <a href={getLink('instagram')} target="_blank"><Instagram className="w-5 h-5 hover:text-[#D4AF37]" /></a>}
              {getLink('youtube') && <a href={getLink('youtube')} target="_blank"><Youtube className="w-5 h-5 hover:text-[#D4AF37]" /></a>}
            </li>
          </ul>
        </div>

      </div>
      <div className="text-center text-xs mt-12 border-t border-gray-900 pt-8">
        &copy; {new Date().getFullYear()} Urban Picks.
      </div>
    </footer>
  );
}
