import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '../features/product-catalog/components/ProductCard';

describe('ProductCard', () => {
    const mockProduct = {
        id: '1',
        name: 'Awesome Product',
        price: 129.99,
        image: 'https://example.com/product.jpg',
        description: 'This is an awesome product description that is long enough to be truncated in the UI view.',
    };

    it('renders product information correctly', () => {
        render(<ProductCard product={mockProduct} onAddToCart={() => { }} />);

        expect(screen.getByText('Awesome Product')).toBeInTheDocument();
        expect(screen.getByText('$129.99')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/product.jpg');
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Awesome Product');
    });

    it('handles state transitions: idle -> loading -> success -> idle', async () => {
        vi.useFakeTimers();
        const handleAddToCart = vi.fn();
        render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

        const button = screen.getByRole('button', { name: /add .* to cart/i });

        // 1. Trigger Click
        await act(async () => {
            fireEvent.click(button);
        });

        // 2. Loading State (immediate)
        expect(screen.getByText(/adding/i)).toBeInTheDocument();
        expect(button).toBeDisabled();
        expect(handleAddToCart).not.toHaveBeenCalled(); // Should wait for delay

        // 3. Advance through loading delay (600ms)
        await act(async () => {
            vi.advanceTimersByTime(600);
        });

        // 4. Success State
        expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
        expect(screen.getByText(/added!/i)).toBeInTheDocument();

        // 5. Advance through success reset delay (2000ms)
        await act(async () => {
            vi.advanceTimersByTime(2000);
        });

        // 6. Back to Idle
        expect(screen.getByText(/add to cart/i)).toBeInTheDocument();
        expect(button).not.toBeDisabled();

        vi.useRealTimers();
    });

    it('handles error state: idle -> loading -> error -> idle', async () => {
        vi.useFakeTimers();
        const handleAddToCart = vi.fn().mockImplementation(() => {
            throw new Error('Failed to add');
        });

        render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

        const button = screen.getByRole('button', { name: /add .* to cart/i });

        // 1. Click
        await act(async () => {
            fireEvent.click(button);
        });

        // 2. Advance delay
        await act(async () => {
            vi.advanceTimersByTime(600);
        });

        // 3. Error State
        expect(handleAddToCart).toHaveBeenCalled();
        expect(screen.getByText(/failed/i)).toBeInTheDocument();
        expect(button).toHaveClass('bg-red-600');

        // 4. Advance through error reset delay (3000ms)
        await act(async () => {
            vi.advanceTimersByTime(3000);
        });

        // 5. Back to Idle
        expect(screen.getByText(/add to cart/i)).toBeInTheDocument();

        vi.useRealTimers();
    });
});
