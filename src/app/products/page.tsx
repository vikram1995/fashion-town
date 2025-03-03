import Filter from "@/components/filter"
import Listing from "@/components/products"
import { Separator } from "@/components/ui/separator"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"


const ProductListingPage = async () => {
    const productList = await db.select().from(products)
    return (
        <div className="flex gap-4">
            <div className="hidden md:block min-w-48">
                <Filter />
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="">
                <Listing productList={productList} />
            </div>

        </div>
    )
}

export default ProductListingPage