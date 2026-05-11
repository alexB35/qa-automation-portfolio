import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';

// ── Test Data ──────────────────────────────────────────────────────────────


// ── TC-25 | Submit loan request with empty field ───────────────────────────
test.describe('PBQ-08 – Loan Request', () => {

  test('TC-25 | Loan request with empty amount field should show validation error (KNOWN BUG PBQ-B05: returns internal error instead)', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.requestLoanUrl);

    // ── Act — leave loan amount empty ────────────────────────────────────
    await page.locator('input[id="downPayment"]').fill('100');

    // Select first available account
    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    const firstAccount = await page.locator('#fromAccountId option').first().getAttribute('value');
    await page.locator('#fromAccountId').selectOption(firstAccount!);

    await page.getByRole('button', { name: 'Apply Now' }).click();
    await page.waitForLoadState('networkidle');

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('An internal error has occurred and has been logged.')).toBeVisible({ timeout: 10000 });
  });

});