import { db } from "@/lib/db";
import { orders } from "@/lib/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { metadata, session, items } = await req.json();
  console.log("payload", session);
  try {
    // Create order in database
    const newOrder = await db.insert(orders).values({
      id: session.id,
      userId: metadata.userId,
      items: items,
      total: (session.amount_total! / 100).toFixed(2),
      address: metadata.address,
      paymentId: session.payment_intent as string,
      status: "processing",
    });
    return NextResponse.json(newOrder);
  } catch (error) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: "Order failed" }, { status: 500 });
  }
}
