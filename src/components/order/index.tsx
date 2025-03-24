// app/order/success/page.tsx
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function OrderSuccess() {
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
                <Link href={"/products"}>
                    <Button variant={"outline"}>Continue shopping</Button>
                </Link>
            </div>
        </div>
    );
}