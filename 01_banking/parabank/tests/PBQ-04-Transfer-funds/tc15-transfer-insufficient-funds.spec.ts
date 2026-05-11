import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';


// ── Test Data ──────────────────────────────────────────────────────────────


// ── TC-15 | Transfer with insufficient funds ───────────────────────────────
test.describe('PBQ-04 – Transfer Funds', () => {

  test('TC-15 | Transfer with insufficient funds should be rejected', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.overviewUrl);

    // Get total balance across all accounts
    const balanceTexts = await page.locator('table#accountTable tbody tr td:nth-child(2)').allTextContents();
    let totalBalance = 0;
    for (const text of balanceTexts) {
      const amount = parseFloat(text.replace(/[$,]/g, ''));
      if (!isNaN(amount)) totalBalance += amount;
    }
    const transferAmount = (totalBalance + 10000000).toFixed(2);
    console.log(`Total balance: $${totalBalance} — Transfer amount: $${transferAmount}`);

    // ── Act ──────────────────────────────────────────────────────────────
    await page.goto(URLS.transferUrl);
    await page.locator('#amount').fill(transferAmount);

    // Wait for accounts to load
    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });

    // Select first account as source
    const fromOptions = await page.locator('#fromAccountId option').all();
    const fromAccount = await fromOptions[0].getAttribute('value');
    await page.locator('#fromAccountId').selectOption(fromAccount!);

    // Select second account as destination (different from source)
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

    const count = await page.getByText('Insufficient funds').count();
    console.log('Insufficient funds count:', count);

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Insufficient funds')).toHaveCount(1);
  });

});