// components/products/index.tsx
import Card from '@/components/products/card'
import { db } from '@/lib/db'
import { Product } from '@/lib/db/schema'
import { sql } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Loading from './loading'
import EmptyState from './emptyState'
// New component

const Listing = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const { brands, gender, search } = searchParams

    // Build parameterized query
    const queryParams = []
    const filters = []

    if (brands) {
        const brandList = Array.isArray(brands) ? brands : [brands]
        filters.push(sql`brand IN ${brandList}`)
    }

    if (gender) {
        const genderList = Array.isArray(gender) ? gender : [gender]
        filters.push(sql`gender IN ${genderList}`)
    }

    if (search) {
        filters.push(sql`
            (name ILIKE '%' || ${search} || '%' OR 
            brand ILIKE '%' || ${search} || '%' OR 
            gender ILIKE '%' || ${search} || '%')
        `)
    }

    const whereClause = filters.length > 0
        ? sql`WHERE ${sql.join(filters, sql` AND `)}`
        : sql``

    try {
        const products = await db.execute(sql`
            SELECT * FROM products
            ${whereClause}
            ORDER BY created_at DESC
            LIMIT 50
        `)

        if (!products.rows.length) {
            return <EmptyState />
        }

        return (
            <div className="grid grid-cols-2 xm:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {products.rows.map((product: Product) => (
                    <Card key={product.id} product={product} />
                ))}
            </div>
        )
    } catch (error) {
        console.error('Failed to fetch products:', error)
        throw Error(error)
    }
}

export default Listing