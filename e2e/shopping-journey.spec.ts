import { test, expect } from '@playwright/test';
import { ProductCatalogPage } from './pages/ProductCatalogPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';

test.describe('Shopping Journey', () => {
    let productCatalog: ProductCatalogPage;
    let shoppingCart: ShoppingCartPage;

    test.beforeEach(async ({ page }) => {
        productCatalog = new ProductCatalogPage(page);
        shoppingCart = new ShoppingCartPage(page);

        // Navigate to the page first
        await productCatalog.goto();

        // Clear localStorage AFTER navigation to ensure the app is loaded
        await page.evaluate(() => localStorage.clear());

        // Reload to apply the cleared state
        await page.reload();
    });

    test('should show empty cart initially', async ({ page }) => {
        // Verify the empty cart message is visible
        await expect(shoppingCart.emptyMessage).toBeVisible();

        // Verify no cart items are present
        await expect(shoppingCart.cartItems).toHaveCount(0);

        // Verify checkout button is not visible when cart is empty
        await expect(shoppingCart.checkoutButton).not.toBeVisible();
    });

    test('should add a product to the cart', async ({ page }) => {
        // Add a product to the cart
        await productCatalog.addToCart('Wireless Headphones');

        // Verify the product appears in the cart
        const cartItem = shoppingCart.getCartItem('Wireless Headphones');
        await expect(cartItem).toBeVisible();

        // Verify the quantity is 1
        const quantity = await shoppingCart.getItemQuantity('Wireless Headphones');
        expect(quantity).toBe(1);

        // Verify the empty message is no longer visible
        await expect(shoppingCart.emptyMessage).not.toBeVisible();

        // Verify checkout button is now visible
        await expect(shoppingCart.checkoutButton).toBeVisible();
    });

    test('should increment quantity when adding the same product twice', async ({ page }) => {
        // Add the same product twice
        await productCatalog.addToCart('Smartwatch Series 5');
        await productCatalog.addToCart('Smartwatch Series 5');

        // Verify only one cart item exists
        await expect(shoppingCart.cartItems).toHaveCount(1);

        // Verify the quantity is 2
        const quantity = await shoppingCart.getItemQuantity('Smartwatch Series 5');
        expect(quantity).toBe(2);
    });

    test('should increment and decrement item quantity using +/- buttons', async ({ page }) => {
        // Add a product
        await productCatalog.addToCart('Ergonomic Laptop Stand');

        // Verify initial quantity
        let quantity = await shoppingCart.getItemQuantity('Ergonomic Laptop Stand');
        expect(quantity).toBe(1);

        // Increment quantity
        await shoppingCart.incrementItem('Ergonomic Laptop Stand');
        quantity = await shoppingCart.getItemQuantity('Ergonomic Laptop Stand');
        expect(quantity).toBe(2);

        // Increment again
        await shoppingCart.incrementItem('Ergonomic Laptop Stand');
        quantity = await shoppingCart.getItemQuantity('Ergonomic Laptop Stand');
        expect(quantity).toBe(3);

        // Decrement quantity
        await shoppingCart.decrementItem('Ergonomic Laptop Stand');
        quantity = await shoppingCart.getItemQuantity('Ergonomic Laptop Stand');
        expect(quantity).toBe(2);
    });

    test('should remove item from cart using remove button', async ({ page }) => {
        // Add two different products
        await productCatalog.addToCart('Mechanical Gaming Keyboard');
        await productCatalog.addToCart('7-in-1 USB-C Hub');

        // Verify both items are in the cart
        await expect(shoppingCart.cartItems).toHaveCount(2);

        // Remove one item
        await shoppingCart.removeItem('Mechanical Gaming Keyboard');

        // Verify only one item remains
        await expect(shoppingCart.cartItems).toHaveCount(1);

        // Verify the correct item was removed
        await expect(shoppingCart.getCartItem('Mechanical Gaming Keyboard')).not.toBeVisible();
        await expect(shoppingCart.getCartItem('7-in-1 USB-C Hub')).toBeVisible();
    });

    test('should remove item using remove button', async ({ page }) => {
        // Add a product
        await productCatalog.addToCart('1080p Streaming Webcam');

        // Verify item is in cart
        await expect(shoppingCart.getCartItem('1080p Streaming Webcam')).toBeVisible();

        // Remove the item using the remove button (decrement is disabled at quantity 1)
        await shoppingCart.removeItem('1080p Streaming Webcam');

        // Verify item is removed
        await expect(shoppingCart.getCartItem('1080p Streaming Webcam')).not.toBeVisible();

        // Verify cart is empty
        await expect(shoppingCart.emptyMessage).toBeVisible();
    });

    test('should apply bulk discount when 5 or more items are in cart', async ({ page }) => {
        // Add 5 items of the same product
        await productCatalog.addToCart('Wireless Headphones');
        await productCatalog.addToCart('Wireless Headphones');
        await productCatalog.addToCart('Wireless Headphones');
        await productCatalog.addToCart('Wireless Headphones');
        await productCatalog.addToCart('Wireless Headphones');

        // Verify quantity is 5
        const quantity = await shoppingCart.getItemQuantity('Wireless Headphones');
        expect(quantity).toBe(5);

        // Verify discounts are applied
        // Subtotal: $129.99 * 5 = $649.95
        // The app applies both bulk discount (10%) and order discount (15% for orders > $100)
        // Total should be significantly less than subtotal
        const totalText = await shoppingCart.total.textContent();
        const subtotalText = await shoppingCart.subtotal.textContent();

        expect(totalText).toContain('$');
        expect(subtotalText).toContain('$649.95');

        const totalValue = Number.parseFloat(totalText?.replace('$', '') || '0');
        const subtotalValue = Number.parseFloat(subtotalText?.replace('$', '') || '0');

        // Total should be less than subtotal due to discounts
        expect(totalValue).toBeLessThan(subtotalValue);
        // With both discounts applied, total should be around $497
        expect(totalValue).toBeGreaterThan(450);
        expect(totalValue).toBeLessThan(550);
    });

    test('should calculate correct totals with multiple items', async ({ page }) => {
        // Add multiple different products
        // Wireless Headphones: $129.99
        await productCatalog.addToCart('Wireless Headphones');

        // Smartwatch Series 5: $199.99
        await productCatalog.addToCart('Smartwatch Series 5');

        // Ergonomic Laptop Stand: $45.99
        await productCatalog.addToCart('Ergonomic Laptop Stand');

        // Expected subtotal: $129.99 + $199.99 + $45.99 = $375.97
        const subtotalText = await shoppingCart.subtotal.textContent();
        expect(subtotalText).toContain('$375.97');

        // The app applies an order discount (15% for orders > $100)
        // So total will be less than subtotal
        const totalText = await shoppingCart.total.textContent();
        const totalValue = Number.parseFloat(totalText?.replace('$', '') || '0');
        const subtotalValue = Number.parseFloat(subtotalText?.replace('$', '') || '0');

        // Total should be less than subtotal due to order discount
        expect(totalValue).toBeLessThan(subtotalValue);
        // With 15% order discount: $375.97 - $56.40 = $319.57
        expect(totalValue).toBeGreaterThan(300);
        expect(totalValue).toBeLessThan(350);
    });

    test('should persist cart after page refresh', async ({ page }) => {
        // Add products to cart
        await productCatalog.addToCart('Mechanical Gaming Keyboard');
        await productCatalog.addToCart('7-in-1 USB-C Hub');
        await shoppingCart.incrementItem('7-in-1 USB-C Hub');

        // Verify initial state
        await expect(shoppingCart.cartItems).toHaveCount(2);
        let quantity = await shoppingCart.getItemQuantity('7-in-1 USB-C Hub');
        expect(quantity).toBe(2);

        // Refresh the page
        await page.reload();

        // Verify cart persisted
        await expect(shoppingCart.cartItems).toHaveCount(2);
        await expect(shoppingCart.getCartItem('Mechanical Gaming Keyboard')).toBeVisible();
        await expect(shoppingCart.getCartItem('7-in-1 USB-C Hub')).toBeVisible();

        // Verify quantity persisted
        quantity = await shoppingCart.getItemQuantity('7-in-1 USB-C Hub');
        expect(quantity).toBe(2);
    });

    test('should handle adding all products to cart', async ({ page }) => {
        // Add all 6 products
        await productCatalog.addToCart('Wireless Headphones');
        await productCatalog.addToCart('Smartwatch Series 5');
        await productCatalog.addToCart('Ergonomic Laptop Stand');
        await productCatalog.addToCart('Mechanical Gaming Keyboard');
        await productCatalog.addToCart('7-in-1 USB-C Hub');
        await productCatalog.addToCart('1080p Streaming Webcam');

        // Verify all items are in cart
        await expect(shoppingCart.cartItems).toHaveCount(6);

        // Verify each product appears
        await expect(shoppingCart.getCartItem('Wireless Headphones')).toBeVisible();
        await expect(shoppingCart.getCartItem('Smartwatch Series 5')).toBeVisible();
        await expect(shoppingCart.getCartItem('Ergonomic Laptop Stand')).toBeVisible();
        await expect(shoppingCart.getCartItem('Mechanical Gaming Keyboard')).toBeVisible();
        await expect(shoppingCart.getCartItem('7-in-1 USB-C Hub')).toBeVisible();
        await expect(shoppingCart.getCartItem('1080p Streaming Webcam')).toBeVisible();

        // Verify discounts are applied
        // Sum of all products: $129.99 + $199.99 + $45.99 + $89.99 + $39.99 + $59.99 = $565.94
        // The app applies both bulk discount (10% for 5+ items) and order discount (15% for orders > $100)
        const totalText = await shoppingCart.total.textContent();
        const subtotalText = await shoppingCart.subtotal.textContent();

        expect(subtotalText).toContain('$565.94');

        const totalValue = Number.parseFloat(totalText?.replace('$', '') || '0');
        const subtotalValue = Number.parseFloat(subtotalText?.replace('$', '') || '0');

        // Total should be significantly less than subtotal due to both discounts
        expect(totalValue).toBeLessThan(subtotalValue);
        // With both discounts, total should be around $481
        expect(totalValue).toBeGreaterThan(450);
        expect(totalValue).toBeLessThan(500);
    });
});
