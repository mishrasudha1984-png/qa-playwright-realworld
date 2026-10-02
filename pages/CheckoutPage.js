class CheckoutPage {

    constructor(page) {
        this.page = page;

        this.checkoutTitle = page.getByText('Checkout: Your Information');

        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');

        this.continueButton = page.getByRole('button', {
            name: 'Continue'
        });

        this.finishButton = page.getByRole('button', {
            name: 'Finish'
        });

        this.orderConfirmation = page.getByText(
            'Thank you for your order!'
        );
    }

    async enterCustomerInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async clickFinish() {
        await this.finishButton.click();
    }
}

module.exports = { CheckoutPage };