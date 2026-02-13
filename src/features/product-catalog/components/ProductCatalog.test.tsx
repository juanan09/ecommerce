
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCatalog } from './ProductCatalog';
import { describe, it, expect, vi } from 'vitest';
import type { Product } from '../../../shared/types';

// Mock ProductCard to simplify catalog testing and avoid testing child implementation
vi.mock('./ProductCard', () => ({
    ProductCard: ({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) => (
        <div data-testid="product-card-mock">
            <span>{product.name}</span>
            <button onClick={() => onAddToCart(product)} aria-label={`Add ${product.name}`}>Add</button>
        </div>
    )
}));

describe('ProductCatalog', () => {
    it('renders list of products', () => {
        const onAdd = vi.fn();
        render(<ProductCatalog onAddToCart={onAdd} />);

        const products = screen.getAllByTestId('product-card-mock');
        expect(products.length).toBeGreaterThan(0);
        expect(screen.getByText('Products')).toBeInTheDocument();
    });

    it('integration: calls onAddToCart when a product button is clicked', () => {
        const onAdd = vi.fn();
        render(<ProductCatalog onAddToCart={onAdd} />);

        const addButtons = screen.getAllByText('Add');
        expect(addButtons.length).toBeGreaterThan(0);

        fireEvent.click(addButtons[0]);
        expect(onAdd).toHaveBeenCalledTimes(1);
    });
});
