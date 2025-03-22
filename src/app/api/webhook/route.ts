import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { orders, cartItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const metadata = session.metadata;

        if (!metadata?.userId || !metadata?.items || !metadata?.address) {
          throw new Error("Missing required metadata");
        }

        // Create order in database
        await db.insert(orders).values({
          id: session.id,
          userId: metadata.userId,
          items: JSON.parse(metadata.items),
          total: (session.amount_total! / 100).toFixed(2),
          address: JSON.parse(metadata.address),
          paymentId: session.payment_intent as string,
          status: "processing",
        });

        // Clear user's cart
        await db.delete(cartItems).where(eq(cartItems.userId, metadata.userId));

        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;
        await db
          .update(orders)
          .set({ status: "completed" })
          .where(eq(orders.paymentId, paymentIntent.id));
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;
        await db
          .update(orders)
          .set({ status: "failed" })
          .where(eq(orders.paymentId, paymentIntent.id));
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}
