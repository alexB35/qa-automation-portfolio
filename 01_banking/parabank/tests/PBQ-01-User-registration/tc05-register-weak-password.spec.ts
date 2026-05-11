import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';


// ── Test Data ──────────────────────────────────────────────────────────────

const BASE_USER = {
  firstName: 'John',
  lastName: 'Tester',
  address: '123 Test Street',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  phone: '0123456789',
  ssn: '123-45-6789',
  password: '     ',
  confirmPassword: '     ',
};

// ── TC-05 | Registration with weak password format ─────────────────────────
test.describe('PBQ-01 – User Registration', () => {

  test('TC-05 | Registration with weak password format — (spaces only)', async ({ page }) => {

    // ── Arrange ─────────────────────────────────────────────────────────
    const username = `tu${Math.random().toString(36).slice(2, 8)}`;

    await page.goto(URLS.registerUrl);

    // ── Act ─────────────────────────────────────────────────────────────
    await page.locator('input[id="customer.firstName"]').fill(BASE_USER.firstName);
    await page.locator('input[id="customer.lastName"]').fill(BASE_USER.lastName);
    await page.locator('input[id="customer.address.street"]').fill(BASE_USER.address);
    await page.locator('input[id="customer.address.city"]').fill(BASE_USER.city);
    await page.locator('input[id="customer.address.state"]').fill(BASE_USER.state);
    await page.locator('input[id="customer.address.zipCode"]').fill(BASE_USER.zipCode);
    await page.locator('input[id="customer.phoneNumber"]').fill(BASE_USER.phone);
    await page.locator('input[id="customer.ssn"]').fill(BASE_USER.ssn);
    await page.locator('input[id="customer.username"]').fill(username);
    await page.locator('input[id="customer.password"]').fill(BASE_USER.password);
    await page.locator('input[id="repeatedPassword"]').fill(BASE_USER.confirmPassword);
    await page.locator('input[value="Register"]').click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Error!')).toBeVisible();
    await expect(page.getByText('Password must contain at least one non-space character')).toBeVisible();
  });

});