// app/cart/page.tsx
'use client'
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const CartPage = () => {
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);

    const calculateTotal = () => {
        return items.reduce(
            (total, item) => total + parseFloat(item.price) * item.quantity,
            0
        );
    };

    const placeOrderHandler = () => {
        redirect('/checkout')
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">

                <h1 className="text-3xl font-bold mb-8">Shopping Bag ({items.length})</h1>



                {items.length === 0 ? (
                    <div className="text-center py-12">
                        <h2 className="text-2xl mb-4">Your bag is empty</h2>
                        <Link href="/products" className="text-blue-600 hover:underline">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="lg:w-2/3 space-y-6">
                            <div className="flex flex-row-reverse">
                                <button
                                    onClick={clearCart}
                                    className="mt-4 text-red-600 hover:text-red-700 text-sm"
                                >
                                    Remove All Items
                                </button>
                            </div>
                            {items.map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex gap-6">
                                        {/* Product Image */}
                                        <div className="w-32 h-32 relative">
                                            <Image
                                                src={item.images[0]}
                                                alt={item.name}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <div className="flex justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                                    <p className="text-gray-600">{item.brand}</p>
                                                    <p className="text-gray-600">Size: {item.size || 'One Size'}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id, item.size || 'One Size')}
                                                    className="text-gray-400 hover:text-red-600"
                                                >
                                                    ✕
                                                </button>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center border rounded">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-4">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                        className="px-3 py-1 hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="text-lg font-semibold">
                                                    ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-xl font-bold mb-4">Price Details</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span>Total MRP</span>
                                        <span>₹{calculateTotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount on MRP</span>
                                        <span>-₹{(calculateTotal() * 0.1).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold border-t pt-4">
                                        <span>Total Amount</span>
                                        <span>₹{(calculateTotal() * 0.9).toFixed(2)}</span>
                                    </div>
                                </div>

                                <button className="w-full bg-pink-600 text-white py-3 rounded mt-6 hover:bg-pink-700 transition-colors" onClick={placeOrderHandler}>
                                    Place Order
                                </button>

                                <div className="mt-6 text-sm text-gray-600">
                                    <p>Estimated Delivery Time: 3-5 business days</p>
                                    <p className="mt-2">Free shipping on orders above ₹999</p>
                                </div>
                            </div>


                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;