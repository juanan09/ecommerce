import { type Locator, type Page } from '@playwright/test';

export class ShoppingCartPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly emptyMessage: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly subtotal: Locator;
    readonly total: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: /Shopping Cart|Order Summary/i });
        this.emptyMessage = page.getByText(/Your cart is empty/i);
        this.cartItems = page.getByTestId('cart-item');
        this.checkoutButton = page.getByRole('button', { name: /Checkout/i });
        this.subtotal = page.getByTestId('cart-summary-subtotal');
        this.total = page.getByTestId('cart-summary-total');
    }

    getCartItem(productName: string): Locator {
        return this.cartItems.filter({ hasText: productName });
    }

    async incrementItem(productName: string) {
        await this.getCartItem(productName)
            .getByRole('button', { name: 'Increase quantity' })
            .click();
    }

    async decrementItem(productName: string) {
        await this.getCartItem(productName)
            .getByRole('button', { name: 'Decrease quantity' })
            .click();
    }

    async removeItem(productName: string) {
        await this.getCartItem(productName)
            .getByRole('button', { name: 'remove item' })
            .click();
    }

    async getItemQuantity(productName: string): Promise<number> {
        const quantityText = await this.getCartItem(productName)
            .getByTestId('item-quantity')
            .textContent();
        return quantityText ? Number.parseInt(quantityText, 10) : 0;
    }
}
