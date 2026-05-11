import { Page, expect } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  // ── Product list page locators ────────────────────────────────────────
  
  // Add to cart from list — uses data-product-id attribute
  addToCartButton = (productId: number) =>
    this.page.locator(`a[data-product-id="${productId}"]`).first();
 
  
  // Add to cart from overlay (hover)
  addToCartOverlay = (productId: number) =>
    this.page.locator(`.product-overlay a[data-product-id="${productId}"]`);
 

  // View product link
  viewProductLink = (productId: number) =>
    this.page.locator(`a[href="/product_details/${productId}"]`).first();
 

  // Product container by name
  productByName = (name: string) =>
    this.page.locator('.single-products').filter({ hasText: name });
 

  // ── Product detail page locators ─────────────────────────────────────
  get quantityInput() { return this.page.locator('input#quantity'); }
  get addToCartDetailButton() { return this.page.locator('button.btn.btn-default.cart'); }
  get continueShoppingButton() { return this.page.getByRole('button', { name: 'Continue Shopping' }); }
  get viewCartButton() { return this.page.getByRole('link', { name: 'View Cart' }); }
 

  // ── Review form locators ──────────────────────────────────────────────
  get reviewNameInput() { return this.page.locator('input#name'); }
  get reviewEmailInput() { return this.page.locator('input#email'); }
  get reviewTextarea() { return this.page.locator('textarea#review'); }
  get reviewSubmitButton() { return this.page.locator('button#button-review'); } 
  


  // ── Methods ───────────────────────────────────────────────────────────

  async goto(productId?: number) {
    if (productId) {
      await this.page.goto(`https://automationexercise.com/product_details/${productId}`);
    } else {
      await this.page.goto('https://automationexercise.com/products');
    }
  }

  async addToCartFromList(productName: string) {
    await this.page.locator('.productinfo').filter({ hasText: productName })
      .getByText('Add to cart').click();
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async addToCartFromDetail(quantity?: string) {
    if (quantity) {
      await this.page.locator('input#quantity').fill(quantity);
    }
    await this.page.locator('button.cart').click();
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async writeReview(name: string, email: string, review: string) {
    await this.page.locator('input#name').fill(name);
    await this.page.locator('input#email').fill(email);
    await this.page.locator('textarea#review').fill(review);
    await this.page.locator('button#button-review').click();
    await expect(this.page.getByText('Thank you for your review.')).toBeVisible();
  }

  async verifySearchResults(term: string) {
    await expect(this.page.getByText('Searched Products')).toBeVisible();
    await expect(this.page.locator('.productinfo')).not.toHaveCount(0);
  }

  async verifyCategoryResults(categoryName: string) {
    await expect(this.page.getByText(categoryName)).toBeVisible();
    await expect(this.page.locator('.productinfo')).not.toHaveCount(0);
  }

  async verifyBrandResults(brandName: string) {
    await expect(this.page.getByText(`Brand - ${brandName} Products`)).toBeVisible();
    await expect(this.page.locator('.productinfo')).not.toHaveCount(0);
  }
}