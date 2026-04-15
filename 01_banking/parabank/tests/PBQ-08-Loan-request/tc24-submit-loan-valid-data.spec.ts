import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const URLS = {
  requestLoan: 'https://parabank.parasoft.com/parabank/requestloan.htm',
};

const LOAN_DATA = {
  loanAmount: '600',
  downPayment: '100',
};

// ── TC-24 | Submit loan request with valid data ────────────────────────────
test.describe('PBQ-08 – Loan Request', () => {

  test('TC-24 | Loan request with valid data is approved', async ({ page }) => {

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
    await expect(page.getByText('Approved')).toBeVisible();
    await expect(page.getByText('Congratulations, your loan has been approved.')).toBeVisible();
    await expect(page.locator('#newAccountId')).toBeVisible();
  });

});