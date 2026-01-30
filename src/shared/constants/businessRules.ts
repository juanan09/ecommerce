export const BUSINESS_RULES = {
    DISCOUNTS: {
        BULK: {
            MIN_ITEMS: 5,
            PERCENTAGE: 0.10, // 10%
        },
        ORDER_VALUE: {
            MIN_SUBTOTAL: 100,
            PERCENTAGE: 0.15, // 15%
        },
    },
    QUANTITY: {
        MIN: 1,
        MAX: 99,
    },
} as const;
