import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartItem } from './CartItem';
import { formatPrice } from '@/shared/utils';

// Mock formatPrice to make testing strings predictable if needed,
// strictly speaking we could use real implementation but for unit tests
// normally we might want to check exact formatted values.
// However, since we have a stable utility, we can test against its output or regex.
// Let's use exact strings assuming formatPrice works (it's tested separately).

describe('CartItem', () => {
    const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 100,
        image: 'test.jpg',
        description: 'Test description'
    };

    const mockItem = {
        product: mockProduct,
        quantity: 2
    };

    it('renders item details correctly', () => {
        render(
            <CartItem
                item={mockItem}
                onUpdateQuantity={() => { }}
                onRemove={() => { }}
            />
        );

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText(formatPrice(100))).toBeInTheDocument(); // Unit price
        expect(screen.getByText(`Qty: ${2}`)).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
    });

    it('renders calculated subtotal', () => {
        render(
            <CartItem
                item={mockItem}
                onUpdateQuantity={() => { }}
                onRemove={() => { }}
            />
        );

        // Subtotal = 100 * 2 = 200
        expect(screen.getByText(formatPrice(200))).toBeInTheDocument();
    });

    it('calls onUpdateQuantity with incremented value when + is clicked', () => {
        const handleUpdate = vi.fn();
        render(
            <CartItem
                item={mockItem}
                onUpdateQuantity={handleUpdate}
                onRemove={() => { }}
            />
        );

        const increaseBtn = screen.getByRole('button', { name: /increase quantity/i });
        fireEvent.click(increaseBtn);

        expect(handleUpdate).toHaveBeenCalledWith(3);
    });

    it('calls onUpdateQuantity with decremented value when - is clicked', () => {
        const handleUpdate = vi.fn();
        render(
            <CartItem
                item={mockItem}
                onUpdateQuantity={handleUpdate}
                onRemove={() => { }}
            />
        );

        const decreaseBtn = screen.getByRole('button', { name: /decrease quantity/i });
        fireEvent.click(decreaseBtn);

        expect(handleUpdate).toHaveBeenCalledWith(1);
    });

    it('disables decrease button when quantity is 1', () => {
        const itemWithOne = { ...mockItem, quantity: 1 };
        render(
            <CartItem
                item={itemWithOne}
                onUpdateQuantity={() => { }}
                onRemove={() => { }}
            />
        );

        const decreaseBtn = screen.getByRole('button', { name: /decrease quantity/i });
        expect(decreaseBtn).toBeDisabled();
    });

    it('calls onRemove when remove button is clicked', () => {
        const handleRemove = vi.fn();
        render(
            <CartItem
                item={mockItem}
                onUpdateQuantity={() => { }}
                onRemove={handleRemove}
            />
        );

        const removeBtn = screen.getByRole('button', { name: /remove item/i });
        fireEvent.click(removeBtn);

        expect(handleRemove).toHaveBeenCalledTimes(1);
    });
});
