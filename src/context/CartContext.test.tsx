import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import type { Product } from '@/shared/types';
import type { ReactNode } from 'react';

// Mock Data
const product1: Product = {
    id: '1',
    name: 'Product 1',
    price: 100,
    image: 'img1.jpg',
    description: 'Desc 1',
};

const product2: Product = {
    id: '2',
    name: 'Product 2',
    price: 200,
    image: 'img2.jpg',
    description: 'Desc 2',
};

describe('CartContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const wrapper = ({ children }: { children: ReactNode }) => (
        <CartProvider>
            {children}
        </CartProvider>
    );

    it('starts with empty cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });
        expect(result.current.items).toEqual([]);
        expect(result.current.itemCount).toBe(0);
        expect(result.current.subtotal).toBe(0);
    });

    it('adds a new item', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product1);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].product).toEqual(product1);
        expect(result.current.items[0].quantity).toBe(1);
        expect(result.current.itemCount).toBe(1);
        expect(result.current.subtotal).toBe(100);
    });

    it('increments quantity if item already exists', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product1);
        });

        act(() => {
            result.current.addItem(product1);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].quantity).toBe(2);
        expect(result.current.itemCount).toBe(2);
        expect(result.current.subtotal).toBe(200);
    });

    it('updates quantity of an item', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product1);
        });

        act(() => {
            result.current.updateQuantity(product1.id, 5);
        });

        expect(result.current.items[0].quantity).toBe(5);
        expect(result.current.itemCount).toBe(5);
        expect(result.current.subtotal).toBe(500);
    });

    it('removes item if quantity is updated to 0', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product1);
        });

        act(() => {
            result.current.updateQuantity(product1.id, 0);
        });

        expect(result.current.items).toHaveLength(0);
        expect(result.current.itemCount).toBe(0);
        expect(result.current.subtotal).toBe(0);
    });

    it('removes an item explicitly', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product1);
            result.current.addItem(product2);
        });

        expect(result.current.items).toHaveLength(2);

        act(() => {
            result.current.removeItem(product1.id);
        });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].product.id).toBe(product2.id);
    });

    it('clears the cart', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product1);
            result.current.addItem(product2);
        });

        act(() => {
            result.current.clearCart();
        });

        expect(result.current.items).toHaveLength(0);
        expect(result.current.itemCount).toBe(0);
        expect(result.current.subtotal).toBe(0);
    });

    it('calculates totals correctly with multiple items', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product1); // 100 * 1
            result.current.addItem(product2); // 200 * 1
            result.current.updateQuantity(product1.id, 3); // 100 * 3 = 300
        });

        // product1: 3 * 100 = 300
        // product2: 1 * 200 = 200
        // total: 500
        // itemCount: 3 + 1 = 4

        expect(result.current.itemCount).toBe(4);
        expect(result.current.subtotal).toBe(500);
    });

    it('loads initial state from localStorage', () => {
        const savedCart = [
            { product: product1, quantity: 2 }
        ];
        localStorage.setItem('cart', JSON.stringify(savedCart));

        const { result } = renderHook(() => useCart(), { wrapper });

        expect(result.current.items).toHaveLength(1);
        expect(result.current.items[0].product.id).toBe(product1.id);
        expect(result.current.items[0].quantity).toBe(2);
        expect(result.current.subtotal).toBe(200);
        expect(result.current.itemCount).toBe(2);
    });

    it('persists changes to localStorage', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        act(() => {
            result.current.addItem(product1);
        });

        const stored = localStorage.getItem('cart');
        expect(stored).not.toBeNull();
        const parsed = JSON.parse(stored!);
        expect(parsed).toHaveLength(1);
        expect(parsed[0].product.id).toBe(product1.id);
    });

    it('calculates discounts and total correctly', () => {
        const { result } = renderHook(() => useCart(), { wrapper });

        // Scenario:
        // Product 1 ($100): 1 unit -> $100
        // Product 2 ($200): 5 units -> $1000 (Bulk applies)

        // Subtotal: 100 + 1000 = 1100

        // Bulk Discount:
        // Product 2 qualifies (5 units). 10% of 1000 = 100.
        // Product 1 does not.
        // Bulk Discount = 100.

        // Subtotal after Bulk: 1100 - 100 = 1000.

        // Order Discount:
        // 1000 >= 100 (Threshold). 15% of 1000 = 150.

        // Total Discount: 100 + 150 = 250.
        // Total: 1100 - 250 = 850.

        act(() => {
            result.current.addItem(product1);
            result.current.addItem(product2);
            result.current.updateQuantity(product2.id, 5);
        });

        expect(result.current.subtotal).toBe(1100);
        expect(result.current.discount).toBe(250);
        expect(result.current.total).toBe(850);

        expect(result.current.discountBreakdown).toHaveLength(2);
        expect(result.current.discountBreakdown).toEqual(
            expect.arrayContaining([
                { name: 'Bulk Discount', amount: 100 },
                { name: 'Order Discount', amount: 150 }
            ])
        );
    });
});
