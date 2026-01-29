import React from 'react';
import type { CartItem as CartItemType } from '../../../shared/types';
import { formatPrice, calculateSubtotal } from '../../../shared/utils';
import { Button } from '../../../shared/components/Button';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="flex flex-col sm:flex-row items-center border-b py-4 gap-4">
            <div className="w-24 h-24 flex-shrink-0">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex-grow flex flex-col justify-between w-full">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(calculateSubtotal(item.price, item.quantity))}
                    </p>
                </div>
                <p className="text-sm text-gray-500 mb-2">{formatPrice(item.price)} each</p>

                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center space-x-2">
                        <button
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50"
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                            className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </button>
                    </div>
                    <Button
                        variant="danger"
                        onClick={() => onRemove(item.id)}
                        className="text-sm py-1 px-3"
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
};
