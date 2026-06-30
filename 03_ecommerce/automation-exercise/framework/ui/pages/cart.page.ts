import { Page, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';

export class CartPage {
  constructor(private page: Page) {}

  readonly proceedToCheckoutButton = () => this.page.locator('a', { hasText: 'Proceed To Checkout' });
  readonly cartTable = () => this.page.locator('table#cart_info_table');
  readonly emptyCartMessage = () => this.page.locator('span#empty_cart');

  async goto() {
    await this.page.goto(URLS.cartUrl);
  }

  async verifyProductInCart(productName: string, quantity: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
    await expect(this.page.locator('.cart_quantity button')).toHaveText(quantity);
    await expect(this.cartTable()).toBeVisible();
  }

  async verifyProductQuantityAtLeast(productName: string, minQuantity: number) {
    await expect(this.page.getByText(productName)).toBeVisible();
    const quantity = Number(
      await this.page.locator('.cart_quantity button').textContent()
    );
    expect(quantity).toBeGreaterThanOrEqual(minQuantity);
    await expect(this.cartTable()).toBeVisible();
  }

  async removeProduct(productId: number) {
    await this.page.locator(`a.cart_quantity_delete[data-product-id="${productId}"]`).click();
    await this.page.locator(`tr#product-${productId}`).waitFor({ state: 'detached' });
  }

  async verifyCartHasItems() {
    await expect(this.cartTable().locator('tbody tr')).not.toHaveCount(0);
  }

  async verifyCartEmpty() {
    await expect(this.emptyCartMessage()).toBeVisible();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton().click();
  }
}