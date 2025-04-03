// app/products/error.tsx
'use client'

import FilterSection from '@/components/filtersSidebar'
import { Separator } from '@/components/ui/separator'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex gap-4">
            <div className="hidden md:block min-w-60">
                <FilterSection />
            </div>
            <Separator orientation="vertical" className="h-auto" />
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <h2 className="text-2xl font-semibold mt-6 mb-2">
                    Something Went Wrong
                </h2>
                <p className="text-gray-600 mb-6">
                    We're having trouble loading products. Please try again later.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                >
                    Retry
                </button>
            </div>
        </div>
    )
}