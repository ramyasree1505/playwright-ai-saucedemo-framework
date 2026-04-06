const { test, expect } = require('../../fixtures/roles.fixture');
const InventoryPage = require('../../pages/InventoryPage');

test.describe('Cart Feature', () => {

  let inventoryPage;

  test.beforeEach(async ({ authPage }) => {
    inventoryPage = new InventoryPage(authPage);
  });

  test('@user | Add item to cart', async ({ testData, roleCheck }, testInfo) => {

    await testInfo.attach('log', {
      body: 'Starting test: Add item to cart',
      contentType: 'text/plain'
    });

    await test.step('Add item to cart', async () => {
      await inventoryPage.addItemToCart(testData.product);
    });

    await test.step('Validate cart count is 1', async () => {
      const count = await inventoryPage.getCartBadgeCount();
      expect(count).toBe(1);
    });

  });

  test('@admin | Add and Remove item from cart', async ({ testData, roleCheck }, testInfo) => {

    await testInfo.attach('log', {
      body: 'Starting test: Add and Remove item',
      contentType: 'text/plain'
    });

    await test.step('Add item to cart', async () => {
      await inventoryPage.addItemToCart(testData.product);
    });

    await test.step('Validate cart count is 1', async () => {
      const count = await inventoryPage.getCartBadgeCount();
      expect(count).toBe(1);
    });

    await test.step('Remove item from cart', async () => {
      await inventoryPage.removeItemFromCart(testData.product);
    });

    await test.step('Validate cart is empty', async () => {
      const updatedCount = await inventoryPage.getCartBadgeCount();
      expect(updatedCount).toBe(0);
    });

  });

});