import FilterSection from "@/components/filtersSidebar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

function NotFound() {
    return (
        <div className="flex gap-4">
            <div className="hidden md:block min-w-60">
                <FilterSection />
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="flex-1 flex flex-col items-center justify-center p-8">

                <h2 className="text-2xl font-semibold mt-6 mb-2">
                    No Products Found
                </h2>
                <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search terms
                </p>
                <Link
                    href="/products"
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                    Explore Collection
                </Link>
            </div>
        </div>
    )
}

export default NotFound