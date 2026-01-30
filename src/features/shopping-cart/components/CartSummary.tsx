import { formatPrice } from '@/shared/utils';
import { BUSINESS_RULES } from '@/shared/constants';

interface CartSummaryProps {
    subtotal: number;
    discount: number;
    total: number;
    itemCount: number;
}

export const CartSummary = ({ subtotal, discount, total, itemCount }: CartSummaryProps) => {
    const promoThreshold = BUSINESS_RULES.DISCOUNTS.ORDER_VALUE.MIN_SUBTOTAL;
    const showPromo = subtotal < promoThreshold;
    const missingAmount = promoThreshold - subtotal;
    const discountPercentage = BUSINESS_RULES.DISCOUNTS.ORDER_VALUE.PERCENTAGE * 100;

    return (
        <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                        <span>Discount</span>
                        <span>-{formatPrice(discount)}</span>
                    </div>
                )}

                <div className="h-px bg-gray-200 my-2"></div>

                <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                </div>
            </div>

            {showPromo && (
                <div className="bg-blue-50 text-blue-700 p-3 rounded-md mb-6 text-sm">
                    Add {formatPrice(missingAmount)} more for {discountPercentage}% off!
                </div>
            )}

            <button
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md"
            >
                Checkout
            </button>
        </div>
    );
};
