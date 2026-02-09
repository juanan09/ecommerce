import { createContext, useContext, useReducer, useEffect, useRef, useMemo, type ReactNode } from 'react';
import type { Product, CartItem } from '@/shared/types';
import { BulkDiscountStrategy, OrderDiscountStrategy, DiscountCalculator } from '@/shared/strategies';

// State Definition
interface CartState {
    items: CartItem[];
}

// Action Definitions
type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };

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

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cart';

// Initializer for lazy loading
const initCart = (initialState: CartState): CartState => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
        try {
            return { items: JSON.parse(storedCart) };
        } catch (error) {
            console.error('Failed to parse cart from local storage', error);
            return initialState;
        }
    }
    return initialState;
};

// Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.id === action.payload.id
            );

            if (existingItemIndex > -1) {
                const newItems = [...state.items];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + 1,
                };
                return { ...state, items: newItems };
            }

            return {
                ...state,
                items: [...state.items, { product: action.payload, quantity: 1 }],
            };
        }
        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter((item) => item.product.id !== action.payload.id),
            };
        }
        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter((item) => item.product.id !== id),
                };
            }
            return {
                ...state,
                items: state.items.map((item) =>
                    item.product.id === id ? { ...item, quantity } : item
                ),
            };
        }
        case 'CLEAR_CART': {
            return { ...state, items: [] };
        }
        default:
            return state;
    }
};

// Provider Component
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] }, initCart);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    }, [state.items]);

    // Computed Values
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
    );

    // Calculate Discounts using Strategy Pattern
    // Calculate Discounts using DiscountCalculator
    const discountCalculator = new DiscountCalculator();
    discountCalculator.registerStrategy(new BulkDiscountStrategy());
    discountCalculator.registerStrategy(new OrderDiscountStrategy());

    const discount = discountCalculator.calculate(state.items, subtotal);
    const discountBreakdown = discountCalculator.getBreakdown();
    const total = Math.max(0, subtotal - discount);

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

// Hook
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
