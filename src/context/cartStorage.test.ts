import { describe, it, expect, beforeEach } from 'vitest';
import { loadCartFromStorage, saveCartToStorage, clearCartFromStorage } from './cartStorage';
import type { CartItem } from '@/shared/types';

describe('cartStorage', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const mockCartItems: CartItem[] = [
        {
            product: {
                id: '1',
                name: 'Test Product',
                price: 100,
                image: 'test.jpg',
                description: 'Test description',
            },
            quantity: 2,
        },
    ];

    describe('loadCartFromStorage', () => {
        it('returns empty array when localStorage is empty', () => {
            const result = loadCartFromStorage();
            expect(result).toEqual([]);
        });

        it('returns parsed cart items when localStorage has data', () => {
            localStorage.setItem('cart', JSON.stringify(mockCartItems));
            const result = loadCartFromStorage();
            expect(result).toEqual(mockCartItems);
        });

        it('returns empty array when localStorage has invalid JSON', () => {
            localStorage.setItem('cart', 'invalid json');
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

            const result = loadCartFromStorage();

            expect(result).toEqual([]);
            expect(consoleSpy).toHaveBeenCalledWith(
                'Failed to parse cart from local storage',
                expect.any(Error)
            );

            consoleSpy.mockRestore();
        });
    });

    describe('saveCartToStorage', () => {
        it('saves cart items to localStorage', () => {
            saveCartToStorage(mockCartItems);

            const stored = localStorage.getItem('cart');
            expect(stored).not.toBeNull();
            expect(JSON.parse(stored!)).toEqual(mockCartItems);
        });

        it('saves empty array to localStorage', () => {
            saveCartToStorage([]);

            const stored = localStorage.getItem('cart');
            expect(stored).toBe('[]');
        });
    });

    describe('clearCartFromStorage', () => {
        it('removes cart from localStorage', () => {
            // First, add some data
            localStorage.setItem('cart', JSON.stringify(mockCartItems));
            expect(localStorage.getItem('cart')).not.toBeNull();

            // Clear the cart
            clearCartFromStorage();

            // Verify it's removed
            expect(localStorage.getItem('cart')).toBeNull();
        });

        it('does nothing when localStorage is already empty', () => {
            expect(localStorage.getItem('cart')).toBeNull();

            // Should not throw error
            expect(() => clearCartFromStorage()).not.toThrow();

            expect(localStorage.getItem('cart')).toBeNull();
        });
    });
});
