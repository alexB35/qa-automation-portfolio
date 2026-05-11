import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  readonly emailInput = () => this.page.locator('[data-qa="login-email"]');
  readonly passwordInput = () => this.page.locator('[data-qa="login-password"]');
  readonly loginButton = () => this.page.locator('[data-qa="login-button"]');

  async goto() {
    await this.page.goto('https://automationexercise.com/login');
  }

  async login(email: string, password: string) {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async isLoggedIn(name: string) {
    await expect(this.page.getByText(`Logged in as ${name}`)).toBeVisible();
  }
}