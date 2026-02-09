import { useCart } from '../../context/useCart';
import { CartItem, CartSummary } from './components';

export const ShoppingCart = () => {
    const { items, itemCount, subtotal, discount, total, discountBreakdown, updateQuantity, removeItem } = useCart();

    if (items.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center">
                <div className="bg-blue-50 p-4 rounded-full mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 text-sm">
                    Start shopping to fill it up!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-bold text-gray-800">Cart Items</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                        {itemCount}
                    </span>
                </div>
                <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto custom-scrollbar">
                    {items.map((item) => (
                        <CartItem
                            key={item.product.id}
                            item={item}
                            onUpdateQuantity={(qty) => updateQuantity(item.product.id, qty)}
                            onRemove={() => removeItem(item.product.id)}
                        />
                    ))}
                </div>
            </div>

            <CartSummary
                subtotal={subtotal}
                discount={discount}
                total={total}
                discountBreakdown={discountBreakdown}
                itemCount={itemCount}
            />
        </div>
    );
};
