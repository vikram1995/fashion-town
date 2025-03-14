import React from 'react'

import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store';
import Link from 'next/link';

function Cart() {
    const cartItems = useCartStore((state) => state.items);
    const cartCount = cartItems.length

    console.log("cartCount", cartCount)
    return (
        <Link href={`/cart`} className="block">
            <div className='relative cursor-pointer'>
                <ShoppingBagIcon className="size-6 " />
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1 py-0.25 rounded-full">
                        {cartCount}
                    </span>
                )}
            </div>
        </Link>

    )
}

export default Cart