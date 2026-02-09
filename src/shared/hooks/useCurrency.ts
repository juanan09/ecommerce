import { formatPrice } from '../utils';

/**
 * Hook for currency formatting and parsing operations
 * @returns Object with format and parse functions
 */
export function useCurrency() {
    return {
        /**
         * Format a number as currency string
         * @param value - Number to format
         * @returns Formatted currency string (e.g., "$10.00")
         */
        format: formatPrice,

        /**
         * Parse a currency string to a number
         * @param value - Currency string to parse (e.g., "$1,234.56")
         * @returns Parsed number value
         */
        parse: (value: string): number => {
            return Number.parseFloat(value.replaceAll(/[^0-9.-]+/g, ''));
        },
    };
}
