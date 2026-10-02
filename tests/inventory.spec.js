const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Verify user can complete backpack purchase', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    await page.goto('/inventory.html');

    await expect(inventoryPage.productsTitle).toBeVisible();



    await inventoryPage.addBackpackToCart();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await inventoryPage.openCart();

    await expect(cartPage.cartTitle).toBeVisible();

    await expect(cartPage.backpackItem).toBeVisible();
await cartPage.clickCheckout();

await expect(checkoutPage.checkoutTitle).toBeVisible();

await checkoutPage.enterCustomerInformation(
    'Sudha',
    'Dubey',
    '75002'
);

await checkoutPage.clickContinue();

await checkoutPage.clickFinish();

await expect(checkoutPage.orderConfirmation).toBeVisible();

});