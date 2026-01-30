import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartSummary } from './CartSummary';
import { formatPrice } from '@/shared/utils';

describe('CartSummary', () => {
    it('renders subtotal and total correctly', () => {
        render(<CartSummary subtotal={200} discount={0} total={200} itemCount={5} />);

        expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
        // Check for presence of price content generally
        const prices = screen.getAllByText(formatPrice(200));
        expect(prices.length).toBeGreaterThan(0);
        expect(screen.getByText(/^total$/i)).toBeInTheDocument();
    });

    it('displays discount row when discount is greater than 0', () => {
        render(<CartSummary subtotal={200} discount={20} total={180} itemCount={5} />);

        expect(screen.getByText(/discount/i)).toBeInTheDocument();
        // Should show as negative amount
        expect(screen.getByText(`-${formatPrice(20)}`)).toBeInTheDocument();
    });

    it('does not display discount row when discount is 0', () => {
        render(<CartSummary subtotal={50} discount={0} total={50} itemCount={2} />);

        expect(screen.queryByText(/discount/i)).not.toBeInTheDocument();
    });

    it('displays promotional message when subtotal is under $100', () => {
        render(<CartSummary subtotal={80} discount={0} total={80} itemCount={3} />);

        // $100 - $80 = $20 needed
        expect(screen.getByText(/Add \$20.00 more for 15% off!/i)).toBeInTheDocument();
    });

    it('does not display promotional message when subtotal is $100 or more', () => {
        render(<CartSummary subtotal={100} discount={15} total={85} itemCount={5} />);

        expect(screen.queryByText(/Add .* more for 15% off/i)).not.toBeInTheDocument();
    });

    it('renders checkout button', () => {
        render(<CartSummary subtotal={50} discount={0} total={50} itemCount={1} />);

        expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument();
    });
});
