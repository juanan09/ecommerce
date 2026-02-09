import { describe, it, expect, beforeEach } from 'vitest';
import { DiscountCalculator } from './DiscountCalculator';
import { BulkDiscountStrategy } from './BulkDiscountStrategy';
import { OrderDiscountStrategy } from './OrderDiscountStrategy';
import type { CartItem } from '@/shared/types';

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

describe('DiscountCalculator', () => {
    let calculator: DiscountCalculator;
    let bulkStrategy: BulkDiscountStrategy;
    let orderStrategy: OrderDiscountStrategy;

    beforeEach(() => {
        calculator = new DiscountCalculator();
        bulkStrategy = new BulkDiscountStrategy();
        orderStrategy = new OrderDiscountStrategy();

        // Register strategies in specific order for sequential application
        calculator.registerStrategy(bulkStrategy);
        calculator.registerStrategy(orderStrategy);
    });

    it('returns 0 discount for empty cart', () => {
        const items: CartItem[] = [];
        const subtotal = 0;
        const discount = calculator.calculate(items, subtotal);
        expect(discount).toBe(0);
        expect(calculator.getBreakdown()).toEqual([]);
    });

    it('applies only bulk discount when order threshold is not met', () => {
        // Bulk applies (qty >= 5), but Subtotal ($50) < Order Threshold ($100)
        const items = [createMockItem('1', 10, 5)];
        const subtotal = 50;

        // Bulk: 10% of 50 = 5
        const expectedDiscount = 5;

        const discount = calculator.calculate(items, subtotal);
        expect(discount).toBe(expectedDiscount);

        const breakdown = calculator.getBreakdown();
        expect(breakdown).toHaveLength(1);
        expect(breakdown[0].name).toBe(bulkStrategy.name);
        expect(breakdown[0].amount).toBe(5);
    });

    it('applies only order discount when bulk threshold is not met', () => {
        // Bulk does not apply (qty < 5), but Subtotal ($100) >= Order Threshold ($100)
        const items = [createMockItem('1', 100, 1)];
        const subtotal = 100;

        // Order: 15% of 100 = 15
        const expectedDiscount = 15;

        const discount = calculator.calculate(items, subtotal);
        expect(discount).toBe(expectedDiscount);

        const breakdown = calculator.getBreakdown();
        expect(breakdown).toHaveLength(1);
        expect(breakdown[0].name).toBe(orderStrategy.name);
        expect(breakdown[0].amount).toBe(15);
    });

    it('applies both strategies sequentially (Bulk then Order)', () => {
        // Scenario: Subtotal $125
        // 1. Bulk applies (qty 5): 10% of 125 = 12.50
        //    Remaining base for order discount: 125 - 12.50 = 112.50
        // 2. Order applies (112.50 >= 100): 15% of 112.50 = 16.875
        //    Total discount = 12.50 + 16.875 = 29.375

        const items = [createMockItem('1', 25, 5)]; // 25 * 5 = 125
        const subtotal = 125;

        const discount = calculator.calculate(items, subtotal);

        expect(discount).toBe(29.375);

        const breakdown = calculator.getBreakdown();
        expect(breakdown).toHaveLength(2);

        // Verify sequence and amounts
        expect(breakdown[0].name).toBe(bulkStrategy.name);
        expect(breakdown[0].amount).toBe(12.5);

        expect(breakdown[1].name).toBe(orderStrategy.name);
        expect(breakdown[1].amount).toBe(16.875);
    });

    it('does not add zero-amount discounts to the breakdown', () => {
        // Use a fresh calculator to avoid interference from strategies in beforeEach
        const cleanCalculator = new DiscountCalculator();

        // Mock a strategy that is applicable but returns 0 discount
        const zeroStrategy = {
            name: 'Zero Strategy',
            description: 'Always returns 0',
            isApplicable: () => true,
            calculate: () => 0
        };

        cleanCalculator.registerStrategy(zeroStrategy);
        const discount = cleanCalculator.calculate([], 100);

        expect(discount).toBe(0);
        expect(cleanCalculator.getBreakdown()).toEqual([]);
    });
});
