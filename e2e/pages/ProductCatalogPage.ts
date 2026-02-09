import { type Locator, type Page } from '@playwright/test';

export class ProductCatalogPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.heading = page.getByRole('heading', { name: 'Products' });
        this.productCards = page.getByTestId('product-card');
    }

    async goto() {
        await this.page.goto('/');
    }

    getProduct(name: string): Locator {
        return this.productCards.filter({ hasText: name });
    }

    async addToCart(name: string) {
        const product = this.getProduct(name);
        // Use a more specific locator for the button to avoid ambiguity if there are other buttons
        await product.getByRole('button', { name: /Add to Cart/i }).click();
    }
}
