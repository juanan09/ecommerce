import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartItem } from './CartItem';
import { formatPrice } from '@/shared/utils';
import { BUSINESS_RULES } from '@/shared/constants';

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

    it('renders all product info correctly', () => {
        render(<CartItem item={mockItem} onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText(formatPrice(100))).toBeInTheDocument();
        expect(screen.getByTestId('item-quantity')).toHaveTextContent('2');
        expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
        expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test Product');
        expect(screen.getByText('Test Product')).toHaveAttribute('title', 'Test Product');
    });

    it('handles quantity increase', () => {
        const onUpdate = vi.fn();
        render(<CartItem item={mockItem} onUpdateQuantity={onUpdate} onRemove={vi.fn()} />);

        const incBtn = screen.getByLabelText(/increase quantity/i);
        fireEvent.click(incBtn);

        expect(onUpdate).toHaveBeenCalledWith(3);
    });

    it('handles quantity decrease when possible', () => {
        const onUpdate = vi.fn();
        render(<CartItem item={mockItem} onUpdateQuantity={onUpdate} onRemove={vi.fn()} />);

        const decBtn = screen.getByLabelText(/decrease quantity/i);
        fireEvent.click(decBtn);

        expect(onUpdate).toHaveBeenCalledWith(1);
    });

    it('disables decrease button when at minimum quantity', () => {
        const minItem = { ...mockItem, quantity: BUSINESS_RULES.QUANTITY.MIN };
        render(<CartItem item={minItem} onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />);

        const decBtn = screen.getByLabelText(/decrease quantity/i);
        expect(decBtn).toBeDisabled();
        expect(decBtn).toHaveClass('disabled:opacity-30');
    });

    it('enables decrease button when above minimum quantity', () => {
        const normalItem = { ...mockItem, quantity: BUSINESS_RULES.QUANTITY.MIN + 1 };
        render(<CartItem item={normalItem} onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />);

        const decBtn = screen.getByLabelText(/decrease quantity/i);
        expect(decBtn).not.toBeDisabled();
    });

    it('triggers remove callback', () => {
        const onRemove = vi.fn();
        render(<CartItem item={mockItem} onUpdateQuantity={vi.fn()} onRemove={onRemove} />);

        const removeBtn = screen.getByLabelText(/remove .* from cart/i);
        fireEvent.click(removeBtn);

        expect(onRemove).toHaveBeenCalledTimes(1);
    });

    it('has correct visual styles and layout classes', () => {
        render(<CartItem item={mockItem} onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />);

        const container = screen.getByTestId('cart-item');
        expect(container).toHaveClass('flex', 'gap-3', 'p-3', 'bg-white');

        const price = screen.getByText(formatPrice(100));
        expect(price).toHaveClass('text-xs', 'text-gray-500', 'font-medium');

        const name = screen.getByText('Test Product');
        expect(name).toHaveClass('text-sm', 'font-semibold', 'text-gray-900');
    });

    it('renders the trash icon inside remove button', () => {
        render(<CartItem item={mockItem} onUpdateQuantity={vi.fn()} onRemove={vi.fn()} />);
        const removeBtn = screen.getByLabelText(/remove .* from cart/i);
        const svg = removeBtn.querySelector('svg');
        const path = svg?.querySelector('path');

        expect(svg).toBeInTheDocument();
        expect(path).toBeInTheDocument();
        expect(svg).toHaveClass('h-4', 'w-4');
    });
});

