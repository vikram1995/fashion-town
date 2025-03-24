"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Trash2, Edit } from "lucide-react"
import { useSavedAddress } from "@/lib/hooks/address"

export default function SavedAddresses() {
    const { addresses, setAddresses, loading } = useSavedAddress()
    const handleDelete = async (addressId: string) => {
        if (confirm("Are you sure you want to delete this address?")) {
            await fetch(`/api/address/${addressId}`, { method: 'DELETE' })
            setAddresses(prev => prev.filter(a => a.id !== addressId))
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Saved Addresses</h1>
                    <Button asChild>
                        <Link href="/addresses/new">Add New Address</Link>
                    </Button>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : addresses.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">No saved addresses found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map(address => (
                            <div key={address.id} className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-medium">{address.fullName}</h3>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            asChild
                                        >
                                            <Link href={`/addresses/${address.id}/edit`}>
                                                <Edit className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(address.id)}
                                        >
                                            <Trash2 className="h-4 w-4 text-red-600" />
                                        </Button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {address.streetAddress}<br />
                                    {address.city}, {address.state} - {address.zipCode}<br />
                                    Phone: {address.phoneNumber}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}