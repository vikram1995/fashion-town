'use client'

import React, { Suspense, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { debounceTheFunc } from '@/lib/utils'
import { isEmpty } from "lodash"

function Search() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const inputRef = useRef(null)

    const searchHandler = (event) => {
        const value = event?.target?.value
        const params = new URLSearchParams(searchParams)

        params.delete("search")
        if (!isEmpty(value)) {
            params.append("search", value)
        }
        router.replace(`${pathname}?${params.toString()}`)
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        const searchParamsValue = params.get("search")

        if (isEmpty(inputRef!.current!.value) && searchParamsValue || isEmpty(searchParamsValue) && inputRef!.current!.value) {
            inputRef!.current!.value! = searchParamsValue ?? ""
        }


    }, [searchParams])

    const debouncedOnChangeHandler = debounceTheFunc(searchHandler, 500)

    return (
        <Input type="text" placeholder="Search" onChange={debouncedOnChangeHandler} ref={inputRef} />
    )
}



export function SearchBar() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <Search />
        </Suspense>
    )
}

export default SearchBar