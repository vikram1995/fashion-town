import Listing from "@/components/products"
import { Separator } from "@/components/ui/separator"
import { db } from "@/lib/db"
import { sql } from "drizzle-orm"
import { Suspense } from "react"
import Loading from "./loading"
import FilterSection from "@/components/filtersSidebar"

const ProductListing = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    const { brands, gender } = await searchParams

    const brandFilter = brands
        ? sql`AND brand IN ${sql.raw(`(${typeof brands == "string" ? `'${brands}'` : brands.map(b => `'${b}'`).join(',')})`)}`
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
                <FilterSection />
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="">
                <Suspense fallback={<Loading />} key={JSON.stringify(searchParams)} >
                    <Listing initialProducts={products?.rows} />
                </Suspense>
            </div>

        </div >

    )
}

export default ProductListing