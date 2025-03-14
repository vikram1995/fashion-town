import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  //   const brand = searchParams.getAll("brand");
  //   const gender = searchParams.getAll("gender");

  const brandFilter = searchParams.brand
    ? sql`AND brand IN ${sql.raw(`(${typeof searchParams.brand == "string" ? `'${searchParams.brand}'` : searchParams.brand.map((b) => `'${b}'`).join(",")})`)}`
    : sql``;
  const genderFilter = searchParams.gender
    ? sql`AND gender IN ${sql.raw(`(${typeof searchParams.gender == "string" ? `'${searchParams.gender}'` : searchParams.gender.map((b) => `'${b}'`).join(",")})`)}`
    : sql``;

  try {
    const products = await db.execute(sql`
            SELECT * FROM products
            WHERE 1=1
            ${brandFilter}
            ${genderFilter}
            ORDER BY created_at DESC
            LIMIT 50
        `);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
