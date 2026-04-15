import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const REGISTRATION_URL = 'https://parabank.parasoft.com/parabank/register.htm';

const EXPECTED_ERRORS = {
  firstName: 'First name is required.',
  lastName: 'Last name is required.',
  address: 'Address is required.',
  city: 'City is required.',
  state: 'State is required.',
  zipCode: 'Zip Code is required.',
  ssn: 'Social Security Number is required.',
  username: 'Username is required.',
  password: 'Password is required.',
  confirmPassword: 'Password confirmation is required.',
};

// ── TC-03 | Mandatory field validation ────────────────────────────────────
test.describe('PBQ-01 – User Registration', () => {

  test('TC-03 | Mandatory field validation — all required fields show error on empty submit', async ({ page }) => {

    // ── Arrange ─────────────────────────────────────────────────────────
    await page.goto(REGISTRATION_URL);

    // ── Act ─────────────────────────────────────────────────────────────
    await page.locator('input[value="Register"]').click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText(EXPECTED_ERRORS.firstName)).toBeVisible();
    await expect(page.getByText(EXPECTED_ERRORS.lastName)).toBeVisible();
    await expect(page.getByText(EXPECTED_ERRORS.address)).toBeVisible();
    await expect(page.getByText(EXPECTED_ERRORS.city)).toBeVisible();
    await expect(page.getByText(EXPECTED_ERRORS.state)).toBeVisible();
    await expect(page.getByText(EXPECTED_ERRORS.zipCode)).toBeVisible();
    await expect(page.getByText(EXPECTED_ERRORS.ssn)).toBeVisible();
    await expect(page.getByText(EXPECTED_ERRORS.username)).toBeVisible();
    await expect(page.getByText(EXPECTED_ERRORS.password)).toBeVisible();
    await expect(page.getByText(EXPECTED_ERRORS.confirmPassword)).toBeVisible();
  });

});