import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const TEST_USER = {
  username: 'john_doe_test01',
  password: 'Test123!',
  loginUrl: 'https://parabank.parasoft.com/parabank/index.htm',
  newAccountUrl: 'https://parabank.parasoft.com/parabank/openaccount.htm',
  overviewUrl: 'https://parabank.parasoft.com/parabank/overview.htm',
};

// ── TC-13 | Verify account details page ───────────────────────────────────
test.describe('PBQ-03 – Open New Account', () => {

  test('TC-13 | Account details page displays correct information', async ({ page }) => {

    // ── Arrange — session already active via storageState ───────────────────
    await page.goto(TEST_USER.newAccountUrl);

    // ── Act — Create a new account ───────────────────────────────────────
    await page.goto(TEST_USER.newAccountUrl);
    await page.locator('#type').selectOption('0'); // 0 = CHECKING
    await page.getByRole('button', { name: 'Open New Account' }).waitFor({ state: 'visible' });
    await page.getByRole('button', { name: 'Open New Account' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Congratulations, your account is now open.')).toHaveCount(1);

    // Get the new account number
    const newAccountLink = await page.locator('#newAccountId');
    const newAccountId = await newAccountLink.getAttribute('href').then(href => href?.split('id=')[1]);
    console.log('newAccountId:', newAccountId);

    // ── Act — Navigate to account details ────────────────────────────────
    await page.goto(TEST_USER.overviewUrl);
    await page.getByRole('link', { name: newAccountId! }).click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Account Details')).toBeVisible();
    await expect(page.getByText('Account Number:')).toBeVisible();
    await expect(page.getByText('Account Type:')).toBeVisible();
    await expect(page.getByText('Balance:')).toBeVisible();
    await expect(page.getByText('Available:')).toBeVisible();
    await expect(page.getByText('Account Activity')).toBeVisible();
  });

});