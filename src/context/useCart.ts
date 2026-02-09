import { useContext, createContext } from 'react';
import type { Product, CartItem } from '@/shared/types';

// Context Definition
interface CartContextType {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    discount: number;
    total: number;
    discountBreakdown: { name: string; amount: number }[];
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Hook to access cart context
 */
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
