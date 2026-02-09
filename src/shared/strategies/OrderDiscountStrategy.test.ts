import { describe, it, expect } from 'vitest';
import { OrderDiscountStrategy } from './OrderDiscountStrategy';
import type { CartItem } from '@/shared/types';
import { BUSINESS_RULES } from '@/shared/constants';

describe('OrderDiscountStrategy', () => {
    const strategy = new OrderDiscountStrategy();
    const threshold = BUSINESS_RULES.DISCOUNTS.ORDER_VALUE.MIN_SUBTOTAL; // 100
    const percentage = BUSINESS_RULES.DISCOUNTS.ORDER_VALUE.PERCENTAGE; // 0.15

    const mockItems: CartItem[] = []; // Items are irrelevant for this calculation

    it('has the correct name', () => {
        expect(strategy.name).toBe('Order Discount');
    });

    it('is NOT applicable if subtotal is below minimum threshold', () => {
        const subtotal = threshold - 0.01;
        expect(strategy.isApplicable(mockItems, subtotal)).toBe(false);
    });

    it('is applicable if subtotal equals minimum threshold', () => {
        const subtotal = threshold;
        expect(strategy.isApplicable(mockItems, subtotal)).toBe(true);
    });

    it('is applicable if subtotal is above minimum threshold', () => {
        const subtotal = threshold + 50;
        expect(strategy.isApplicable(mockItems, subtotal)).toBe(true);
    });

    it('calculates 15% discount correctly based on subtotal', () => {
        const subtotal = 200;
        const expectedDiscount = subtotal * percentage; // 200 * 0.15 = 30

        expect(strategy.calculate(mockItems, subtotal)).toBe(expectedDiscount);
    });

    it('returns 0 discount if calculate is called with subtotal below threshold', () => {
        const subtotal = threshold - 1;
        expect(strategy.calculate(mockItems, subtotal)).toBe(0);
    });
});
