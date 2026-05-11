import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  addToCartButton = () =>
    this.page.locator('button[data-qa="summer-white-top-view-product-button"]');

  addModalButton = () =>
    this.page.locator('button[data-qa="add-to-cart-button"]');

  checkoutButton = () =>
    this.page.locator('button[data-qa="checkout-button"]');

  payButton = () =>
    this.page.locator('button[data-qa="pay_and_confirm_order-button"]');

  async addProductToCart() {
    await this.addToCartButton().click();
    await this.addModalButton().click();
  }

  async proceedToCheckout() {
    await this.checkoutButton().click();
  }

  async fillPayment(user: any) {
    await this.page.fill('[data-qa="name_on_card"]', `${user.firstName} ${user.lastName}`);
    await this.page.fill('[data-qa="card_number"]', '4111111111111111');
    await this.page.fill('[data-qa="cvc"]', '123');
    await this.page.fill('[data-qa="expiration_date"]', '12/2027');
    await this.payButton().click();
  }
}