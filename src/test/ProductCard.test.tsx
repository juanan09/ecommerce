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

    it('calls onAddToCart and handles success state timeout', () => {
        vi.useFakeTimers();
        const handleAddToCart = vi.fn();
        render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

        const button = screen.getByRole('button', { name: /add to cart/i });
        fireEvent.click(button);

        expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
        expect(screen.getByText(/added!/i)).toBeInTheDocument();

        // Advance timers to trigger the reset (Line 16 coverage)
        act(() => {
            vi.advanceTimersByTime(1500);
        });

        // Use findBy for async check
        expect(screen.queryByText(/added!/i)).not.toBeInTheDocument();
        vi.useRealTimers();
    });
});
