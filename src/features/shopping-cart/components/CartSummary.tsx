import { formatPrice } from '@/shared/utils';
import { BUSINESS_RULES } from '@/shared/constants';

interface CartSummaryProps {
    subtotal: number;
    discount: number;
    total: number;
    discountBreakdown: { name: string; amount: number }[];
    itemCount: number;
}

export const CartSummary = ({ subtotal, discount, total, discountBreakdown, itemCount }: CartSummaryProps) => {
    const promoThreshold = BUSINESS_RULES.DISCOUNTS.ORDER_VALUE.MIN_SUBTOTAL;

    // Check if Order Discount is already applied
    const hasOrderDiscount = discountBreakdown.some(d => d.name === 'Order Discount');

    // Effective subtotal for Order Discount check is current total (subtotal - existing discounts)
    // If Order Discount is not applied, 'discount' only contains other discounts (e.g. Bulk)
    const effectiveSubtotal = subtotal - discount;

    const showPromo = !hasOrderDiscount && effectiveSubtotal < promoThreshold;
    const missingAmount = promoThreshold - effectiveSubtotal;
    const discountPercentage = BUSINESS_RULES.DISCOUNTS.ORDER_VALUE.PERCENTAGE * 100;

    return (
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                </div>

                {discountBreakdown.map((item) => (
                    <div key={item.name} className="flex justify-between text-green-600 font-medium text-sm">
                        <span>{item.name}</span>
                        <span>-{formatPrice(item.amount)}</span>
                    </div>
                ))}

                {discountBreakdown.length === 0 && discount > 0 && (
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

            {showPromo && missingAmount > 0 && (
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
