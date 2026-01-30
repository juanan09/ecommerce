import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCatalog } from '../features/product-catalog/components/ProductCatalog';

// Mock the products data
vi.mock('../shared/data/products', () => ({
    MOCK_PRODUCTS: [
        {
            id: '1',
            name: 'Test Product 1',
            price: 100,
            image: 'img1.jpg',
            description: 'Desc 1'
        },
        {
            id: '2',
            name: 'Test Product 2',
            price: 200,
            image: 'img2.jpg',
            description: 'Desc 2'
        }
    ]
}));

describe('ProductCatalog', () => {
    it('renders the catalog title and products', () => {
        const handleAddToCart = vi.fn();
        render(<ProductCatalog onAddToCart={handleAddToCart} />);

        expect(screen.getByRole('heading', { name: /products/i })).toBeInTheDocument();
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
});
