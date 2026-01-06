import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // ভবিষ্যতে যখন আমরা অনলাইন পেমেন্ট (Stripe/Razorpay) অ্যাড করব, 
  // তখন পেমেন্ট কনফার্মেশনের মেসেজ এখানে আসবে।
  
  // আপাতত এটি শুধু ২০০ (OK) স্ট্যাটাস পাঠাবে যাতে কোনো এরর না হয়।
  return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 });
}
