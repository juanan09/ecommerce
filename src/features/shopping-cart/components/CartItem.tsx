import type { CartItem as CartItemType } from '@/shared/types';
import { formatPrice } from '@/shared/utils';
import { BUSINESS_RULES } from '@/shared/constants';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (newQuantity: number) => void;
    onRemove: () => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
    const { product, quantity } = item;

    return (
        <div data-testid="cart-item" className="flex gap-3 p-3 bg-white border-b border-gray-100 last:border-b-0 group">
            {/* Image */}
            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Content Column */}
            <div className="flex flex-1 flex-col justify-center gap-1">
                {/* Name */}
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1" title={product.name}>
                    {product.name}
                </h3>

                {/* Price */}
                <p className="text-xs text-gray-500 font-medium">{formatPrice(product.price)}</p>

                {/* Controls Row */}
                <div className="flex items-center gap-2 mt-1">
                    {/* Quantity Controls */}
                    <div className="flex items-center h-7 rounded border border-gray-200">
                        <button
                            onClick={() => onUpdateQuantity(quantity - 1)}
                            disabled={quantity <= BUSINESS_RULES.QUANTITY.MIN}
                            aria-label="Decrease quantity"
                            className="w-7 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                        >
                            -
                        </button>
                        <div className="w-px h-3 bg-gray-200"></div>
                        <span data-testid="item-quantity" className="w-8 flex items-center justify-center text-xs font-medium text-gray-700">
                            {quantity}
                        </span>
                        <div className="w-px h-3 bg-gray-200"></div>
                        <button
                            onClick={() => onUpdateQuantity(quantity + 1)}
                            aria-label="Increase quantity"
                            className="w-7 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
                        >
                            +
                        </button>
                    </div>

                    {/* Remove Button */}
                    <button
                        onClick={onRemove}
                        className="bg-transparent h-7 w-7 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        aria-label="remove item"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
