import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';
import { Product } from '../../../shared/types';

// Mock Product matching the shared interface but ensuring we check what user asked (name/title)
const mockProduct: Product = {
    id: 1,
    title: 'Test Product Name',
    price: 15.50,
    image: 'https://example.com/image.jpg',
    description: 'Test description',
    category: 'test'
};

describe('ProductCard Component', () => {
    it('renders product information correctly', () => {
        render(<ProductCard product={mockProduct} onAddToCart={() => { }} />);

        // Muestra el nombre del producto
        expect(screen.getByText('Test Product Name')).toBeInTheDocument();

        // Muestra el precio formateado como $XX.XX
        // Assuming formatPrice utility or logic handles this, test expects the final outcome
        expect(screen.getByText('$15.50')).toBeInTheDocument();
    });

    it('calls onAddToCart when the Add to Cart button is clicked', () => {
        const handleAddToCart = vi.fn();
        render(<ProductCard product={mockProduct} onAddToCart={handleAddToCart} />);

        // Tiene un botón "Add to Cart"
        const button = screen.getByRole('button', { name: /add to cart/i });
        expect(button).toBeInTheDocument();

        // Llama onAddToCart con el producto
        fireEvent.click(button);
        expect(handleAddToCart).toHaveBeenCalledTimes(1);
        expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
    });
});
