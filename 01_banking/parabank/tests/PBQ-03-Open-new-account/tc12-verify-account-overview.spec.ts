import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';


// ── Test Data ──────────────────────────────────────────────────────────────

const TEST_USER = {
  username: 'john_doe_test01',
  password: 'Test123!',
};

// ── TC-12 | New account appears in accounts overview ──────────────────────
test.describe('PBQ-03 – Open New Account', () => {

  test('TC-12 | New account appears in accounts overview after creation', async ({ page }) => {

    // ── Arrange — session already active via storageState ───────────────────
    await page.goto(URLS.openAccountUrl);

    // ── Act — Create a new account ───────────────────────────────────────
    await page.goto(URLS.openAccountUrl);
    await page.locator('#type').selectOption('0'); // 0 = CHECKING
    await page.getByRole('button', { name: 'Open New Account' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Open New Account' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Congratulations, your account is now open.')).toHaveCount(1);

    // Get the new account number
    const newAccountId = await page.locator('#newAccountId').evaluate(el => el.textContent);
    console.log('newAccountId:', newAccountId);

    // ── Act — Navigate to overview ───────────────────────────────────────
    await page.goto(URLS.overviewUrl);

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
    await expect(page.getByRole('link', { name: newAccountId! })).toBeVisible();
  });

});