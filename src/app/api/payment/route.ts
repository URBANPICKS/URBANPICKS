import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  const { amount } = await req.json();

  // চেক করা হচ্ছে চাবি আছে কিনা। না থাকলে এরর দেবে না, শুধু লগ করবে।
  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ error: "Razorpay keys not found" }, { status: 500 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: amount * 100, // Razorpay পয়সায় হিসাব করে (INR)
    currency: "INR",
    receipt: "order_" + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Payment creation failed" }, { status: 500 });
  }
}
