import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const URLS = {
  findTransactions: 'https://parabank.parasoft.com/parabank/findtrans.htm',
};

const INVALID_DATA = {
  invalidId: 'abc',
  nonExistingId: '999999999',
};

// ── TC-21 | Search transactions with invalid ID ────────────────────────────
test.describe('PBQ-06 – Find Transactions', () => {

  test('TC-21a | Search with non-numeric transaction ID shows error message', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.findTransactions);

    // Select first available account
    await page.locator('#accountId option').first().waitFor({ state: 'attached' });
    const firstAccount = await page.locator('#accountId option').first().getAttribute('value');
    await page.locator('#accountId').selectOption(firstAccount!);

    // ── Act — search with invalid non-numeric ID ─────────────────────────
    await page.locator('input[id="criteria.transactionId"]').fill(INVALID_DATA.invalidId);
    await page.locator('#byId').getByRole('button', { name: 'Find Transactions' }).click();
    await page.waitForLoadState('networkidle');

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Invalid transaction ID')).toBeVisible({ timeout: 10000 });
  });

  test('TC-21b | Search with non-existing transaction ID returns empty results', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.findTransactions);

    // Select first available account
    await page.locator('#accountId option').first().waitFor({ state: 'attached' });
    const firstAccount = await page.locator('#accountId option').first().getAttribute('value');
    await page.locator('#accountId').selectOption(firstAccount!);

    // ── Act — search with non-existing numeric ID ─────────────────────────
    await page.locator('input[id="criteria.transactionId"]').fill(INVALID_DATA.nonExistingId);
    await page.locator('#byId').getByRole('button', { name: 'Find Transactions' }).click();
    await page.waitForLoadState('networkidle');

    // ── Assert — empty results table ─────────────────────────────────────
    await expect(page.getByText('Transaction Results')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('table.table tbody tr')).toHaveCount(0);
  });

});