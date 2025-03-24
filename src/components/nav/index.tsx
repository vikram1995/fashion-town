"use client"

import { useState } from 'react'
import Link from 'next/link'
import Search from '../search'
import Cart from '../cart'
import Profile from '../profile'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { CATEGORY_LINKS } from '@/lib/constants'

const menuList = [{
    name: "MEN",
    href: CATEGORY_LINKS.MEN
},
{
    name: "WOMEN",
    href: CATEGORY_LINKS.WOMEN
}, {
    name: "ACCESSORIES",
    href: CATEGORY_LINKS.UNISEX
}
]

function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setMobileMenuOpen((prev) => !prev)
    }

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] z-50 p-[20px]">
            <div className="flex items-center justify-between">
                {/* Brand */}
                <h2 className="text-lg font-bold">Fashion Town</h2>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-20 font-bold text-sm">
                    {menuList.map((menu, index) =>
                        <Link href={menu.href} key={index}>
                            <div className="cursor-pointer border-b-2 border-transparent hover:border-b-orange-600 transition-colors duration-200">{menu.name}</div>
                        </Link>

                    )}
                </nav>

                {/* Right Section: Search and Icons */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block [flex-grow:2] max-w-[500px]">
                        <Search />
                    </div>
                    <Profile />
                    <Cart />
                    {/* Hamburger for Mobile */}
                    <button onClick={toggleMobileMenu} className="md:hidden">
                        {mobileMenuOpen ? (
                            <XMarkIcon className="h-6 w-6" />
                        ) : (
                            <Bars3Icon className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <nav className="md:hidden mt-4 flex flex-col gap-4 font-bold text-sm">
                    {menuList.map((menu, index) => <div key={index} className="cursor-pointer">{menu.name}</div>)}
                    {/* Optionally include the search on mobile */}
                    <div className="mt-2">
                        <Search />
                    </div>
                </nav>
            )}
        </header>
    )
}

export default Nav
