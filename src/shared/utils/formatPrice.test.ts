import { describe, it, expect } from 'vitest';
import { formatPrice } from './formatPrice';

describe('formatPrice', () => {
    it('formats integers correctly', () => {
        expect(formatPrice(10)).toBe('$10.00');
        expect(formatPrice(100)).toBe('$100.00');
    });

    it('formats decimals correctly', () => {
        expect(formatPrice(10.5)).toBe('$10.50');
        expect(formatPrice(10.99)).toBe('$10.99');
        expect(formatPrice(10.05)).toBe('$10.05');
    });

    it('formats zero correctly', () => {
        expect(formatPrice(0)).toBe('$0.00');
    });

    it('formats large numbers with thousand separators', () => {
        expect(formatPrice(1000)).toBe('$1,000.00');
        expect(formatPrice(1234567.89)).toBe('$1,234,567.89');
    });
});
