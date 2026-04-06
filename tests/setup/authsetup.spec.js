const { test } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const { users } = require('../../utils/testData');

test.describe('Auth Setup', () => {

  for (const role of Object.keys(users)) {

    test(`setup: login for ${role}`, async ({ page }) => {

      const loginPage = new LoginPage(page);

      await loginPage.loginAndSaveSession(users[role]);

    });

  }

});