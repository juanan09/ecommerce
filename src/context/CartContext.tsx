import { useReducer, useEffect, useRef, useMemo, type ReactNode } from 'react';
import type { Product } from '@/shared/types';
import { BulkDiscountStrategy, OrderDiscountStrategy, DiscountCalculator } from '@/shared/strategies';
import { cartReducer, type CartState } from './cartReducer';
import { loadCartFromStorage, saveCartToStorage } from './cartStorage';
import { CartContext } from './useCart';

/**
 * Initializer for lazy loading cart from localStorage
 */
const initCart = (initialState: CartState): CartState => {
    const items = loadCartFromStorage();
    return items.length > 0 ? { items } : initialState;
};

/**
 * Cart Provider Component
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] }, initCart);
    const isInitialMount = useRef(true);

    // Persist cart to localStorage on state changes
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        saveCartToStorage(state.items);
    }, [state.items]);

    // Computed Values
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    // Calculate Discounts using Strategy Pattern
    const { discount, discountBreakdown, total } = useMemo(() => {
        const calculator = new DiscountCalculator();
        calculator.registerStrategy(new BulkDiscountStrategy());
        calculator.registerStrategy(new OrderDiscountStrategy());

        const calculatedDiscount = calculator.calculate(state.items, subtotal);
        const breakdown = calculator.getBreakdown();
        const calculatedTotal = Math.max(0, subtotal - calculatedDiscount);

        return {
            discount: calculatedDiscount,
            discountBreakdown: breakdown,
            total: calculatedTotal,
        };
    }, [state.items, subtotal]);

    // Actions
    const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
    const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    const updateQuantity = (id: string, quantity: number) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });

    const value = useMemo(
        () => ({
            items: state.items,
            itemCount,
            subtotal,
            discount,
            total,
            discountBreakdown,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
        }),
        [state.items, itemCount, subtotal, discount, total, discountBreakdown]
    );

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};


