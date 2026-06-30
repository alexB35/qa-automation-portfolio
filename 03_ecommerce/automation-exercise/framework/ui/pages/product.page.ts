import { Page, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';
import { dismissGDPR } from '../helpers/ui-helpers';

export class ProductPage {
  constructor(private page: Page) {}


readonly viewProductLink = (productId: number) => this.page.locator(`a[href="/product_details/${productId}"]`).first();

readonly productByName = (name: string) => this.page.locator('.single-products').filter({ hasText: name });

readonly quantityInput = () => this.page.locator('input#quantity');
readonly addToCartDetailButton = () => this.page.locator('button.btn.btn-default.cart');
readonly continueShoppingButton = () => this.page.getByRole('button', { name: 'Continue Shopping' });
readonly viewCartButton = () => this.page.getByRole('link', { name: 'View Cart' });

readonly reviewNameInput = () => this.page.locator('input#name');
readonly reviewEmailInput = () => this.page.locator('input#email');
readonly reviewTextarea = () => this.page.locator('textarea#review');
readonly reviewSubmitButton = () => this.page.locator('button#button-review');

readonly searchInput = () => this.page.locator('input#search_product');
readonly searchButton = () => this.page.locator('button#submit_search');
  

  async goto() {
    await this.page.goto(URLS.productUrl);
    await dismissGDPR(this.page);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async viewCartFromPopup() {
    await expect(this.page.getByText('Added!')).toBeVisible();
    await this.page.getByRole('link', { name: 'View Cart' }).click();
  }

  async viewProduct(productId: number) {
    const product = this.page.locator('.product-image-wrapper')
    .filter({ has: this.page.locator(`a[href="/product_details/${productId}"]`) });
    await product.hover();
    await this.viewProductLink(productId).waitFor({ state: 'visible' });
    await this.viewProductLink(productId).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addToCartFromList(productName: string) {
    await this.page.locator('.productinfo').filter({ hasText: productName })
      .getByText('Add to cart').click();
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async addToCartFromDetail(quantity: string, productId: number) {
    const product = this.page.locator('.product-image-wrapper')
      .filter({ has: this.page.locator(`a[href="/product_details/${productId}"]`) });
    await product.hover();
    await product.locator('a', { hasText: 'View Product' }).waitFor({ state: 'visible' });
    await product.locator('a', { hasText: 'View Product' }).click();
    await this.page.waitForLoadState('domcontentloaded');
    await this.quantityInput().fill(quantity);
    await this.addToCartDetailButton().click();
    await this.continueShoppingButton().click();
  }

  async searchProduct(term: string) {
    await this.searchInput().fill(term);
    await this.searchButton().click();
    await expect(this.page.getByText('Searched Products')).toBeVisible();
  }

  async filterByCategory(categoryAccordion: string, categoryId: number) {
    await this.page.locator(`a[href="#${categoryAccordion}"]`).click();
    await this.page.locator(`a[href="/category_products/${categoryId}"]`).waitFor({ state: 'visible' });
    await this.page.locator(`a[href="/category_products/${categoryId}"]`).click();
  }

  async filterByBrand(brandName: string) {
    await this.page.locator(`a[href="/brand_products/${brandName}"]`).click();
  }

  async writeReview(name: string, email: string, review: string) {
    await this.reviewNameInput().fill(name);
    await this.reviewEmailInput().fill(email);
    await this.reviewTextarea().fill(review);
    await this.reviewSubmitButton().click();
  }

  async verifySearchResults(term: string) {
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