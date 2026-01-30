import type { CartItem as CartItemType } from '@/shared/types';
import { formatPrice } from '@/shared/utils';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (newQuantity: number) => void;
    onRemove: () => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
    const { product, quantity } = item;
    const subtotal = product.price * quantity;

    return (
        <div className="flex items-center p-4 border-b border-gray-200 gap-4 bg-white">
            <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md"
            />

            <div className="flex-grow">
                <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-500">{formatPrice(product.price)}</p>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-md">
                    <button
                        onClick={() => onUpdateQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                        aria-label="decrease quantity"
                        className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600"
                    >
                        -
                    </button>
                    <span className="px-3 py-1 font-medium text-gray-800">
                        Qty: {quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity(quantity + 1)}
                        aria-label="increase quantity"
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                    >
                        +
                    </button>
                </div>

                <div className="text-right min-w-[100px]">
                    <p className="font-semibold text-gray-800">{formatPrice(subtotal)}</p>
                </div>

                <button
                    onClick={onRemove}
                    aria-label="remove item"
                    className="text-red-500 hover:text-red-700 p-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};
