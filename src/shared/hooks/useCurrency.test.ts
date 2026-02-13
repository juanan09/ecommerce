
import { renderHook } from '@testing-library/react';
import { useCurrency } from './useCurrency';

describe('useCurrency', () => {
    it('returns format and parse methods', () => {
        const { result } = renderHook(() => useCurrency());

        expect(result.current.format).toBeDefined();
        expect(result.current.parse).toBeDefined();
    });

    it('formats a number as currency', () => {
        const { result } = renderHook(() => useCurrency());
        expect(result.current.format(10)).toBe('$10.00');
    });

    it('parses a currency string into a number', () => {
        const { result } = renderHook(() => useCurrency());
        expect(result.current.parse('$1,234.56')).toBe(1234.56);
    });

    it('parses values with non-numeric characters', () => {
        const { result } = renderHook(() => useCurrency());
        expect(result.current.parse('€ 50.00')).toBe(50.00);
        expect(result.current.parse('  $100.99  ')).toBe(100.99);
    });
});
