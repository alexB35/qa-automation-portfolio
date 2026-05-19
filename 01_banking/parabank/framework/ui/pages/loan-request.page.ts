import { type Page, type Locator, expect } from '@playwright/test';
import { URLS } from '../../../resources/urls';

export class LoanRequestPage {
  readonly page:             Page;
  readonly loanAmountInput:  Locator;
  readonly downPaymentInput: Locator;
  readonly fromAccountSelect: Locator;
  readonly applyButton:      Locator;

  constructor(page: Page) {
    this.page              = page;
    this.loanAmountInput   = page.locator('input[id="amount"]');
    this.downPaymentInput  = page.locator('input[id="downPayment"]');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.applyButton       = page.getByRole('button', { name: 'Apply Now' });
  }

  async goto() {
    await this.page.goto(URLS.requestLoanUrl);
  }

  async selectFirstAccount() {
    await this.fromAccountSelect.locator('option').first().waitFor({ state: 'attached' });
    const firstOption = await this.fromAccountSelect.locator('option').first().getAttribute('value');
    await this.fromAccountSelect.selectOption(firstOption!);
  }

  async applyForLoan(loanAmount: string, downPayment: string) {
    if (loanAmount) await this.loanAmountInput.fill(loanAmount);
    await this.downPaymentInput.fill(downPayment);
    await this.selectFirstAccount();
    await this.applyButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectApproved() {
    await expect(this.page.getByText('Loan Request Processed')).toBeVisible();
    await expect(this.page.locator('#loanStatus')).toHaveText('Approved');
    await expect(this.page.getByText('Congratulations, your loan has been approved.')).toBeVisible();
    await expect(this.page.locator('#newAccountId')).toBeVisible();
  }

  async expectDenied() {
    await expect(this.page.getByText('Loan Request Processed')).toBeVisible();
    await expect(this.page.locator('#loanStatus')).toHaveText('Denied');
    await expect(this.page.getByText('We cannot grant a loan in that amount with your available funds.')).toBeVisible();
  }

  async expectInternalError() {
    await expect(this.page.getByText('An internal error has occurred and has been logged.')).toBeVisible();
  }
}