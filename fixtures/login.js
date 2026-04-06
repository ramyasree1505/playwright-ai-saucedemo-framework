const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const { users } = require('../testData/userData');

exports.test = base.test.extend({

  // Base fixture for login page
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Reuse loginPage here to perform login and provide loggedInPage for tests
  loggedInPage: async ({ loginPage }, use) => {
    await loginPage.login(users.standard.username,users.standard.password);
    await use(loginPage.page);
  }

});

exports.expect = base.expect;