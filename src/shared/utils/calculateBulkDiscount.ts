import { BUSINESS_RULES } from '../constants';
import type { CartItem } from '../types';

export const calculateBulkDiscount = (items: CartItem[]): number => {
    return items.reduce((totalDiscount, item) => {
        if (item.quantity >= BUSINESS_RULES.DISCOUNTS.BULK.MIN_ITEMS) {
            return totalDiscount + (item.product.price * item.quantity * BUSINESS_RULES.DISCOUNTS.BULK.PERCENTAGE);
        }
        return totalDiscount;
    }, 0);
};
