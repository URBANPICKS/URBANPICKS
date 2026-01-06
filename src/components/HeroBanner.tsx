import Link from 'next/link';

export default function HeroBanner() {
  return (
    <div className="relative h-[80vh] w-full bg-black overflow-hidden">
      {/* ব্যাকগ্রাউন্ড ইমেজ (ডার্ক ইফেক্ট সহ) */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-1000 hover:scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2193&auto=format&fit=crop')" }}
      ></div>
      
      {/* গ্রেডিয়েন্ট ওভারলে (নিচে কালো ফেড হবে) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      {/* লেখা এবং বাটন */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in tracking-tight">
          THE FUTURE OF <span className="text-accent">SHOPPING</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 animate-slide-in">
          Discover the most viral gadgets, aesthetic decor, and premium fashion directly from global trends.
        </p>
        
        <div className="flex gap-4">
          <Link 
            href="/category/gadgets-tech" 
            className="bg-accent text-black px-8 py-3 rounded-full font-bold hover:bg-white transition-all transform hover:scale-105 shadow-lg shadow-accent/20"
          >
            Shop Now
          </Link>
          <Link 
            href="/category/home-living" 
            className="border border-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition-all"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
