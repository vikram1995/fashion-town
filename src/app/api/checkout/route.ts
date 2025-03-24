// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const { items, metadata } = await req.json();
  const headersList = await headers();
  const origin = headersList.get("origin");

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.images[0]],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      metadata: metadata,
    });

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json(
      { error: "Payment processing failed" },
      { status: 500 }
    );
  }
}
