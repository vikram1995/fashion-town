import { Separator } from "@/components/ui/separator";

export default function Loading() {
    return (
        <div className="flex gap-4 animate-pulse">
            {/* Filter Section Skeleton */}
            <div className="hidden md:block min-w-60 p-8">
                <div className="pb-4 border-b">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="py-4 border-b">
                    <div className="flex justify-between mb-4">
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    </div>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-gray-200 rounded-sm"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Separator orientation="vertical" className="h-auto" />

            {/* Product Grid Skeleton */}
            <div className="flex-1">
                <div className="grid grid-cols-1 xm:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <div className="aspect-square bg-gray-200 rounded-lg"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}