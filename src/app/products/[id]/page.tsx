


// app/products/[id]/page.tsx
import { db } from '@/lib/db'
import { products } from "@/lib/db/schema"
import Details from "@/components/products/details"
import { eq } from 'drizzle-orm'

export default async function ProductPage({
    params,
}: {
    params: { id: string }
}) {
    const { id } = await params
    const [product] = await db
        .select()
        .from(products)
        .where(eq(products.id, id))

    return (
        <Details product={product} />
    )

}