const { test, expect } = require('../../fixtures/login');
const { users } = require('../../testData/userData');
const InventoryPage = require('../../pages/InventoryPage').default;
const CartPage = require('../../pages/CartPage');
const checkout  = require('../../locators/checkoutPage.locators.js');
const cartThings = require('../../locators/cartPage.locators.js');
const { products } = require('../../testData/productsData');

// Test suite for login functionality.
test('@e2e | User completes checkout with multiple items', async ({ loggedInPage, page }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    const productList = [products.backpack, products.bikeLight];

    // Initial cart state validation
    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText(' ');

    // Add items
    await inventoryPage.addItemsToCart(productList);

    // Validate total before navigation
    const expectedTotal = await inventoryPage.getTotalPrice(productList);

    await inventoryPage.goToCart();

    // Cart validations
    await expect(await cartPage.getCartItemCount()).toBe(productList.length);

    // Validate item names in cart
    const names = await cartPage.getItemNames();
    expect(names).toEqual(expect.arrayContaining(productList));

    // Checkout
    await expect(page.locator(cartThings.checkoutButton)).toBeEnabled();
    await page.locator(cartThings.checkoutButton).click();

    await expect(page).toHaveURL(/checkout-step-one/);

    // Fill details
    await cartPage.fillCheckoutDetails({
        firstName: users.checkoutUser.firstName,
        lastName: users.checkoutUser.lastName,
        zip: users.checkoutUser.zip
    });

    await page.locator(checkout.continueButton).click();

    await expect(page).toHaveURL(/checkout-step-two/);

    // Price validation
    const actualTotal = await cartPage.getItemTotalPrice();
    expect(Number(actualTotal)).toBeCloseTo(Number(expectedTotal), 2);

    // Finish
    await page.locator(checkout.finishButton).click();

    // Final validation
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.locator(checkout.completeHeader)).toHaveText('Thank you for your order!');
});