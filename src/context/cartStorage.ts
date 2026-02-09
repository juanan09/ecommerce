import type { CartItem } from '@/shared/types';

const CART_STORAGE_KEY = 'cart';

/**
 * Load cart items from localStorage
 */
export const loadCartFromStorage = (): CartItem[] => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
        try {
            return JSON.parse(storedCart);
        } catch (error) {
            console.error('Failed to parse cart from local storage', error);
            return [];
        }
    }
    return [];
};

/**
 * Save cart items to localStorage
 */
export const saveCartToStorage = (items: CartItem[]): void => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

/**
 * Clear cart from localStorage
 */
export const clearCartFromStorage = (): void => {
    localStorage.removeItem(CART_STORAGE_KEY);
};
