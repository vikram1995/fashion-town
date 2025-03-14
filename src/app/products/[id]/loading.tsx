
export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Left Column - Image Gallery Skeleton */}
                <div className="md:col-span-1 lg:col-span-2">
                    <div className="grid grid-cols-5 gap-4">
                        {/* Thumbnails */}
                        <div className="col-span-1 space-y-4">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-square bg-gray-200 rounded animate-pulse"
                                />
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="col-span-4 aspect-square bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>

                {/* Right Column - Details Skeleton */}
                <div className="space-y-6">
                    {/* Brand & Title */}
                    <div className="space-y-2">
                        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                    </div>

                    {/* Pricing Section */}
                    <div className="space-y-2">
                        <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
                        <div className="h-4 bg-gray-200 rounded w-1/6 animate-pulse" />
                    </div>

                    {/* Offers */}
                    <div className="p-4 bg-gray-50 rounded space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <div className="h-4 w-4 bg-gray-200 rounded-full" />
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                            </div>
                        ))}
                    </div>

                    {/* Size Selector */}
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <div className="h-5 bg-gray-200 rounded w-1/4" />
                            <div className="h-5 bg-gray-200 rounded w-1/6" />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-4">
                        <div className="h-12 bg-gray-200 rounded animate-pulse" />
                        <div className="h-12 bg-gray-200 rounded animate-pulse" />
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4 pt-6 border-t">
                        <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Ratings & Reviews Skeleton */}
            <section className="mt-12">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4" />
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="bg-gray-50 p-4 rounded space-y-3">
                        <div className="h-10 bg-gray-200 rounded mx-auto w-1/4" />
                        <div className="flex justify-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-5 w-5 bg-gray-200 rounded-full" />
                            ))}
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
                    </div>
                    <div className="md:col-span-3 space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="border-b pb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, j) => (
                                            <div key={j} className="h-4 w-4 bg-gray-200 rounded-full" />
                                        ))}
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-1/6" />
                                    <div className="h-4 bg-gray-200 rounded w-1/6" />
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-3/4 mt-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}