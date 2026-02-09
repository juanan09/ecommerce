import { test, expect } from '@playwright/test';
import { ProductCatalogPage } from './pages/ProductCatalogPage';

test.describe('Visual Regression Tests', () => {
    let productCatalog: ProductCatalogPage;

    test.beforeEach(async ({ page }) => {
        productCatalog = new ProductCatalogPage(page);

        // Navigate to the page
        await productCatalog.goto();

        // Clear localStorage to ensure consistent state
        await page.evaluate(() => localStorage.clear());
        await page.reload();

        // Wait for the page to be fully loaded
        await page.waitForLoadState('networkidle');
    });

    test('should match homepage with product catalog', async ({ page }) => {
        // Wait for product cards to be visible
        await expect(productCatalog.productCards.first()).toBeVisible();

        // Take a screenshot of the entire page
        await expect(page).toHaveScreenshot('homepage-catalog.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.05, // 5% threshold
        });
    });

    test('should match cart with items', async ({ page }) => {
        // Add some products to the cart
        await productCatalog.addToCart('Wireless Headphones');
        await productCatalog.addToCart('Smartwatch Series 5');
        await productCatalog.addToCart('Ergonomic Laptop Stand');

        // Wait for cart to update
        await page.waitForTimeout(500);

        // Take a screenshot of the entire page with cart items
        await expect(page).toHaveScreenshot('cart-with-items.png', {
            fullPage: true,
            maxDiffPixelRatio: 0.05, // 5% threshold
        });
    });

    test('should match empty cart state', async ({ page }) => {
        // Cart should be empty after clearing localStorage
        // Take a screenshot of just the cart area
        const cartSection = page.locator('.lg\\:w-1\\/3');
        await expect(cartSection).toBeVisible();

        await expect(cartSection).toHaveScreenshot('empty-cart.png', {
            maxDiffPixelRatio: 0.05, // 5% threshold
        });
    });

    test('should match cart with bulk discount', async ({ page }) => {
        // Add 5 items to trigger bulk discount
        await productCatalog.addToCart('Wireless Headphones');
        await productCatalog.addToCart('Wireless Headphones');
        await productCatalog.addToCart('Wireless Headphones');
        await productCatalog.addToCart('Wireless Headphones');
        await productCatalog.addToCart('Wireless Headphones');

        // Wait for cart to update
        await page.waitForTimeout(500);

        // Take a screenshot of the cart summary section
        const cartSection = page.locator('.lg\\:w-1\\/3');
        await expect(cartSection).toBeVisible();

        await expect(cartSection).toHaveScreenshot('cart-with-bulk-discount.png', {
            maxDiffPixelRatio: 0.05, // 5% threshold
        });
    });

    test('should match product card hover state', async ({ page }) => {
        // Get the first product card
        const firstProduct = productCatalog.productCards.first();
        await expect(firstProduct).toBeVisible();

        // Hover over the product card
        await firstProduct.hover();

        // Wait for hover animations to complete
        await page.waitForTimeout(300);

        // Take a screenshot of the hovered product card
        await expect(firstProduct).toHaveScreenshot('product-card-hover.png', {
            maxDiffPixelRatio: 0.05, // 5% threshold
        });
    });
});
