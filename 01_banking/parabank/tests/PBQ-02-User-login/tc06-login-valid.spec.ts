import { test, expect } from '@playwright/test';

test.use({ storageState: { cookies: [], origins: [] } });

// ── Test Data ──────────────────────────────────────────────────────────────
const TEST_USER = {
  username: 'john_doe_test01',
  password: 'Test123!',
  firstName: 'John',
  lastName: 'Doe',
  url: 'https://parabank.parasoft.com/parabank/index.htm',
};

// ── TC-06 | Valid Login ────────────────────────────────────────────────────
test.describe('PBQ-02 – User Login', () => {

  test('TC-06 | Successful login with valid credentials', async ({ page }) => {

    // ── Arrange ─────────────────────────────────────────────────────────
    await page.goto(TEST_USER.url);

    // ── Act ─────────────────────────────────────────────────────────────
    await page.locator('input[name="username"]').fill(TEST_USER.username);
    await page.locator('input[name="password"]').fill(TEST_USER.password);
    await page.locator('input[value="Log In"]').click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible();

      // ── Cleanup ───────────────────────────────────────────────────────
    await page.locator('input[value="Log Out"]').click();
  });

});