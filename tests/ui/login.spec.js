const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const { users } = require('../../utils/testData');

// Test suite for login functionality.
test.describe('Login Feature', () => {

    // Test case for successful login with valid credentials.
    test('login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await expect(page).toHaveURL(/inventory/);
    });

    // Test case for unsuccessful login with invalid credentials.
    test('login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('invalid_user', 'wrong_password');
        await expect(page.locator('.error-message-container')).toBeVisible();
    });
});