import { render, screen, fireEvent } from '@testing-library/react';
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

    it('calls onAddToCart when the add button is clicked', () => {
        const handleAddToCart = vi.fn();
        render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

        const button = screen.getByRole('button', { name: /add to cart/i });
        fireEvent.click(button);

        expect(handleAddToCart).toHaveBeenCalledTimes(1);
        expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
    });
});
