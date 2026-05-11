import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

// ── TC-09 | Login with empty fields ───────────────────────────────────────
test.describe('PBQ-02 – User Login', () => {

  test('TC-09 | Login with empty fields shows error message', async ({ page }) => {

    // ── Arrange ─────────────────────────────────────────────────────────
    await page.goto(URLS.indexUrl);

    // ── Act ─────────────────────────────────────────────────────────────
    await page.locator('input[value="Log In"]').click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Please enter a username and password.')).toBeVisible();
  });

});