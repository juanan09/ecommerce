
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { Product } from '../../../shared/types'; // Adjust path if necessary

const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    image: 'test.jpg',
    description: 'Test description'
};

// Mock formatPrice since ProductCard uses it
vi.mock('../../../shared/utils', () => ({
    formatPrice: (price: number) => `$${price.toFixed(2)}`
}));

describe('ProductCard', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders correctly', () => {
        render(<ProductCard product={mockProduct} onAddToCart={vi.fn()} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$99.99')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
        const button = screen.getByRole('button', { name: /add test product to cart/i });
        expect(button).toBeInTheDocument();
        expect(button).toBeEnabled();
    });

    it('handles add to cart flow: loading -> success -> idle', async () => {
        const onAdd = vi.fn();
        render(<ProductCard product={mockProduct} onAddToCart={onAdd} />);

        const button = screen.getByRole('button');

        // 1. Click button
        fireEvent.click(button);

        // Should show adding state immediately
        expect(screen.getByText(/adding/i)).toBeInTheDocument();
        expect(button).toBeDisabled();
        expect(onAdd).not.toHaveBeenCalled(); // Wait for simulated delay

        // 2. Fast-forward 600ms (loading delay)
        await act(async () => {
            vi.advanceTimersByTime(600);
        });

        // onAddToCart should be called now
        expect(onAdd).toHaveBeenCalledWith(mockProduct);

        // Should show success state
        expect(screen.getByText(/added/i)).toBeInTheDocument();
        expect(button).toBeDisabled();

        // 3. Fast-forward 2000ms (success duration)
        await act(async () => {
            vi.advanceTimersByTime(2000);
        });

        // Should return to idle
        expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
        expect(button).toBeEnabled();
    });

    it('handles error state when onAddToCart throws', async () => {
        // Mock onAddToCart to throw error
        const onAdd = vi.fn().mockImplementation(() => { throw new Error('Failed'); });

        render(<ProductCard product={mockProduct} onAddToCart={onAdd} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        // Wait for loading delay
        await act(async () => {
            vi.advanceTimersByTime(600);
        });

        // Should show error state
        expect(screen.getByText(/failed/i)).toBeInTheDocument();
        expect(button).toHaveClass('bg-red-600'); // Check for error styling class roughly

        // Error state lasts 3000ms
        await act(async () => {
            vi.advanceTimersByTime(3000);
        });

        // Should return to idle
        expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
    });

    it('prevents multiple clicks while loading/success', async () => {
        const onAdd = vi.fn();
        render(<ProductCard product={mockProduct} onAddToCart={onAdd} />);
        const button = screen.getByRole('button');

        fireEvent.click(button);
        fireEvent.click(button); // Second click should be ignored

        // Wait for loading delay
        await act(async () => {
            vi.advanceTimersByTime(600);
        });

        expect(onAdd).toHaveBeenCalledTimes(1);
    });

    it('prevents clicks while in success state', async () => {
        const onAdd = vi.fn();
        render(<ProductCard product={mockProduct} onAddToCart={onAdd} />);
        const button = screen.getByRole('button');

        // Click and advance to success state
        fireEvent.click(button);
        await act(async () => {
            vi.advanceTimersByTime(600); // Complete loading
        });

        // Now in success state
        expect(screen.getByText(/added/i)).toBeInTheDocument();

        // Try to click again while in success state
        fireEvent.click(button);
        fireEvent.click(button);

        // Should still only have been called once
        expect(onAdd).toHaveBeenCalledTimes(1);
    });
});
