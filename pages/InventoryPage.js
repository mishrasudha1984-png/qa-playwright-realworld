class InventoryPage {

    constructor(page) {
        this.page = page;

        this.productsTitle = page.getByText('Products');

        this.backpack = page.locator(
            '[data-test="add-to-cart-sauce-labs-backpack"]'
        );

        this.cartButton = page.getByRole('button', {
    name: /Cart, 1 items/i
});
    }

    async addBackpackToCart() {
        await this.backpack.click();
    }
async openCart() {
    await this.cartButton.click();
}
  
}

module.exports = { InventoryPage };