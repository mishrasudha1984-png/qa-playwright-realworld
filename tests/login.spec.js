const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { users } = require('../test-data/users');

test('Verify successful login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    //await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.login(
    users.standard.username,
    users.standard.password
);

    await expect(page).toHaveURL(/inventory/);
});

test('Verify login fails with invalid password', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    //await loginPage.login('standard_user', 'wrong_password');
    await loginPage.login(
    users.invalid.username,
    users.invalid.password
);

    await expect(loginPage.loginError).toBeVisible();
});

test('Verify locked-out user cannot login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    //await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.login(
    users.lockedOut.username,
    users.lockedOut.password
);

    await expect(loginPage.lockedOutError).toBeVisible();
});