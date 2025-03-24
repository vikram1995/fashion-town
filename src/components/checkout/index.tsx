"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useCartStore } from "@/store"
import { createInsertSchema } from "drizzle-zod"

import { z } from "zod"
import { address } from '@/lib/db/schema'

import { authClient } from '@/lib/auth/auth-client'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const addressSchema = createInsertSchema(address, {
    phoneNumber: z.string().regex(/^\d{10}$/, "Invalid phone number"),
    zipCode: z.string().regex(/^\d{6}$/, "Invalid ZIP code")
}).omit({
    id: true,
    userId: true,
    createdAt: true
}).extend({
    saveAddress: z.boolean().default(false)
})

export function CheckoutPage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const items = useCartStore((state) => state.items)
    const clearCart = useCartStore((state) => state.clearCart)

    const form = useForm<z.infer<typeof addressSchema>>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            fullName: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            phoneNumber: "",
            isDefault: false,
            saveAddress: false
        }
    })

    const calculateTotal = () => {
        return items.reduce(
            (total, item) => total + parseFloat(item.price) * item.quantity,
            0
        )
    }

    const getLineItems = () => {
        const lineItems = items.map(item => ({
            name: item.name,
            images: [item.images[0]],
            price: item.price,
            quantity: item.quantity,
            size: item.size,
        }))
        return lineItems
    }

    const createOrder = async (formData: z.infer<typeof addressSchema>, session) => {
        try {
            const { data } = await authClient.getSession()
            const userId = data?.user.id

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session,
                    items: getLineItems(),
                    metadata: {
                        address: JSON.stringify(formData),
                        userId,

                    }
                }),
            })
            const resData = await response.json()
            if (resData) {
                clearCart()
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleStripePayment = async (formData: z.infer<typeof addressSchema>) => {

        try {

            await form.trigger()

            if (!form.formState.isValid) return

            const { data } = await authClient.getSession()
            const userId = data?.user.id
            setIsSubmitting(true)
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: getLineItems(),
                    metadata: {
                        address: JSON.stringify(formData),
                        userId,
                    }
                }),
            })

            if (!response.ok) throw new Error('Checkout failed')

            const { session } = await response.json()
            console.log("response", session)

            const { id } = session
            const stripe = await stripePromise
            await createOrder(formData, session)
            const { error } = await stripe!.redirectToCheckout({ sessionId: id })
            if (error) throw error


        } catch (error) {
            console.error('Checkout Error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleStripePayment)}>
                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                        {/* Left Section - Delivery Address */}
                        <div className="flex-1 space-y-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Address</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['fullName', 'streetAddress', 'city', 'state', 'zipCode', 'phoneNumber'].map((field) => (
                                        <FormField
                                            key={field}
                                            control={form.control}
                                            name={field as keyof z.infer<typeof addressSchema>}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder={
                                                                field.name
                                                                    .replace(/([A-Z])/g, ' $1')
                                                                    .replace(/^./, str => str.toUpperCase())
                                                            }
                                                            className="border-b-2 rounded-none focus-visible:ring-0"
                                                        />
                                                    </FormControl>
                                                    <FormMessage className="text-xs text-red-600" />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>

                                <FormField
                                    control={form.control}
                                    name="saveAddress"
                                    render={({ field }) => (
                                        <div className="mt-6 flex items-center space-x-2">
                                            <Checkbox
                                                id="save-address"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <label htmlFor="save-address" className="text-sm text-gray-600">
                                                Save this address for future use
                                            </label>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Right Section - Order Summary */}
                        <div className="md:w-96">
                            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                <Table>
                                    <TableBody>
                                        {items.map((item, index) => (
                                            <TableRow key={`${item.name}-${index}`}>
                                                <TableCell>
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            src={item.images[0]}
                                                            alt={item.name}
                                                            className="w-16 h-20 object-cover rounded"
                                                        />
                                                        <div>
                                                            <p className="font-medium">{item.name}</p>
                                                            <p className="text-sm text-gray-500">
                                                                Size: {item.size || 'One Size'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <div className="mt-6 space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium">₹{calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Discount</span>
                                        <span className="text-green-600">-₹{(calculateTotal() * 0.1).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-medium">FREE</span>
                                    </div>
                                    <div className="flex justify-between border-t pt-4">
                                        <span className="font-bold text-lg">Total</span>
                                        <span className="font-bold text-lg">₹{(calculateTotal() * 0.9).toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full mt-6 bg-[#FF3F6C] hover:bg-[#FF3F6C]/90 h-12 text-base font-medium"
                                    disabled={isSubmitting || items.length === 0}
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">Processing...</span>
                                    ) : (
                                        'Proceed to Payment'
                                    )}
                                </Button>

                                <p className="mt-4 text-center text-sm text-gray-500">
                                    Secure payment processing powered by Stripe
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}