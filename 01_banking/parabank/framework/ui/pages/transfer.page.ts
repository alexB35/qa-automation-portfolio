import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';
import { selectFromAndToAccounts } from '../helpers/account-selector.helper';

export class TransferPage {
  readonly page:          Page;
  readonly amountInput:   Locator;
  readonly transferButton: Locator;

  constructor(page: Page) {
    this.page           = page;
    this.amountInput    = page.locator('#amount');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
  }

  async goto() {
    await this.page.goto(URLS.transferUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async transfer(amount: string) {
    await this.amountInput.fill(amount);
    await selectFromAndToAccounts(this.page);
    await this.transferButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectSuccess() {
    await expect(this.page.getByText('Transfer Complete!')).toHaveCount(1);
    await expect(this.page.getByText('has been transferred from account')).toHaveCount(1);
  }

  async expectError(message: string) {
    await expect(this.page.getByText('Error!')).toHaveCount(1);
    await expect(this.page.getByText(message)).toHaveCount(1);
  }
}