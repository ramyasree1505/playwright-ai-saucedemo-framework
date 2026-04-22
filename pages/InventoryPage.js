import { cartBadge, cartLink } from '../locators/inventoryPage.locators';
const cartLocators = require('../locators/cartPage.locators.js');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = page.locator(cartBadge);
    this.cartLink = page.locator(cartLink);
  }

  formatProductName(productName) {
    return productName.toLowerCase().replace(/ /g, '-');
  }

  addToCartButton(productName) {
    return this.page.locator(
      `#add-to-cart-${this.formatProductName(productName)}`
    );
  }

  removeFromCartButton(productName) {
    return this.page.locator(
      `#remove-${this.formatProductName(productName)}`
    );
  }

  // Single item addition for backward compatibility
  async addItemToCart(productName) {
    await this.addToCartButton(productName).click();
  }

  // For extensibility, we can add a method to add multiple items at once
  async addItemsToCart(productList) {
    for (const product of productList) {
      await this.addItemToCart(product);
    }
  }
  async removeItemFromCart(productName) {
    await this.removeFromCartButton(productName).click();
  }

  async getCartBadgeCount() {
    if (await this.cartBadge.count() === 0) return 0;
    return Number(await this.cartBadge.textContent());
  }
  
  async getItemPrice(productName) {
    const item = this.page.locator(cartLocators.totalItems, {has : this.page.locator(cartLocators.itemNames,
      { hasText: productName})
    });
    const priceText = await item.locator(cartLocators.itemPrice).textContent();
    return parseFloat(priceText.replace('$', ''));
  }

  async getTotalPrice(productList) {
    const prices = await Promise.all(
      productList.map(p => this.getItemPrice(p))
    );

    return +prices.reduce((sum, price) => sum + price, 0).toFixed(2);
  }
  
  async goToCart() {
    await this.cartLink.click();
  }
}

export default InventoryPage;