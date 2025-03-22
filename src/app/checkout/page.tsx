import { CheckoutPage } from '@/components/checkout'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async () => {

    return (
        <CheckoutPage />
    )
}

export default Page