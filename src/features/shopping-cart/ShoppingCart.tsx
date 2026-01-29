import React from 'react';
import { useCart } from '../../context/CartContext';
import { CartItem } from './components/CartItem';
import { CartSummary } from './components/CartSummary';
import { Button } from '../../shared/components/Button';

export const ShoppingCart: React.FC = () => {
    const { items, updateQuantity, removeFromCart, clearCart } = useCart();

    const handleCheckout = () => {
        alert('Proceeding to checkout... (This is a demo)');
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your cart is empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
                <Button variant="secondary" onClick={clearCart} className="text-sm">
                    Clear Cart
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
                        <div className="space-y-2">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeFromCart}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:w-1/3">
                    <CartSummary items={items} onCheckout={handleCheckout} />
                </div>
            </div>
        </div>
    );
};
