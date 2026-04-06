import { cartBadge, cartLink } from '../locators/inventoryPage.locators';

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

  async goToCart() {
    await this.cartLink.click();
  }
}

export default InventoryPage;