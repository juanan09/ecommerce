import React from 'react';
import { formatPrice } from '../../../shared/utils';
import type { CartItem } from '../../../shared/types';
import { Button } from '../../../shared/components/Button';
import { TAX_RATE, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '../../../shared/constants/businessRules';

interface CartSummaryProps {
    items: CartItem[];
    onCheckout: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ items, onCheckout }) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const shipping = subtotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal + tax + shipping;

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit top-4 sticky">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Order Summary</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                    <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                {shipping > 0 && (
                    <p className="text-xs text-blue-500 mt-1">
                        Spend {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping!
                    </p>
                )}
                <div className="border-t pt-3 mt-3 flex justify-between font-bold text-lg text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                </div>
            </div>

            <Button onClick={onCheckout} className="w-full">
                Checkout
            </Button>
        </div>
    );
};
