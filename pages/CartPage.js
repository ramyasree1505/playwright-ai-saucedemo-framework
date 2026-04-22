const cartLocators = require('../locators/cartPage.locators');

class CartPage {
  constructor(page) {
    this.page = page;

    // Initialize locators using the cartLocators object
    this.cartItems = page.locator(cartLocators.cartItems);
    this.itemNames = page.locator(cartLocators.itemNamesInCart);
    this.summaryItemPrices = page.locator(cartLocators.summaryItemPrices);
    this.itemQuantities = page.locator(cartLocators.itemQuantities);
    this.removeButtons = page.locator(cartLocators.removeButtons);
    this.continueShoppingButton = page.locator(cartLocators.continueShoppingButton);
    this.checkoutButton = page.locator(cartLocators.checkoutButton);
  }

  async goto() {
    await this.page.goto('/cart');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getItemNames() {
    return await this.itemNames.allTextContents();
  }

  async getItemTotalPrice() {
    const price = await this.summaryItemPrices.textContent();
    return parseFloat(price.replace('Item total: $', ''));
  }

  async getItemQuantities() {
    const quantities = await this.itemQuantities.allTextContents();
    return quantities.map(qty => parseInt(qty, 10));
  }

  async removeItem(itemName) {
    // Find the cart item that matches the given itemName and click its remove button
    const item = this.page.locator(cartLocators.cartItems).filter({
      hasText: itemName
    });

    await item.locator('button').click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async fillCheckoutDetails({ firstName, lastName, zip }) {
    
    // Implementation for filling checkout details
    await this.page.getByPlaceholder(cartLocators.firstNameInput).fill(firstName);
    await this.page.getByPlaceholder(cartLocators.lastNameInput).fill(lastName);
    await this.page.getByPlaceholder(cartLocators.zipInput).fill(zip);
  }

}

module.exports = CartPage;