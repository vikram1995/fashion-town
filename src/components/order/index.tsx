// app/order/success/page.tsx
"use client"

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { type } from 'os';
import { Button } from '../ui/button';

export default function OrderSuccess() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
                const data = await response.json();

                if (!response.ok) throw new Error(data.error);

                // Handle successful payment (clear cart, update DB, etc.)
            } catch (error) {
                console.error('Payment Verification Failed:', error);
            }
        };

        if (sessionId) verifyPayment();
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
                <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Successful!
                </h1>
                <p className="text-gray-600 mb-4">
                    Thank you for your order. We've sent a confirmation to your email.
                </p>
                {/* <p className="text-sm text-gray-500">
                    Order ID: {sessionId}
                </p> */}
                <Link href={"/products"}>
                    <Button variant={"outline"}>Continue shopping</Button>
                </Link>
            </div>
        </div>
    );
}