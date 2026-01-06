// ক্যাটাগরি দেখতে কেমন হবে
export interface Category {
  id: number;
  name: string;
  slug: string;
  image_url: string | null;
}

// প্রোডাক্ট দেখতে কেমন হবে (SQL টেবিলের সাথে মিল রেখে)
export interface Product {
  id: number;
  title: string;          // পণ্যের নাম
  description: string;    // বিবরণ
  price: number;          // বর্তমান দাম
  compare_at_price: number | null; // আগের দাম (ডিসকাউন্ট)
  stock: number;
  images: string[];       // অনেকগুলো ছবির লিংক
  category_id: number;
  sub_category_id: number | null;
  is_featured: boolean;
  is_bestseller: boolean;
}

// কার্টে বা ঝুড়িতে প্রোডাক্ট যখন থাকবে, তখন দেখতে কেমন হবে
export interface CartItem {
  id: number;       // প্রোডাক্ট আইডি
  title: string;
  price: number;
  image: string;    // কার্টে দেখানোর জন্য মেইন ছবি
  quantity: number; // কয় পিস কিনছে
}
