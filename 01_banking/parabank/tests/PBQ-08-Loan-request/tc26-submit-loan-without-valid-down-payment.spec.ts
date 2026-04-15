import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const URLS = {
  requestLoan: 'https://parabank.parasoft.com/parabank/requestloan.htm',
};

const LOAN_DATA = {
  loanAmount: '600',
  downPayment: '200',
};

// ── TC-26 | Submit loan request without valid down payment ─────────────────
test.describe('PBQ-08 – Loan Request', () => {

  test('TC-26 | Loan request with insufficient down payment is denied', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.requestLoan);

    // ── Act ──────────────────────────────────────────────────────────────
    await page.locator('input[id="amount"]').fill(LOAN_DATA.loanAmount);
    await page.locator('input[id="downPayment"]').fill(LOAN_DATA.downPayment);

    // Select first available account
    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    const firstAccount = await page.locator('#fromAccountId option').first().getAttribute('value');
    await page.locator('#fromAccountId').selectOption(firstAccount!);

    await page.getByRole('button', { name: 'Apply Now' }).click();
    await page.waitForLoadState('networkidle');

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Loan Request Processed')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Denied')).toBeVisible();
    await expect(page.getByText('We cannot grant a loan in that amount with your available funds.')).toBeVisible();
  });

});