import { db } from "@/lib/db"
import { address } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(
    req: Request,
    { params }: { params: { userId: string } }
) {
    const addresses = await db.select()
        .from(address)
        .where(eq(address.userId, params.userId))

    return NextResponse.json(addresses)
}