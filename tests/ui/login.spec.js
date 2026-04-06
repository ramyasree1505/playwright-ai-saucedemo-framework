const { test, expect } = require('../../fixtures/login');
const { users } = require('../../testData/userData');

/*
Test Cases for Login Page (www.saucedemo.com):

Positive Scenarios:
1. Login with valid standard user credentials (problem_user/secret_sauce) - should redirect to inventory page
2. Login with valid admin user credentials (standard_user/secret_sauce) - should redirect to inventory page

Negative Scenarios:
1. Login with invalid username and wrong password - should display error message
2. Login with valid username but wrong password - should display error message
*/

// Test suite for login functionality.
test.describe('@smoke Login Feature', () => {

    // Positive - problem_user
    test('Login with problem user credentials', async ({ loginPage, page }) => {

        await loginPage.login(users.problem.username,users.problem.password);
        await expect(page).toHaveURL(/inventory/);
    });

    // Positive - standard_user
    test('Login with standard user credentials', async ({ loginPage, page }) => {

        await loginPage.login(users.standard.username,users.standard.password);
        await expect(page).toHaveURL(/inventory/);
    });

    // Negative - invalid username + wrong password
    test('Login with invalid username and password', async ({ loginPage }) => {

        await loginPage.login(users.invalid.username,users.invalid.password);
        await expect(await loginPage.getErrorLocator()).toContainText('Epic sadface: Username and password do not match any user in this service');
    });

    // Negative - valid username + wrong password
    test('Login with valid username and wrong password', async ({ loginPage }) => {

        await loginPage.login(users.standard.username,users.invalid.password);
        await expect(await loginPage.getErrorLocator()).toContainText('Epic sadface: Username and password do not match any user in this service');
    });
});