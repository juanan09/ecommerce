import { describe, it, expect } from 'vitest';
import { calculateBulkDiscount } from './calculateBulkDiscount';
import { BUSINESS_RULES } from '../constants';
import type { CartItem } from '../types';

describe('calculateBulkDiscount', () => {
    it('returns 0 when items are below qualification threshold', () => {
        const items: CartItem[] = [
            {
                product: { id: '1', name: 'P1', price: 100, image: '', description: '' },
                quantity: BUSINESS_RULES.DISCOUNTS.BULK.MIN_ITEMS - 1
            }
        ];
        expect(calculateBulkDiscount(items)).toBe(0);
    });

    it('applies discount when item meets qualification threshold', () => {
        const itemPrice = 100;
        const quantity = BUSINESS_RULES.DISCOUNTS.BULK.MIN_ITEMS;
        const items: CartItem[] = [
            {
                product: { id: '1', name: 'P1', price: itemPrice, image: '', description: '' },
                quantity: quantity
            }
        ];

        // Discount = (Price * Quantity) * Percentage
        const expectedDiscount = (itemPrice * quantity) * BUSINESS_RULES.DISCOUNTS.BULK.PERCENTAGE;
        expect(calculateBulkDiscount(items)).toBe(expectedDiscount);
    });

    it('applies discount when item exceeds qualification threshold', () => {
        const itemPrice = 100;
        const quantity = BUSINESS_RULES.DISCOUNTS.BULK.MIN_ITEMS + 5;
        const items: CartItem[] = [
            {
                product: { id: '1', name: 'P1', price: itemPrice, image: '', description: '' },
                quantity: quantity
            }
        ];

        const expectedDiscount = (itemPrice * quantity) * BUSINESS_RULES.DISCOUNTS.BULK.PERCENTAGE;
        expect(calculateBulkDiscount(items)).toBe(expectedDiscount);
    });

    it('only discounts qualifying items in a mixed cart', () => {
        const qualifyingPrice = 100;
        const qualifyingQty = BUSINESS_RULES.DISCOUNTS.BULK.MIN_ITEMS;

        const nonQualifyingPrice = 50;
        const nonQualifyingQty = BUSINESS_RULES.DISCOUNTS.BULK.MIN_ITEMS - 2;

        const items: CartItem[] = [
            {
                product: { id: '1', name: 'Qualifying', price: qualifyingPrice, image: '', description: '' },
                quantity: qualifyingQty
            },
            {
                product: { id: '2', name: 'NonQualifying', price: nonQualifyingPrice, image: '', description: '' },
                quantity: nonQualifyingQty
            }
        ];

        const expectedDiscount = (qualifyingPrice * qualifyingQty) * BUSINESS_RULES.DISCOUNTS.BULK.PERCENTAGE;
        // Non-qualifying item should contribute 0 to discount
        expect(calculateBulkDiscount(items)).toBe(expectedDiscount);
    });
});
