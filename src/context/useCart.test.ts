import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCart } from './useCart';

describe('useCart', () => {
    it('throws error when used outside CartProvider', () => {
        // Suppress console.error for this test since we expect an error
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => {
            renderHook(() => useCart());
        }).toThrow('useCart must be used within a CartProvider');

        consoleSpy.mockRestore();
    });
});
