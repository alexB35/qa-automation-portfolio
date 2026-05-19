import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';

export class OpenAccountPage {
  readonly page:             Page;
  readonly accountTypeSelect: Locator;
  readonly openButton:        Locator;
  readonly newAccountId:      Locator;

  constructor(page: Page) {
    this.page              = page;
    this.accountTypeSelect = page.locator('#type');
    this.openButton        = page.getByRole('button', { name: 'Open New Account' });
    this.newAccountId      = page.locator('#newAccountId');
  }

  async goto() {
    await this.page.goto(URLS.openAccountUrl);
  }

  async openAccount(type: '0' | '1' = '0') {
    await this.page.waitForLoadState('networkidle');
    await this.accountTypeSelect.selectOption(type); // 0 = CHECKING, 1 = SAVINGS
    await this.page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    await this.openButton.waitFor({ state: 'visible' });
    await this.openButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectSuccess() {
    await expect(this.page.getByText('Congratulations, your account is now open.')).toHaveCount(1);
    await expect(this.newAccountId).toHaveCount(1);
  }

  async getNewAccountId(): Promise<string> {
  await expect(this.newAccountId).not.toHaveText('');
  return (await this.newAccountId.textContent())?.trim() ?? '';
  }
}