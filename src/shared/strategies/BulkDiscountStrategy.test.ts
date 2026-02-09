import { describe, it, expect } from 'vitest';
import { BulkDiscountStrategy } from './BulkDiscountStrategy';
import type { CartItem } from '@/shared/types';
import { BUSINESS_RULES } from '@/shared/constants';

// Helper to create mock items
const createMockItem = (id: string, price: number, quantity: number): CartItem => ({
    product: {
        id,
        name: `Product ${id}`,
        price,
        image: 'img.jpg',
        description: 'desc'
    },
    quantity,
});

describe('BulkDiscountStrategy', () => {
    const strategy = new BulkDiscountStrategy();
    const minQty = BUSINESS_RULES.DISCOUNTS.BULK.MIN_ITEMS;
    const discountRate = BUSINESS_RULES.DISCOUNTS.BULK.PERCENTAGE;

    it('has the correct name', () => {
        expect(strategy.name).toBe('Bulk Discount');
    });

    it('is NOT applicable if no item meets the bulk quantity threshold', () => {
        const items = [
            createMockItem('1', 100, minQty - 1),
            createMockItem('2', 50, 1)
        ];
        // subtotal is irrelevant for this strategy's applicability
        expect(strategy.isApplicable(items, 0)).toBe(false);
    });

    it('is applicable if at least one item meets the bulk quantity threshold', () => {
        const items = [
            createMockItem('1', 100, minQty),
        ];
        expect(strategy.isApplicable(items, 0)).toBe(true);
    });

    it('calculates discount correctly for a single qualifying item', () => {
        const itemPrice = 100;
        const quantity = minQty; // 5
        const items = [createMockItem('1', itemPrice, quantity)];

        // Expected discount: (100 * 5) * 0.10 = 50
        const expectedDiscount = (itemPrice * quantity) * discountRate;

        expect(strategy.calculate(items, 0)).toBe(expectedDiscount);
    });

    it('only discounts qualifying items in a mixed cart', () => {
        const qualifyingItemPrice = 100;
        const qualifyingQty = minQty; // 5

        const regularItemPrice = 50;
        const regularQty = 1;

        const items = [
            createMockItem('1', qualifyingItemPrice, qualifyingQty), // Qualifies
            createMockItem('2', regularItemPrice, regularQty)       // Does not qualify
        ];

        // Expected discount: Only on item 1
        // (100 * 5) * 0.10 = 50
        const expectedDiscount = (qualifyingItemPrice * qualifyingQty) * discountRate;

        expect(strategy.calculate(items, 0)).toBe(expectedDiscount);
    });

    it('returns 0 discount if applicable but no items qualify (edge case for safety)', () => {
        // This case shouldn't technically happen if isApplicable checks correctly, 
        // but calculate should be robust.
        const items = [
            createMockItem('1', 100, minQty - 1)
        ];
        expect(strategy.calculate(items, 0)).toBe(0);
    });
});
