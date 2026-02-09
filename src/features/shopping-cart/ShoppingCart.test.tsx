import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ShoppingCart } from './ShoppingCart';
import { useCart } from '../../context/useCart';
import { formatPrice } from '@/shared/utils';

// Mock the useCart hook
vi.mock('../../context/useCart', () => ({
    useCart: vi.fn(),
}));

describe('ShoppingCart Component', () => {
    const mockUpdateQuantity = vi.fn();
    const mockRemoveItem = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders empty state correctly', () => {
        (useCart as any).mockReturnValue({
            items: [],
            itemCount: 0,
            subtotal: 0,
            discount: 0,
            total: 0,
            discountBreakdown: [],
            updateQuantity: mockUpdateQuantity,
            removeItem: mockRemoveItem,
        });

        render(<ShoppingCart />);

        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
        expect(screen.getByText(/start shopping/i)).toBeInTheDocument();
        expect(screen.queryByText(/cart items/i)).not.toBeInTheDocument();
    });

    it('renders list of items and summary when cart is not empty', () => {
        const mockItems = [
            {
                product: { id: '1', name: 'Product 1', price: 10, image: 'img1.jpg', description: 'desc1' },
                quantity: 2
            }
        ];

        (useCart as any).mockReturnValue({
            items: mockItems,
            itemCount: 2,
            subtotal: 20,
            discount: 0,
            total: 20,
            discountBreakdown: [],
            updateQuantity: mockUpdateQuantity,
            removeItem: mockRemoveItem,
        });

        render(<ShoppingCart />);

        expect(screen.getByText(/cart items/i)).toBeInTheDocument();

        // Use getAllByText and check length since '2' appears in badge and item quantity
        const countElements = screen.getAllByText('2');
        expect(countElements.length).toBeGreaterThanOrEqual(1);

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText(/order summary/i)).toBeInTheDocument();
        expect(screen.getByTestId('cart-summary-total')).toHaveTextContent(formatPrice(20));
    });

    it('calls updateQuantity and removeItem through children', () => {
        const mockItems = [
            {
                product: { id: '1', name: 'Product 1', price: 10, image: 'img1.jpg', description: 'desc1' },
                quantity: 2
            }
        ];

        (useCart as any).mockReturnValue({
            items: mockItems,
            itemCount: 2,
            subtotal: 20,
            discount: 0,
            total: 20,
            discountBreakdown: [],
            updateQuantity: mockUpdateQuantity,
            removeItem: mockRemoveItem,
        });

        render(<ShoppingCart />);

        // Interaction with CartItem increase button
        const incBtn = screen.getByLabelText(/increase quantity/i);
        fireEvent.click(incBtn);
        expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 3);

        // Interaction with CartItem remove button
        const removeBtn = screen.getByLabelText(/remove item/i);
        fireEvent.click(removeBtn);
        expect(mockRemoveItem).toHaveBeenCalledWith('1');
    });
});
