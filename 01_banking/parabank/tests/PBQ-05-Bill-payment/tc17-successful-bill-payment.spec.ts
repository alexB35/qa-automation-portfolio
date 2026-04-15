import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const TEST_USER = {
  transferUrl: 'https://parabank.parasoft.com/parabank/billpay.htm',
  transferAmount: '1000', // A valid amount for bill payment
};

// ── TC-17 | Successful bill payment ──────────────────────────────────────
test.describe('PBQ-05 – Bill Pay', () => {

  test('TC-17 | Successful bill payment', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(TEST_USER.transferUrl);

    // ── Act ──────────────────────────────────────────────────────────────
    await page.locator('#amount').fill(TEST_USER.transferAmount);

    // Wait for accounts to load
    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });

    // Select first account as source
    const fromOptions = await page.locator('#fromAccountId option').all();
    const fromAccount = await fromOptions[0].getAttribute('value');
    await page.locator('#fromAccountId').selectOption(fromAccount!);


    // Select second account as destination
    const toOptions = await page.locator('#toAccountId option').all();
    let toAccount: string | null = null;
        for (const option of toOptions) {
            const value = await option.getAttribute('value');
        if (value !== fromAccount) {
            toAccount = value;
        break;
  }
}
    await page.locator('#toAccountId').selectOption(toAccount!);

    await page.getByRole('button', { name: 'Transfer' }).click();
    await page.waitForLoadState('networkidle');

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Transfer Complete!')).toHaveCount(1);
    await expect(page.getByText('has been transferred from account')).toHaveCount(1);
  });

});