import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get proceedToCheckoutButton() { return this.page.locator('a', { hasText: 'Proceed To Checkout' }); }
  get cartTable() { return this.page.locator('table#cart_info_table'); }
  get emptyCartMessage() { return this.page.locator('span#empty_cart'); }

  
    // Delete button by product row ID (e.g. product-1, product-2)
  deleteProductButton = (productRowId: string) =>
    this.page.locator(`tr#${productRowId} a.cart_quantity_delete`);


    // Product row by name
  productRowByName = (productName: string) =>
    this.page.locator('#cart_info_table tbody tr').filter({ hasText: productName });
  

  async goto() {
    await this.page.goto('https://automationexercise.com/view_cart');
  }

  async verifyProductInCart(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
    await expect(this.cartTable).toBeVisible();
  }

  async removeProduct(productName: string) {
    await this.page.locator('td.cart_delete')
      .filter({ has: this.page.locator(`text=${productName}`) })
      .locator('a').click();
  }

  async removeProductByRowId(productRowId: string) {
  await this.deleteProductButton(productRowId).click();
  await this.page.locator(`tr#${productRowId}`).waitFor({ state: 'detached' });
}

  async removeProductByName(productName: string) {
    const row = this.productRowByName(productName);
    await row.locator('a.cart_quantity_delete').click();
    await row.waitFor({ state: 'detached' });
  }

  async verifyCartEmpty() {
    await expect(this.page.getByText('Cart is empty!')).toBeVisible();
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }

  async verifyCartHasItems() {
    await expect(this.cartTable.locator('tbody tr')).not.toHaveCount(0);
  }
}