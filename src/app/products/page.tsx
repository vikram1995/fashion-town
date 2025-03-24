import Listing from "@/components/products"
import { Separator } from "@/components/ui/separator"
import { db } from "@/lib/db"
import { sql } from "drizzle-orm"

const ProductListing = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    const { brand, gender } = await searchParams
    const brandFilter = brand
        ? sql`AND brand IN ${sql.raw(`(${typeof brand == "string" ? `'${brand}'` : brand.map(b => `'${b}'`).join(',')})`)}`
        : sql``
    const genderFilter = gender
        ? sql`AND gender IN ${sql.raw(`(${typeof gender == "string" ? `'${gender}'` : gender.map(b => `'${b}'`).join(',')})`)}`
        : sql``

    // Fetch filtered products
    const products = await db.execute(sql`
    SELECT * FROM products
    WHERE 1=1
    ${brandFilter}
    ${genderFilter}
    ORDER BY created_at DESC
    LIMIT 50
  `)
    return (
        <div className="flex gap-4">
            <div className="hidden md:block min-w-60">
                {/* <FilterSection {...FILTER_DATA} /> */}
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="">

                <Listing initialProducts={products?.rows} />

            </div>

        </div >
    )
}

export default ProductListing