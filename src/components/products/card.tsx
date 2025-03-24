'use client'

import { Button } from '@/components/ui/button'
import { Product } from '@/lib/db/schema'
import { useCartStore } from '@/store'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'


interface ProductCardProps {
    product: Product
}
const Card = ({ product }: ProductCardProps) => {
    const { name, brand, price, images, id } = product
    const [imageIndex, setImageIndex] = useState(0)
    const intervalId = useRef(null)

    const handleImageOnMouseEnter = () => {
        intervalId.current = setInterval(() => {
            setImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)
        }, 1000)
    }

    const handleImageOnMouseLeave = () => {
        clearInterval(intervalId.current);
        setImageIndex(0)
    }

    return (
        <div className=" overflow-hidden hover:shadow-lg transition-shadow max-w-[245px]" onMouseEnter={handleImageOnMouseEnter} onMouseLeave={handleImageOnMouseLeave}>
            <Link href={`/products/${id}`} className="block">
                <div className="relative h-[280px] w-full">
                    <Image
                        src={images[imageIndex]}
                        alt={name}
                        fill
                        className="object-contain"
                    //sizes="(max-width: 768px) 100vw, (max-width: 245px) 50vw, 33vw"
                    />
                </div>

                <div className="p-3">
                    <h3 className="font-medium text-gray-900">{brand}</h3>
                    <p className="text-sm text-gray-700 truncate">{name}</p>
                    <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm font-medium">₹{price}</span>
                    </div>

                </div>
            </Link>


        </div>
    )
}

export default Card