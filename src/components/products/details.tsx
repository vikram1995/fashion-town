// app/products/[id]/page.tsx
import { db } from '@/lib/db'

import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Star, Truck, Shield, Tag } from 'lucide-react'
import { products } from '@/lib/db/schema'

export default async function ProductPage({ product }) {

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Left Column - Image Gallery */}
                <div className="md:col-span-1 lg:col-span-2">
                    <div className="grid grid-cols-5 gap-4">
                        {/* Thumbnails */}
                        <div className="col-span-1 space-y-4">
                            {product.images.map((image, index) => (
                                <div key={index} className="aspect-square relative border rounded cursor-pointer">
                                    <Image
                                        src={image}
                                        alt={`${product.name} thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="col-span-4 aspect-square relative">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column - Product Details */}
                <div className="space-y-6">
                    {/* Brand & Title */}
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">{product.brand}</h1>
                        <h2 className="text-xl text-gray-600">{product.name}</h2>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center bg-blue-100 px-2 py-1 rounded">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="ml-1">4.5 | 2.3k Ratings</span>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="space-y-2">
                        <div className="flex items-baseline gap-3">
                            <span className="text-2xl font-bold">₹{product.price}</span>
                            <span className="text-gray-500 line-through">₹7999</span>
                            <span className="text-green-600 font-medium">50% OFF</span>
                        </div>
                        <p className="text-sm text-gray-500">inclusive of all taxes</p>
                    </div>

                    {/* Offers */}
                    <div className="p-4 bg-gray-50 rounded">
                        <h3 className="font-medium mb-2">Available Offers</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start">
                                <Tag className="h-4 w-4 mt-0.5 mr-2 text-blue-600" />
                                <span>Bank Offer: 10% Instant Discount on HDFC Bank Credit Cards</span>
                            </li>
                            <li className="flex items-start">
                                <Truck className="h-4 w-4 mt-0.5 mr-2 text-blue-600" />
                                <span>Free Delivery</span>
                            </li>
                            <li className="flex items-start">
                                <Shield className="h-4 w-4 mt-0.5 mr-2 text-blue-600" />
                                <span>14 Days Returns Guarantee</span>
                            </li>
                        </ul>
                    </div>

                    {/* Size Selector */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="font-medium">Select Size</h3>
                            <button className="text-blue-600 text-sm">Size Chart</button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button
                                    key={size}
                                    className="border rounded p-2 text-center hover:border-black focus:border-black focus:bg-black focus:text-white"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="space-y-4">
                        <Button className="w-full h-12 rounded">Add to Cart</Button>
                        <Button variant="outline" className="w-full h-12 rounded">
                            Wishlist
                        </Button>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-4 pt-6 border-t">
                        <h3 className="font-medium">Product Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                                <p className="text-gray-600">Brand</p>
                                <p>{product.brand}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-600">Fabric</p>
                                <p>100% Cotton</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-600">Fit</p>
                                <p>Slim Fit</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-gray-600">Description</p>
                                <p>{product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ratings & Reviews */}
            <section className="mt-12">
                <h2 className="text-xl font-bold mb-4">Ratings & Reviews</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Rating Summary */}
                    <div className="bg-gray-50 p-4 rounded">
                        <div className="text-center">
                            <div className="text-4xl font-bold">4.5</div>
                            <div className="flex justify-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                        fill={i < 4 ? 'currentColor' : 'none'}
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">2.3k Ratings</p>
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="md:col-span-3 space-y-6">
                        {[1, 2, 3].map((review) => (
                            <div key={review} className="border-b pb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                                fill={i < 4 ? 'currentColor' : 'none'}
                                            />
                                        ))}
                                    </div>
                                    <span className="font-medium">John D.</span>
                                    <span className="text-gray-500 text-sm">1 week ago</span>
                                </div>
                                <p className="text-gray-600">
                                    Excellent product! Fits perfectly and the quality is amazing.
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}