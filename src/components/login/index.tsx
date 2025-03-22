// components/login-form.tsx
"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { signIn } from "@/lib/auth/sign-in"
import { useRouter } from "next/navigation"

export function LoginForm() {
    const router = useRouter()
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: any, event) => {
        event.preventDefault()
        const { email, password } = data
        await signIn({ email, password })
        router.back()
    }

    return (
        <div className="min-h-[calc(100vh-76px)] bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-[#FF3F6C] mb-8 text-center">Login</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                            type="text"
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
                    New to Store?{' '}
                    <a href="/signup" className="text-[#FF3F6C] font-semibold hover:underline">
                        Create Account
                    </a>
                </p>
            </div>
        </div>
    )
}