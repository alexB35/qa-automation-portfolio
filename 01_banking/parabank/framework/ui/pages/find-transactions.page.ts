import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';

export class FindTransactionsPage {
  readonly page:              Page;
  readonly accountSelect:     Locator;
  readonly fromDateInput:     Locator;
  readonly toDateInput:       Locator;
  readonly transactionIdInput: Locator;

  constructor(page: Page) {
    this.page               = page;
    this.accountSelect      = page.locator('#accountId');
    this.fromDateInput      = page.locator('input[id="criteria.fromDate"]');
    this.toDateInput        = page.locator('input[id="criteria.toDate"]');
    this.transactionIdInput = page.locator('input[id="criteria.transactionId"]');
  }

  async goto() {
    await this.page.goto(URLS.findTransactionsUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async selectFirstAccount() {
    await this.page.waitForLoadState('networkidle');
    await this.accountSelect.locator('option').first().waitFor({ state: 'attached' });
    const firstOption = await this.accountSelect.locator('option').first().getAttribute('value');
    await this.accountSelect.selectOption(firstOption!);
  }

  async searchByDateRange(from: string, to: string) {
    await this.fromDateInput.fill(from);
    await this.toDateInput.fill(to);
    await this.page.locator('#byDateRange').getByRole('button', { name: 'Find Transactions' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchById(id: string) {
    await this.transactionIdInput.fill(id);
    await this.page.locator('#byId').getByRole('button', { name: 'Find Transactions' }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectResultsTable() {
    await expect(this.page.getByText('Transaction Results')).toBeVisible({ timeout: 10_000 });
    await expect(this.page.locator('table.table thead')).toBeVisible();
    await expect(this.page.getByText('Date')).toBeVisible();
    await expect(this.page.getByText('Transaction')).toBeVisible();
    await expect(this.page.getByText('Debit (-)')).toBeVisible();
    await expect(this.page.getByText('Credit (+)')).toBeVisible();
  }

  async expectEmptyResults() {
    await expect(this.page.getByText('Transaction Results')).toBeVisible({ timeout: 10_000 });
    await expect(this.page.locator('table.table tbody tr')).toHaveCount(0);
  }

  async expectError(message: string) {
    await expect(this.page.getByText(message)).toBeVisible({ timeout: 10_000 });
  }
}