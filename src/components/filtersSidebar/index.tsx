// components/filters-section.tsx
'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Slider } from '@/components/ui/slider'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useState } from 'react'

interface FilterSectionProps {
    gender: Array<{ name: string; count: number }>
    brands: Array<{ name: string; count: number }>
    colors: Array<{ name: string; count: number; hex: string }>
    priceRange: { min: number; max: number }
}

export default function FilterSection({
    gender,
    brands,
    colors,
    priceRange
}: FilterSectionProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        brands: false,
        colors: false
    })

    const handleFilterChange = (filterType: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        const currentValues = params.getAll(filterType)

        if (currentValues.includes(value)) {
            params.delete(filterType)
            currentValues.filter(v => v !== value).forEach(v => params.append(filterType, v))
        } else {
            params.append(filterType, value)
        }
        console.log("currentValues", currentValues)

        router.replace(`${pathname}?${params.toString()}`)
    }

    const toggleSection = (section: string) => {
        setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
    }

    return (
        <div className="min-w-[100%] p-8">
            {/* Categories Section */}
            <div className="pb-4 border-b">
                <h3 className="text-sm font-semibold mb-3">Gender</h3>
                <div className="space-y-2">
                    {gender.map((gender) => (
                        <label key={gender.name} className="flex items-center gap-2 group cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={searchParams.getAll('gender').includes(gender.name)}
                                    onChange={() => handleFilterChange('gender', gender.name)}
                                    className="sr-only"
                                />
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-sm group-hover:border-blue-500 flex items-center justify-center">
                                    {searchParams.getAll('gender').includes(gender.name) && (
                                        <Check className="w-3 h-3 text-blue-600" />
                                    )}
                                </div>
                            </div>
                            <span className="text-sm text-gray-700">
                                {gender.name} ({gender.count.toLocaleString()})
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Brands Section */}
            <div className="py-4 border-b">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-semibold">BRAND</h3>
                    <button
                        onClick={() => toggleSection('brands')}
                        className="text-blue-600 text-xs flex items-center gap-1"
                    >
                        {expandedSections.brands ? 'Show less' : 'Show more'}
                        {expandedSections.brands ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                </div>
                <div className="space-y-2">
                    {(expandedSections.brands ? brands : brands.slice(0, 5)).map((brand) => (
                        <label key={brand.name} className="flex items-center gap-2 group cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={searchParams.getAll('brand').includes(brand.name)}
                                    onChange={() => handleFilterChange('brand', brand.name)}
                                    className="sr-only"
                                />
                                <div className="w-4 h-4 border-2 border-gray-300 rounded-sm group-hover:border-blue-500 flex items-center justify-center">
                                    {searchParams.getAll('brand').includes(brand.name) && (
                                        <Check className="w-3 h-3 text-blue-600" />
                                    )}
                                </div>
                            </div>
                            <span className="text-sm text-gray-700">
                                {brand.name} ({brand.count.toLocaleString()})
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    )
}