import type { Product, CartItem } from '@/shared/types';
import { BUSINESS_RULES } from '@/shared/constants';

// State Definition
export interface CartState {
    items: CartItem[];
}

// Action Definitions
export type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: { id: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' };

/**
 * Cart reducer function
 */
export const cartReducer = (state: CartState, action: CartAction): CartState => {
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
                items: [...state.items, { product: action.payload, quantity: BUSINESS_RULES.QUANTITY.MIN }],
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
            if (quantity < BUSINESS_RULES.QUANTITY.MIN) {
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
