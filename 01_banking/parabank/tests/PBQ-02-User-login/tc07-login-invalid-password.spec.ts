import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const TEST_USER = {
  username: 'john_doe_test01',
  password: 'WrongPassword!',
  url: 'https://parabank.parasoft.com/parabank/index.htm',
};

// ── TC-07 | Login with invalid password ───────────────────────────────────
test.describe('PBQ-02 – User Login', () => {

  test('TC-07 | Login with invalid password shows error message', async ({ page }) => {

    // ── Arrange ─────────────────────────────────────────────────────────
    await page.goto(TEST_USER.url);

    // ── Act ─────────────────────────────────────────────────────────────
    await page.locator('input[name="username"]').fill(TEST_USER.username);
    await page.locator('input[name="password"]').fill(TEST_USER.password);
    await page.locator('input[value="Log In"]').click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Error!')).toBeVisible();
    await expect(page.getByText('The username and password could not be verified.')).toBeVisible();
  });

});