class CartPage {

    constructor(page) {
        this.page = page;

        this.cartTitle = page.getByText('Your Cart');
        this.backpackItem = page.getByText('Sauce Labs Backpack');
        this.checkoutButton = page.getByRole('button', {
            name: 'Checkout'
        });
    }

    async verifyBackpack() {
        await this.backpackItem.isVisible();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };