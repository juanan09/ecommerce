import type { DiscountStrategy } from './DiscountStrategy';
import type { CartItem } from '@/shared/types';
import { BUSINESS_RULES } from '@/shared/constants';

export class OrderDiscountStrategy implements DiscountStrategy {
    public readonly name = 'Order Discount';
    public readonly description = '15% off on orders over $100';

    private get minSubtotal(): number {
        return BUSINESS_RULES.DISCOUNTS.ORDER_VALUE.MIN_SUBTOTAL;
    }

    private get percentage(): number {
        return BUSINESS_RULES.DISCOUNTS.ORDER_VALUE.PERCENTAGE;
    }

    public isApplicable(_items: CartItem[], subtotal: number): boolean {
        return subtotal >= this.minSubtotal;
    }

    public calculate(items: CartItem[], subtotal: number): number {
        if (!this.isApplicable(items, subtotal)) {
            return 0;
        }
        return subtotal * this.percentage;
    }
}
