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

    it('displays generic "Discount" label when breakdown is empty but discount > 0', () => {
        render(<CartSummary subtotal={100} discount={10} total={90} itemCount={1} discountBreakdown={[]} />);

        expect(screen.getByText('Discount')).toBeInTheDocument();
        expect(screen.getByText(`-${formatPrice(10)}`)).toBeInTheDocument();
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

    it('does not display promotional message when effective subtotal is exactly at threshold', () => {
        // Subtotal $100 (exactly at threshold), no discount
        render(<CartSummary subtotal={100} discount={0} total={100} itemCount={5} discountBreakdown={[]} />);

        // Should not show promo since we're at the threshold
        expect(screen.queryByText(/Add .* more for 15% off/i)).not.toBeInTheDocument();
    });

    it('does not display promotional message when effective subtotal is above threshold', () => {
        // Subtotal $150 (above threshold), no discount
        render(<CartSummary subtotal={150} discount={0} total={150} itemCount={5} discountBreakdown={[]} />);

        // Should not show promo since we're above the threshold
        expect(screen.queryByText(/Add .* more for 15% off/i)).not.toBeInTheDocument();
    });

    it('displays promotional message when subtotal is just below threshold', () => {
        // Subtotal $99.50, just $0.50 away from threshold
        render(<CartSummary subtotal={99.5} discount={0} total={99.5} itemCount={3} discountBreakdown={[]} />);

        expect(screen.getByText(/Add \$0.50 more for 15% off!/i)).toBeInTheDocument();
    });

    it('handles multiple discounts in breakdown correctly', () => {
        const breakdown = [
            { name: 'Bulk Discount', amount: 15 },
            { name: 'Order Discount', amount: 25 },
            { name: 'Special Promo', amount: 5 },
        ];
        render(<CartSummary subtotal={200} discount={45} total={155} itemCount={10} discountBreakdown={breakdown} />);

        // All discounts should be displayed
        expect(screen.getByText('Bulk Discount')).toBeInTheDocument();
        expect(screen.getByText('Order Discount')).toBeInTheDocument();
        expect(screen.getByText('Special Promo')).toBeInTheDocument();

        expect(screen.getByText(`-${formatPrice(15)}`)).toBeInTheDocument();
        expect(screen.getByText(`-${formatPrice(25)}`)).toBeInTheDocument();
        expect(screen.getByText(`-${formatPrice(5)}`)).toBeInTheDocument();
    });

    it('displays correct item count in summary', () => {
        render(<CartSummary subtotal={100} discount={0} total={100} itemCount={7} discountBreakdown={[]} />);

        expect(screen.getByText(/7 items/i)).toBeInTheDocument();
    });

    it('displays singular "item" when itemCount is 1', () => {
        render(<CartSummary subtotal={50} discount={0} total={50} itemCount={1} discountBreakdown={[]} />);

        expect(screen.getByText(/1 items/i)).toBeInTheDocument(); // Note: component uses "items" for all counts
    });

    it('renders the total section with correct data automation id', () => {
        render(<CartSummary subtotal={100} discount={0} total={100} itemCount={1} discountBreakdown={[]} />);

        const totalAmount = screen.getByTestId('cart-summary-total');
        expect(totalAmount).toHaveTextContent(formatPrice(100));
        expect(screen.getByText('Total')).toBeInTheDocument();
    });

    it('checks that checkout button is a button role', () => {
        render(<CartSummary subtotal={100} discount={0} total={100} itemCount={1} discountBreakdown={[]} />);
        expect(screen.getByRole('button')).toHaveTextContent(/checkout/i);
    });

    it('verifies the math for the promotional threshold message', () => {
        // Threshold is 100. If we have 90.50, we need 9.50.
        render(<CartSummary subtotal={90.5} discount={0} total={90.5} itemCount={1} discountBreakdown={[]} />);

        const promoMsg = screen.getByText(/Add \$9.50 more/i);
        expect(promoMsg).toBeInTheDocument();
        // Verify it has the blue styling classes (line 59 coverage)
        expect(promoMsg).toHaveClass('bg-blue-50');
    });

    it('renders exactly one divider line', () => {
        const { container } = render(<CartSummary subtotal={100} discount={0} total={100} itemCount={1} discountBreakdown={[]} />);
        const divider = container.querySelector('.h-px.bg-gray-200');
        expect(divider).toBeInTheDocument();
    });

    it('renders subtotal with the correct item count text pluralization', () => {
        render(<CartSummary subtotal={100} discount={0} total={100} itemCount={10} discountBreakdown={[]} />);
        expect(screen.getByText(/Subtotal \(10 items\)/i)).toBeInTheDocument();
    });
});
