import { expect, Page } from '@playwright/test';
import { URLS } from '../../../resources/urls';
import { dismissGDPR } from '../../ui/helpers/ui-helpers';

export class LoginPage {
  constructor(private page: Page) {}

  readonly emailInput = () => this.page.locator('[data-qa="login-email"]');
  readonly passwordInput = () => this.page.locator('[data-qa="login-password"]');
  readonly loginButton = () => this.page.locator('[data-qa="login-button"]');

  async gotoLoginPage() {
    await this.page.goto(URLS.loginUrl);
    await dismissGDPR(this.page);
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