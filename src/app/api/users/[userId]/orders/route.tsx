import { db } from "@/lib/db"
import { orders } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    const orderList = await db.select()
        .from(orders)
        .where(eq(orders.userId, params.userId))
        .orderBy(desc(orders.createdAt))

    return NextResponse.json(orderList)
}