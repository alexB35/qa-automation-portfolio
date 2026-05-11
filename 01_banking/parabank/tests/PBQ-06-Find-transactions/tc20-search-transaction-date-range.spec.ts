import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';


// ── Test Data ──────────────────────────────────────────────────────────────

const DATE_RANGE = {
  from: '01-01-2026',
  to: '12-31-2026',
};

// ── TC-20 | Search transactions by valid date range ────────────────────────
test.describe('PBQ-06 – Find Transactions', () => {

  test('TC-20 | Search transactions by valid date range returns results', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.findTransactionsUrl);

    // ── Act ──────────────────────────────────────────────────────────────

    // Select first available account
    await page.locator('#accountId option').first().waitFor({ state: 'attached' });
    const firstAccount = await page.locator('#accountId option').first().getAttribute('value');
    await page.locator('#accountId').selectOption(firstAccount!);

    // Fill date range
    await page.locator('input[id="criteria.fromDate"]').fill(DATE_RANGE.from);
    await page.locator('input[id="criteria.toDate"]').fill(DATE_RANGE.to);

    // Click Find Transactions button for date range section
    await page.locator('#byDateRange').getByRole('button', { name: 'Find Transactions' }).click();
    await page.waitForLoadState('networkidle');

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Transaction Results')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('table.table thead')).toBeVisible();
    await expect(page.getByText('Date')).toBeVisible();
    await expect(page.getByText('Transaction')).toBeVisible();
    await expect(page.getByText('Debit (-)')).toBeVisible();
    await expect(page.getByText('Credit (+)')).toBeVisible();
  });

});