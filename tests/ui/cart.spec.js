const { test, expect } = require('../../fixtures/login');
const InventoryPage = require('../../pages/InventoryPage');
const { products } = require('../../testData/productsData');

test.describe('Cart Feature', () => {

  test('@regression | Add item to cart', async ({ loggedInPage }) => {

    const inventoryPage = new InventoryPage(loggedInPage);

    await inventoryPage.addItemToCart(products.backpack);

    const count = await inventoryPage.getCartBadgeCount();
    expect(Number(count)).toBe(1);
  });

  test('@regression | Add and Remove item from cart', async ({ loggedInPage }) => {

    const inventoryPage = new InventoryPage(loggedInPage);

    await inventoryPage.addItemToCart(products.backpack);

    let count = await inventoryPage.getCartBadgeCount();
    expect(Number(count)).toBe(1);

    await inventoryPage.removeItemFromCart(products.backpack);

    const updatedCount = await inventoryPage.getCartBadgeCount();
    expect(Number(updatedCount)).toBe(0);
  });

});