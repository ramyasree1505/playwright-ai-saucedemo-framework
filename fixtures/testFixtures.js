const { test: base, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { users } = require('../utils/testData');

const test = base.extend({
  authPage: async ({ page }, use, testInfo) => {
    const loginPage = new LoginPage(page);
    await page.goto('/inventory.html');
    
    // Check if already on inventory (storage state loaded)
    if (page.url().includes('inventory')) {
      await use(page);
      return;
    }
    
    // If not, perform login based on project
    const projectName = testInfo.project.name;
    const user = projectName === 'admin' ? users.problem : users.standard;
    
    await loginPage.goto();
    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL(/inventory/);
    
    await use(page);
  }
});

module.exports = { test, expect };