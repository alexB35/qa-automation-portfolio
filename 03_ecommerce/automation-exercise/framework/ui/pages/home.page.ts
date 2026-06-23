import { Page, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';

export class HomePage {
  constructor(private page: Page) {}
  
  readonly searchInput = () => this.page.locator('input#search_product');
  readonly searchButton = () => this.page.locator('button#submit_search');
  readonly subscriptionEmailInput = () => this.page.locator('input#susbscribe_email');
  readonly subscriptionButton = () => this.page.locator('button#subscribe');

  
  async goto() {
    await this.page.goto(URLS.homeUrl);
  }

  async searchProduct(term: string) {
    await this.searchInput().fill(term);
    await this.searchButton().click();
    await expect(this.page.getByText('Searched Products')).toBeVisible();
  }

  async filterByCategory(category: string, subCategory: string) {
    await this.page.getByText(category).click();
    await this.page.getByRole('link', { name: subCategory }).click();
  }

  async filterByBrand(brand: string) {
    await this.page.getByRole('link', { name: brand }).click();
  }

  async subscribeToNewsletter(email: string) {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.subscriptionEmailInput().fill(email);
    await this.subscriptionButton().click();
    await expect(this.page.getByText('You have been successfully subscribed!')).toBeVisible();
  }
}