const { test, expect } = require('../../fixtures/login');
const InventoryPage = require('../../pages/InventoryPage').default;
const CartPage = require('../../pages/CartPage');
const { products } = require('../../testData/productsData');

test.describe('Cart Feature', () => {

  test('@regression | View empty cart', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    // Navigate to cart without adding items
    await inventoryPage.goToCart();

    // Verify cart is empty
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
  });

  test('@regression | Add single item and view in cart', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    // Add item to cart
    await inventoryPage.addItemToCart(products.backpack);

    // Navigate to cart
    await inventoryPage.goToCart();

    // Verify item is in cart
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain(products.backpack);

    const quantities = await cartPage.getItemQuantities();
    expect(quantities[0]).toBe(1);
  });

  test('@regression | Add multiple items and view in cart', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    // Add multiple items to cart
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.bikeLight);

    // Navigate to cart
    await inventoryPage.goToCart();

    // Verify items are in cart
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);

    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain(products.backpack);
    expect(itemNames).toContain(products.bikeLight);

    const quantities = await cartPage.getItemQuantities();
    expect(quantities.every(qty => qty === 1)).toBe(true);
  });

  test('@regression | Remove item from cart', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    // Add items to cart
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.addItemToCart(products.bikeLight);

    // Navigate to cart
    await inventoryPage.goToCart();

    // Verify both items are present
    let itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);

    // Remove one item
    await cartPage.removeItem(products.backpack);

    // Verify only one item remains
    itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    const itemNames = await cartPage.getItemNames();
    expect(itemNames).not.toContain(products.backpack);
    expect(itemNames).toContain(products.bikeLight);
  });

  test('@regression | Continue shopping from cart', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    // Add item to cart
    await inventoryPage.addItemToCart(products.backpack);

    // Navigate to cart
    await inventoryPage.goToCart();

    // Verify item is in cart
    let itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    // Continue shopping
    await cartPage.continueShopping();

    // Verify we're back on inventory page
    await expect(loggedInPage).toHaveURL(/.*inventory/);

    // Verify cart still has the item
    const cartBadgeCount = await inventoryPage.getCartBadgeCount();
    expect(cartBadgeCount).toBe(1);
  });

  test('@regression | Cart persists after page refresh', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    // Add item to cart
    await inventoryPage.addItemToCart(products.backpack);

    // Navigate to cart
    await inventoryPage.goToCart();

    // Verify item is in cart
    let itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    // Refresh the page
    await loggedInPage.reload();

    // Verify item is still in cart after refresh
    itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);

    const itemNames = await cartPage.getItemNames();
    expect(itemNames).toContain(products.backpack);
  });

  test('@regression | Checkout navigation', async ({ loggedInPage }) => {
    const inventoryPage = new InventoryPage(loggedInPage);
    const cartPage = new CartPage(loggedInPage);

    // Add item to cart
    await inventoryPage.addItemToCart(products.backpack);

    // Navigate to cart
    await inventoryPage.goToCart();

    // Click checkout
    await cartPage.checkout();

    // Verify navigation to checkout page
    await expect(loggedInPage).toHaveURL(/.*checkout/);
  });

});