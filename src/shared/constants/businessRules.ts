export const BUSINESS_RULES = {
    DISCOUNTS: {
        BULK: {
            MIN_ITEMS: 5,
            PERCENTAGE: 0.1, // 10%
            get DESCRIPTION() {
                return `${this.PERCENTAGE * 100}% off on items with ${this.MIN_ITEMS} or more units`;
            },
        },
        ORDER_VALUE: {
            MIN_SUBTOTAL: 100,
            PERCENTAGE: 0.15, // 15%
            get DESCRIPTION() {
                return `${this.PERCENTAGE * 100}% off on orders over $${this.MIN_SUBTOTAL}`;
            },
        },
    },
    QUANTITY: {
        MIN: 1,
        MAX: 99,
    },
};
