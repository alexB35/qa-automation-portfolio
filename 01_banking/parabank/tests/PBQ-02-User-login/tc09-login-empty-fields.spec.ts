import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const LOGIN_URL = 'https://parabank.parasoft.com/parabank/index.htm';

// ── TC-09 | Login with empty fields ───────────────────────────────────────
test.describe('PBQ-02 – User Login', () => {

  test('TC-09 | Login with empty fields shows error message', async ({ page }) => {

    // ── Arrange ─────────────────────────────────────────────────────────
    await page.goto(LOGIN_URL);

    // ── Act ─────────────────────────────────────────────────────────────
    await page.locator('input[value="Log In"]').click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Please enter a username and password.')).toBeVisible();
  });

});