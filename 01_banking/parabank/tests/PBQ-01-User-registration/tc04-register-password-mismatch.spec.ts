import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';


// ── Test Data ──────────────────────────────────────────────────────────────

const TEST_USER = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St',
  city: 'Los Angeles',
  state: 'CA',
  zipCode: '12345',
  phone: '555-1234',
  ssn: '123-45-6789',
  username: 'john_doe_mismatch',
  password: 'Test12345!',
  confirmPassword: 'WrongPassword!',
};

// ── TC-04 | Password mismatch ──────────────────────────────────────────────
test.describe('PBQ-01 – User Registration', () => {

  test('TC-04 | Password mismatch shows error message', async ({ page }) => {

    // ── Arrange ─────────────────────────────────────────────────────────
    await page.goto(URLS.registerUrl);

    // ── Act ─────────────────────────────────────────────────────────────
    await page.locator('input[id="customer.firstName"]').fill(TEST_USER.firstName);
    await page.locator('input[id="customer.lastName"]').fill(TEST_USER.lastName);
    await page.locator('input[id="customer.address.street"]').fill(TEST_USER.address);
    await page.locator('input[id="customer.address.city"]').fill(TEST_USER.city);
    await page.locator('input[id="customer.address.state"]').fill(TEST_USER.state);
    await page.locator('input[id="customer.address.zipCode"]').fill(TEST_USER.zipCode);
    await page.locator('input[id="customer.phoneNumber"]').fill(TEST_USER.phone);
    await page.locator('input[id="customer.ssn"]').fill(TEST_USER.ssn);
    await page.locator('input[id="customer.username"]').fill(TEST_USER.username);
    await page.locator('input[id="customer.password"]').fill(TEST_USER.password);
    await page.locator('input[id="repeatedPassword"]').fill(TEST_USER.confirmPassword);
    await page.locator('input[value="Register"]').click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Passwords did not match.')).toBeVisible();
  });

});