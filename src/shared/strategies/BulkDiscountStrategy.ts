import type { DiscountStrategy } from './DiscountStrategy';
import type { CartItem } from '@/shared/types';
import { BUSINESS_RULES } from '@/shared/constants'; // Adjusted import to use index or correct path

export class BulkDiscountStrategy implements DiscountStrategy {
    public readonly name = 'Bulk Discount';
    public readonly description = '10% off on items with 5 or more units';

    private get minItems(): number {
        return BUSINESS_RULES.DISCOUNTS.BULK.MIN_ITEMS;
    }

    private get percentage(): number {
        return BUSINESS_RULES.DISCOUNTS.BULK.PERCENTAGE;
    }

    public isApplicable(items: CartItem[]): boolean {
        return items.some((item) => item.quantity >= this.minItems);
    }

    public calculate(items: CartItem[], _subtotal: number): number {
        return items.reduce((totalDiscount, item) => {
            if (item.quantity >= this.minItems) {
                const itemSubtotal = item.product.price * item.quantity;
                return totalDiscount + (itemSubtotal * this.percentage);
            }
            return totalDiscount;
        }, 0);
    }
}
