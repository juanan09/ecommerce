import { describe, it, expect } from 'vitest';
import { calculateSubtotal } from './calculateSubtotal';
import type { CartItem } from '../types';

describe('calculateSubtotal', () => {
    it('returns 0 for an empty cart', () => {
        const cart: CartItem[] = [];
        expect(calculateSubtotal(cart)).toBe(0);
    });

    it('calculates subtotal for a single item', () => {
        const cart: CartItem[] = [
            {
                product: {
                    id: '1',
                    name: 'Product 1',
                    price: 10,
                    image: '',
                    description: ''
                },
                quantity: 2
            }
        ];
        expect(calculateSubtotal(cart)).toBe(20);
    });

    it('calculates subtotal for multiple items', () => {
        const cart: CartItem[] = [
            {
                product: {
                    id: '1',
                    name: 'Product 1',
                    price: 10,
                    image: '',
                    description: ''
                },
                quantity: 2
            },
            {
                product: {
                    id: '2',
                    name: 'Product 2',
                    price: 20,
                    image: '',
                    description: ''
                },
                quantity: 3
            }
        ];
        // (10 * 2) + (20 * 3) = 20 + 60 = 80
        expect(calculateSubtotal(cart)).toBe(80);
    });
});
