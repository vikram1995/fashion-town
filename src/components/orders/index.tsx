"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Order } from "@/lib/db/schema"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatPrice } from "@/lib/utils"
import { ShoppingBagIcon, CalendarIcon } from "@heroicons/react/24/outline"
import { authClient } from "@/lib/auth/auth-client"

export default function OrderHistory() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    const getOrders = async () => {
        const { data } = await authClient.getSession()
        const userId = data?.user.id
        if (userId) {
            fetch(`/api/users/${userId}/orders`)
                .then(res => res.json())
                .then(data => {
                    setOrders(data)
                    setLoading(false)
                })
        }
    }

    useEffect(() => {
        getOrders()
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingBagIcon className="h-8 w-8 text-[#FF3F6C]" />
                    <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">No orders found</p>
                        <Button asChild className="bg-[#FF3F6C] hover:bg-[#FF3F6C]/90">
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-medium">Order #{order.id.slice(-6)}</p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <CalendarIcon className="h-4 w-4" />
                                            <span>{formatDate(order.createdAt)}</span>
                                        </div>
                                    </div>
                                    <Badge
                                        variant={order.status === 'completed' ? 'default' : 'secondary'}
                                        className="capitalize"
                                    >
                                        {order.status}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-gray-600">Total: {formatPrice(order.total)}</p>
                                        <p className="text-gray-600">{order.items.length} items</p>
                                    </div>
                                    <div className="text-right">
                                        <Button variant="outline" className="border-[#FF3F6C] text-[#FF3F6C]" asChild>
                                            <Link href={`/orders/${order.id}`}>View Details</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}