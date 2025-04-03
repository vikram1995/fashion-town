function Loading() {
    return (
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
    )
}

export default Loading