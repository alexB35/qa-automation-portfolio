import { Page, expect } from '@playwright/test';
import type { UserBase } from '../../data/user.base';
import type { PaymentData } from '../../data/payment.data';


export class CheckoutPage {
  constructor(private page: Page) {}

  readonly checkoutButton = () => this.page.locator('a', { hasText: 'Proceed To Checkout' });
  readonly placeOrderButton = () => this.page.locator('a', { hasText: 'Place Order' });

  readonly nameOnCardInput = () => this.page.locator('input[data-qa="name-on-card"]');
  readonly cardNumberInput = () => this.page.locator('input[data-qa="card-number"]');
  readonly cvcInput = () => this.page.locator('input[data-qa="cvc"]');
  readonly expiryMonthInput = () => this.page.locator('input[data-qa="expiry-month"]');
  readonly expiryYearInput = () => this.page.locator('input[data-qa="expiry-year"]');
  readonly payButton = () => this.page.locator('button[data-qa="pay-button"]');

  readonly deliveryAddress = () => this.page.locator('#address_delivery');
  readonly billingAddress = () => this.page.locator('#address_invoice');

  async proceedToCheckout() {
    await this.checkoutButton().click();
  }

  async verifyPurchase(user: UserBase, productName: string, quantity: string) {
    await expect(this.page.getByRole('heading', { name: 'Review Your Order' })).toBeVisible();
    for (const block of [this.deliveryAddress(), this.billingAddress()]) {
      await expect(block).toContainText(`${user.firstName} ${user.lastName}`);
      await expect(block).toContainText(user.address);
      await expect(block).toContainText(`${user.city} ${user.state} ${user.zipCode}`);
      await expect(block).toContainText(user.country);
      await expect(block).toContainText(user.phone);
    }
    await expect(this.page.getByText(productName)).toBeVisible();
    await expect(this.page.locator('.cart_quantity button')).toHaveText(quantity);
    await this.placeOrderButton().click();
  }
  
  async fillPayment(nameOnCard: string, card: PaymentData) {
    await this.nameOnCardInput().fill(nameOnCard);
    await this.cardNumberInput().fill(card.cardNumber);
    await this.cvcInput().fill(card.cvc);
    await this.expiryMonthInput().fill(card.expiryMonth);
    await this.expiryYearInput().fill(card.expiryYear);
    await this.payButton().click();
  }
}