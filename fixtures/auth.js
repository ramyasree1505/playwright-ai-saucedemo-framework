const base = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

// Define a fixture for the login page
exports.test = base.test.extend({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        
        // Navigate to the login page and perform login before using the page in tests
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        await use(page);
    }
});

exports.expect = base.expect;