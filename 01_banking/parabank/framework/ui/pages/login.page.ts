import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton:   Locator;

  constructor(page: Page) {
    this.page          = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton   = page.locator('input[value="Log In"]');
  }

  async goto() {
    await this.page.goto(URLS.logoutUrl);
    await this.page.waitForLoadState('networkidle');
    await this.page.goto(URLS.indexUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async submitEmpty() {
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.page.getByRole('link', { name: 'Log Out' })).toBeVisible();
  }

  async expectLoginError(message: string) {
    await expect(this.page.getByText('Error!')).toHaveCount(1);
    await expect(this.page.getByText(message)).toHaveCount(1);
  }
}