const { expect } = require('@playwright/test');
const loginLocators = require('../locators/login.locators');

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.page.fill(loginLocators.username, username);
    await this.page.fill(loginLocators.password, password);
    await this.page.click(loginLocators.loginBtn);
  }
  
 async getErrorLocator() {
  return this.page.locator(loginLocators.errorMsg);
}

}

module.exports = LoginPage;