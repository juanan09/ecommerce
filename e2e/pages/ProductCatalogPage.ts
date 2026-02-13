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

        // 1. Click the 'Add' button (matches idle state)
        await product.getByRole('button', { name: /add .* to cart/i }).click();

        // 2. Wait for the button to show 'Added!' (success state)
        // This confirms the action was registered and processed
        // We use a broader regex because the text might be 'Added!' or 'Added to cart' depending on implementation
        // ProductCard.tsx says: "Added!" (text) and "Added to cart" (aria-label)
        await product.getByRole('button', { name: /added/i }).waitFor({ state: 'visible' });

        // 3. Wait for the button to return to the 'Add' state (idle)
        // This ensures the button is clickable again for the next test step
        // The component has a 2000ms timeout before reverting to idle
        await product.getByRole('button', { name: /add .* to cart/i }).waitFor({ state: 'visible', timeout: 5000 });
    }
}
