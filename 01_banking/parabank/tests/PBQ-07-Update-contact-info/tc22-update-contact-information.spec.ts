import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';

// ── Test Data ──────────────────────────────────────────────────────────────

const UPDATED_DATA = {
  address: '456 Updated Street',
  city: 'Las Vegas',
  state: 'NV',
  zipCode: '90001',
  phone: '9876543210',
};

// ── TC-22 | Update contact information with valid data ─────────────────────
test.describe('PBQ-07 – Update Contact Info', () => {

  test('TC-22 | Update contact information with valid data shows success message', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.updateProfileUrl);

    // ── Act ──────────────────────────────────────────────────────────────
    await page.locator('input[id="customer.address.street"]').fill(UPDATED_DATA.address);
    await page.locator('input[id="customer.address.city"]').fill(UPDATED_DATA.city);
    await page.locator('input[id="customer.address.state"]').fill(UPDATED_DATA.state);
    await page.locator('input[id="customer.address.zipCode"]').fill(UPDATED_DATA.zipCode);
    await page.locator('input[id="customer.phoneNumber"]').fill(UPDATED_DATA.phone);
    await page.getByRole('button', { name: 'Update Profile' }).click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Profile Updated')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Your updated address and phone number have been added to the system.')).toBeVisible();
  });

});