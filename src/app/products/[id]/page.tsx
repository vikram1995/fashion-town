


// app/products/[id]/page.tsx
import { db } from '@/lib/db'
import { products } from "@/lib/db/schema"
import { notFound } from 'next/navigation'
import Details from "@/components/products/details"
import { eq } from 'drizzle-orm'

export default async function ProductPage({
    params,
}: {
    params: { id: string }
}) {
    const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, params.id))
    console.log("product", product)

    return <div><Details product={product} /></div>
}