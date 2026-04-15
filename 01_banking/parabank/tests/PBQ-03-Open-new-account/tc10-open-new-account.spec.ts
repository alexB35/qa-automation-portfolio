import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const TEST_USER = {
  username: 'john_doe_test01',
  password: 'Test123!',
  loginUrl: 'https://parabank.parasoft.com/parabank/index.htm',
  newAccountUrl: 'https://parabank.parasoft.com/parabank/openaccount.htm',
};

// ── TC-10 | Successful account creation ───────────────────────────────────
test.describe('PBQ-03 – Open New Account', () => {

  test('TC-10 | Successful account creation with valid data', async ({ page }) => {

    // ── Arrange — session already active via storageState ───────────────────
    await page.goto(TEST_USER.newAccountUrl);

    // ── Act ─────────────────────────────────────────────────────────────
    await page.goto(TEST_USER.newAccountUrl);
    await page.locator('#type').selectOption('0'); // 0 = CHECKING
    await page.getByRole('button', { name: 'Open New Account' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Open New Account' }).click();
    await page.waitForLoadState('networkidle');

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Congratulations, your account is now open.')).toHaveCount(1);    
    await expect(page.locator('#newAccountId')).toHaveCount(1);
  });

});