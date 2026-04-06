const { expect } = require('@playwright/test');

class InventoryPage {
  constructor(page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
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

  async addItemToCart(productName) {
    await this.addToCartButton(productName).click();
  }

  async removeItemFromCart(productName) {
    await this.removeFromCartButton(productName).click();
  }

  async getCartBadgeCount() {
    if (await this.cartBadge.count() === 0) return 0;
    return Number(await this.cartBadge.textContent());
  }
}

module.exports = InventoryPage;