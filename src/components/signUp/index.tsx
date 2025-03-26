// components/signup-form.tsx
"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { signUp } from "@/lib/auth/sign-up"
import { useRouter } from "next/navigation"

export function SignUpForm() {
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            terms: false
        }
    })

    const onSubmit = async (data: any, event) => {
        event.preventDefault()
        const { name, email, password } = data
        const authStatus = await signUp({ name, email, password })
        if (authStatus?.data) {
            router.replace('/')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-[#FF3F6C] mb-8 text-center">Register</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            className="border-0 border-b-2 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#FF3F6C] px-0"
                                            placeholder="Enter Name"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            className="border-0 border-b-2 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#FF3F6C] px-0"
                                            placeholder="Enter Email"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            className="border-0 border-b-2 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-[#FF3F6C] px-0"
                                            placeholder="Enter Password"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="terms"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="text-[#FF3F6C] border-gray-300"
                                        />
                                        <label
                                            htmlFor="terms"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
                                        >
                                            I agree to the Terms & Conditions
                                        </label>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            variant="destructive"
                            className="w-full h-12 text-base font-medium rounded-sm"
                        >
                            CONTINUE
                        </Button>
                    </form>
                </Form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Existing User?{' '}
                    <a href="/auth/login" className="text-[#FF3F6C] font-semibold hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    )
}