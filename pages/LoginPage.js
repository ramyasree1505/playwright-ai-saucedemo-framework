const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async loginAndSaveSession(user, isValid = true) {
    await this.goto();
    await this.login(user.username, user.password);

    if (isValid) {
      await expect(this.page).toHaveURL(/inventory/);
      await this.page.context().storageState({
        path: user.storage
      });
    } else {
      // For invalid login, check for error message
      await expect(this.page.locator('[data-test="error"]')).toBeVisible();
    }
  }
}

module.exports = LoginPage;