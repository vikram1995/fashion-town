"use client"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { insertAddressSchema } from "@/lib/db/schema"
import { authClient } from "@/lib/auth/auth-client"

export default function NewAddressPage() {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(insertAddressSchema),
        defaultValues: {
            fullName: "",
            streetAddress: "",
            city: "",
            state: "",
            zipCode: "",
            phoneNumber: "",
            isDefault: false
        }
    })

    const onSubmit = async (values: z.infer<typeof insertAddressSchema>) => {
        console.log("value", values)
        const { data } = await authClient.getSession();
        const userId = data?.user.id;
        try {
            const response = await fetch('/api/address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...values,
                    userId
                })
            })

            if (response.ok) {
                router.push('/addresses')
            }
        } catch (error) {
            console.error('Failed to save address:', error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-[#FF3F6C] mb-6">Add New Address</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <FormField
                                control={form.control}
                                name="fullName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-b-2 rounded-none focus-visible:ring-0 focus:border-[#FF3F6C]"
                                                placeholder="Enter full name"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600" />
                                    </FormItem>
                                )}
                            />

                            {/* Street Address */}
                            <FormField
                                control={form.control}
                                name="streetAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-b-2 rounded-none focus-visible:ring-0 focus:border-[#FF3F6C]"
                                                placeholder="House number, street, area"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600" />
                                    </FormItem>
                                )}
                            />

                            {/* City */}
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-b-2 rounded-none focus-visible:ring-0 focus:border-[#FF3F6C]"
                                                placeholder="Enter city"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600" />
                                    </FormItem>
                                )}
                            />

                            {/* State */}
                            <FormField
                                control={form.control}
                                name="state"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-b-2 rounded-none focus-visible:ring-0 focus:border-[#FF3F6C]"
                                                placeholder="Enter state"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600" />
                                    </FormItem>
                                )}
                            />

                            {/* ZIP Code */}
                            <FormField
                                control={form.control}
                                name="zipCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ZIP Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-b-2 rounded-none focus-visible:ring-0 focus:border-[#FF3F6C]"
                                                placeholder="6-digit PIN code"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600" />
                                    </FormItem>
                                )}
                            />

                            {/* Phone Number */}
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-b-2 rounded-none focus-visible:ring-0 focus:border-[#FF3F6C]"
                                                placeholder="10-digit mobile number"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs text-red-600" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Default Address Checkbox */}
                        <FormField
                            control={form.control}
                            name="isDefault"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="border-[#FF3F6C] data-[state=checked]:bg-[#FF3F6C]"
                                        />
                                    </FormControl>
                                    <FormLabel className="!mt-0 font-normal">
                                        Set as default shipping address
                                    </FormLabel>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-[#FF3F6C] hover:bg-[#FF3F6C]/90 h-12 text-base font-medium rounded-sm"
                        >
                            Save Address
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}