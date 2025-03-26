
'use client'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FILTER_DATA } from '@/lib/constants'

export default function FilterSection() {
    const [filters, setFilters] = useState(FILTER_DATA)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()


    const updateInParams = (filterType: string, value: string) => {
        const params = new URLSearchParams(searchParams)
        const currentValues = params.getAll(filterType)

        if (currentValues.includes(value)) {
            params.delete(filterType)
            currentValues.filter(v => v !== value).forEach(v => params.append(filterType, v))
        } else {
            params.append(filterType, value)
        }
        router.replace(`${pathname}?${params.toString()}`)
    }

    const toggleSection = (categoryKey: string) => {
        setFilters(prevData => ({
            ...prevData,
            [categoryKey]: {
                ...prevData[categoryKey],
                isExpanded: !prevData[categoryKey].isExpanded
            }
        }))
    }
    const toggleCheckbox = (categoryKey, optionName) => {
        setFilters(prevData => ({
            ...prevData,
            [categoryKey]: {
                ...prevData[categoryKey],
                options: prevData[categoryKey].options.map(opt =>
                    opt.name === optionName
                        ? { ...opt, isChecked: !opt.isChecked }
                        : opt
                )
            }
        }));
        updateInParams(categoryKey, optionName)
    };

    useEffect(() => {
        const updatedFilters = Object.fromEntries(
            Object.entries(filters).map(([categoryKey, category]) => [
                categoryKey,
                {
                    ...category,
                    options: category.options.map(option => ({
                        ...option,
                        isChecked: searchParams.getAll(categoryKey).includes(option.name)
                    }))
                }
            ])
        );
        setFilters(updatedFilters);
    }, [searchParams])

    return (
        <div className="min-w-[100%] p-8">
            {
                Object.entries(filters).map(([categoryName, { isExpanded, options }]) => {
                    // Render categoryName and its options
                    return (<div className="py-4 border-b" key={categoryName}>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-sm font-semibold">{categoryName?.toUpperCase()}</h3>
                            {options.length > 5 && <button
                                onClick={() => toggleSection(categoryName)}
                                className="text-blue-600 text-xs flex items-center gap-1"
                            >
                                {isExpanded ? 'Show less' : 'Show more'}
                                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>}
                        </div>
                        <div className="space-y-2">
                            {(isExpanded ? options : options.slice(0, 5)).map((option, index) => (
                                <label key={option.name} className="flex items-center gap-2 group cursor-pointer">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={option.isChecked}
                                            onChange={() => toggleCheckbox(categoryName, option.name)}
                                            className="sr-only"
                                        />
                                        <div className="w-4 h-4 border-2 border-gray-300 rounded-sm group-hover:border-blue-500 flex items-center justify-center">
                                            {option.isChecked && (
                                                <Check className="w-3 h-3 text-blue-600" />
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-700">
                                        {option.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>)
                })
            }
        </div>
    )
}