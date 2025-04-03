import Listing from "@/components/products"
import { Separator } from "@/components/ui/separator"
import { Suspense } from "react"
import FilterSection from "@/components/filtersSidebar"
import Loading from "@/components/products/loading"

const ProductListing = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    return (
        <div className="flex gap-4 h-full">
            <div className="hidden md:block min-w-60">
                <FilterSection />
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="flex-1">
                <Suspense key={JSON.stringify(searchParams)} fallback={<Loading />}>
                    <Listing searchParams={searchParams} />
                </Suspense>
            </div>
        </div>

    )
}

export default ProductListing