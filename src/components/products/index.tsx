'use client'
import Card from '@/components/products/card'
import { db } from '@/lib/db'
import { Product, products } from '@/lib/db/schema'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Listing = ({
    initialProducts,
}: {
    initialProducts: Product[]
}) => {
    return (
        <div className="grid grid-cols-2 xm:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {
                initialProducts?.map((product: Product) => (
                    <Card key={product.id} product={product} />
                ))
            }
        </div >)
}

export default Listing

