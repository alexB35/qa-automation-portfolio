import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

const TEST_USER = {
  transferAmount: '100',
};

// ── TC-14 | Successful fund transfer ──────────────────────────────────────
test.describe('PBQ-04 – Transfer Funds', () => {

  test('TC-14 | Successful fund transfer between accounts', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.transferUrl);

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