import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartSummary } from './CartSummary';
import { formatPrice } from '@/shared/utils';

describe('CartSummary', () => {
    it('renders subtotal and total correctly', () => {
        render(<CartSummary subtotal={200} discount={0} total={200} itemCount={5} discountBreakdown={[]} />);

        expect(screen.getByText(/subtotal/i)).toBeInTheDocument();
        // Check for presence of price content generally
        const prices = screen.getAllByText(formatPrice(200));
        expect(prices.length).toBeGreaterThan(0);
        expect(screen.getByText(/^total$/i)).toBeInTheDocument();
    });

    it('displays discount breakdown when discounts exist', () => {
        const breakdown = [
            { name: 'Bulk Discount', amount: 20 },
            { name: 'Order Discount', amount: 10 }
        ];
        render(<CartSummary subtotal={200} discount={30} total={170} itemCount={5} discountBreakdown={breakdown} />);

        expect(screen.getByText('Bulk Discount')).toBeInTheDocument();
        expect(screen.getByText(`-${formatPrice(20)}`)).toBeInTheDocument();

        expect(screen.getByText('Order Discount')).toBeInTheDocument();
        expect(screen.getByText(`-${formatPrice(10)}`)).toBeInTheDocument();
    });

    it('does not display discount section when discount is 0', () => {
        render(<CartSummary subtotal={50} discount={0} total={50} itemCount={2} discountBreakdown={[]} />);

        expect(screen.queryByText(/discount/i)).not.toBeInTheDocument();
    });

    it('displays promotional message when Order Discount is NOT applied and effective subtotal is under threshold', () => {
        // Subtotal $80, Order Threshold $100. Missing $20.
        render(<CartSummary subtotal={80} discount={0} total={80} itemCount={3} discountBreakdown={[]} />);

        // $100 - $80 = $20 needed
        expect(screen.getByText(/Add \$20.00 more for 15% off!/i)).toBeInTheDocument();
    });

    it('does not display promotional message if Order Discount is already applied', () => {
        // Even if effective subtotal is < 100 (e.g. huge bulk discount), if Order Discount is in breakdown, hide promo.
        // Though logically Order Discount only applies if > 100, this tests the suppression logic.
        const breakdown = [{ name: 'Order Discount', amount: 15 }];
        render(<CartSummary subtotal={100} discount={15} total={85} itemCount={5} discountBreakdown={breakdown} />);

        expect(screen.queryByText(/Add .* more for 15% off/i)).not.toBeInTheDocument();
    });

    it('displays promotional message correctly when other discounts reduce the effective subtotal', () => {
        // Subtotal $105. Bulk Discount $10. Effective Subtotal $95.
        // Missing $5 for Order Discount ($100).
        // Since Order Discount is NOT in breakdown, it should show missing amount.

        const breakdown = [{ name: 'Bulk Discount', amount: 10 }];
        render(<CartSummary subtotal={105} discount={10} total={95} itemCount={5} discountBreakdown={breakdown} />);

        // $100 - $95 = $5 needed
        expect(screen.getByText(/Add \$5.00 more/i)).toBeInTheDocument();
    });

    it('renders checkout button', () => {
        render(<CartSummary subtotal={50} discount={0} total={50} itemCount={1} discountBreakdown={[]} />);

        expect(screen.getByRole('button', { name: /checkout/i })).toBeInTheDocument();
    });
});
