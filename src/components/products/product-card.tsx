// components/product-card.tsx
import { Product } from '@/lib/db/schema'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative">
            <Link href={`/products/${product.id}`} className="block">
                <div className="aspect-square relative bg-gray-100 rounded overflow-hidden">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:opacity-75 transition-opacity"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                </div>

                <div className="mt-3">
                    <h3 className="font-medium text-gray-900">{product.brand}</h3>
                    <p className="text-sm text-gray-700 truncate">{product.name}</p>
                    <div className="mt-1 flex items-center justify-between">
                        <span className="text-sm font-medium">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                                ₹{product.originalPrice}
                            </span>
                        )}
                    </div>
                    {product.discountPercentage && (
                        <span className="text-xs text-green-600">
                            {product.discountPercentage}% OFF
                        </span>
                    )}
                </div>
            </Link>
        </div>
    )
}