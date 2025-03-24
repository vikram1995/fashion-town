import React from 'react'
import { UserCircleIcon, UserIcon, CubeIcon, MapPinIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { authClient } from '@/lib/auth/auth-client';
import { useRouter } from 'next/navigation';

function Profile() {
    const router = useRouter()
    const { data: session } = authClient.useSession()

    const isAuthenticated = Boolean(session)
    const user = {
        ...session?.user || {},
        orders: 5
    }

    const logoutHandler = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/login"); // redirect to login page
                },
            },
        })
    }

    return (
        <Popover>
            <PopoverTrigger>
                <UserCircleIcon className="h-7 w-7 cursor-pointer text-gray-700 hover:text-[#FF3F6C] transition-colors" />
            </PopoverTrigger>

            <PopoverContent className="w-64 p-2 rounded-lg shadow-xl border border-gray-100">
                {isAuthenticated ? (
                    <div className="space-y-3">
                        {/* User Info Section */}
                        <div className="px-3 py-2">
                            <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>

                        <div className="border-t"></div>

                        {/* Menu Items */}
                        <div className="space-y-1">
                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-sm font-normal text-gray-700 hover:bg-gray-50"
                                asChild
                            >
                                <Link href="/profile">
                                    <UserIcon className="h-4 w-4" />
                                    My Profile
                                </Link>
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-sm font-normal text-gray-700 hover:bg-gray-50"
                                asChild
                            >
                                <Link href="/orders">
                                    <CubeIcon className="h-4 w-4" />
                                    My Orders ({user.orders})
                                </Link>
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full justify-start gap-2 text-sm font-normal text-gray-700 hover:bg-gray-50"
                                asChild
                            >
                                <Link href="/addresses">
                                    <MapPinIcon className="h-4 w-4" />
                                    Saved Addresses
                                </Link>
                            </Button>
                        </div>

                        <div className="border-t"></div>

                        {/* Logout */}
                        <Button
                            onClick={logoutHandler}
                            variant="ghost"
                            className="w-full justify-start gap-2 text-sm font-normal text-red-600 hover:bg-red-50"
                        >
                            <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Button
                                className="w-full bg-[#FF3F6C] hover:bg-[#FF3F6C]/90 text-white"
                                asChild
                            >
                                <Link href="/auth/login">
                                    Sign In
                                </Link>
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full border-[#FF3F6C] text-[#FF3F6C] hover:bg-[#FF3F6C]/10"
                                asChild
                            >
                                <Link href="/auth/signup">
                                    Create Account
                                </Link>
                            </Button>
                        </div>

                        <div className="border-t"></div>

                        <p className="px-3 text-xs text-gray-500 text-center">
                            By continuing, you agree to our{" "}
                            <Link href="/terms" className="text-[#FF3F6C] hover:underline">
                                Terms of Use
                            </Link>
                        </p>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default Profile