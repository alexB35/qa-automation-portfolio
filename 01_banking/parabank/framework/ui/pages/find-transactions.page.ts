import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';

export class FindTransactionsPage {
  readonly page:              Page;
  readonly accountSelect:     Locator;
  readonly fromDateInput:     Locator;
  readonly toDateInput:       Locator;
  readonly transactionDateInput: Locator;
  readonly transactionIdInput: Locator;
  readonly amountInput:        Locator;

  constructor(page: Page) {
    this.page               = page;
    this.accountSelect      = page.locator('#accountId');
    this.fromDateInput      = page.locator('input[id="fromDate"]');
    this.toDateInput        = page.locator('input[id="toDate"]');
    this.transactionDateInput = page.locator('input[id="transactionDate"]');
    this.transactionIdInput = page.locator('input[id="transactionId"]');
    this.amountInput        = page.locator('input[id="amount"]');
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

  async searchByDate(id: string) {
    await this.transactionDateInput.fill(id);
    await this.page.locator('button[id="findById"]').waitFor({ state: 'visible' });
    await this.page.locator('button[id="findById"]').click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchByDateRange(from: string, to: string) {
    await this.fromDateInput.fill(from);
    await this.toDateInput.fill(to);
    await this.page.locator('button[id="findByDateRange"]').waitFor({ state: 'visible' });
    await this.page.locator('button[id="findByDateRange"]').click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchById(id: string) {
    await this.transactionIdInput.fill(id);
    await this.page.locator('button[id="findById"]').waitFor({ state: 'visible' });
    await this.page.locator('button[id="findById"]').click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchByAmount(amount: string) {
    await this.amountInput.fill(amount);
    await this.page.locator('button[id="findByAmount"]').waitFor({ state: 'visible' });
    await this.page.locator('button[id="findByAmount"]').click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectResultsTable() {
    await expect(this.page.getByText('Transaction Results')).toHaveCount(1);
    await expect(this.page.locator('table#transactionTable thead')).toHaveCount(1);
    await expect(this.page.locator('table#transactionTable thead').getByText('Date')).toHaveCount(1);
    await expect(this.page.locator('table#transactionTable thead').getByText('Transaction')).toHaveCount(1);
    await expect(this.page.locator('table#transactionTable thead').getByText('Debit (-)')).toHaveCount(1);
    await expect(this.page.locator('table#transactionTable thead').getByText('Credit (+)')).toHaveCount(1);
  }

  async expectEmptyResults() {
    await expect(this.page.getByText('Transaction Results')).toHaveCount(1);
    await expect(this.page.locator('table.table tbody tr')).toHaveCount(0);
  }

  async expectError(message: string) {
    await expect(this.page.getByText(message)).toHaveCount(1);
  }
}