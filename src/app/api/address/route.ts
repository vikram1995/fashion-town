// app/api/address/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { address } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // If setting as default, update existing defaults
    if (body.isDefault) {
      await db
        .update(address)
        .set({ isDefault: false })
        .where(eq(address.userId, body.userId));
    }

    const [newAddress] = await db.insert(address).values(body).returning();

    return NextResponse.json(newAddress);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to save address" },
      { status: 500 }
    );
  }
}

// Add PATCH for setting default
export async function PATCH(req: Request) {
  try {
    const { addressId, userId } = await req.json();

    await db.transaction(async (tx) => {
      await tx
        .update(address)
        .set({ isDefault: false })
        .where(eq(address.userId, userId));

      await tx
        .update(address)
        .set({ isDefault: true })
        .where(eq(address.id, addressId));
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update address" },
      { status: 500 }
    );
  }
}
