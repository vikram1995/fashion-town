// app/products/loading.tsx
export default function Loading() {
    return (
        <div className="max-w-7xl  px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
                {/* Filter Skeleton */}
                <div className="w-72 pr-6 space-y-6">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="space-y-4 pb-4 border-b">
                            <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                            <div className="space-y-2">
                                {[...Array(4)].map((_, j) => (
                                    <div key={j} className="flex items-center gap-2">
                                        <div className="w-4 h-4 bg-gray-200 rounded-sm animate-pulse" />
                                        <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Product Grid Skeleton */}
                <div className="flex-1">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="aspect-square bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}