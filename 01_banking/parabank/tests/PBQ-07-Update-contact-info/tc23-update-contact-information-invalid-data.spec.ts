import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';

// ── Test Data ──────────────────────────────────────────────────────────────


// ── TC-23 | Update contact information with invalid data ───────────────────
test.describe('PBQ-07 – Update Contact Info', () => {

  test('TC-23 | Update contact information with empty required fields shows validation errors', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.updateProfileUrl);

    // ── Act — clear required fields ──────────────────────────────────────
    await page.locator('input[id="customer.address.street"]').fill('');
    await page.locator('input[id="customer.address.city"]').fill('');
    await page.locator('input[id="customer.address.state"]').fill('');
    await page.locator('input[id="customer.address.zipCode"]').fill('');
    await page.getByRole('button', { name: 'Update Profile' }).click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Address is required.')).toBeVisible();
    await expect(page.getByText('City is required.')).toBeVisible();
    await expect(page.getByText('State is required.')).toBeVisible();
    await expect(page.getByText('Zip Code is required.')).toBeVisible();
  });

});