import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const EXISTING_USER = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St',
  city: 'Anytown',
  state: 'CA',
  zipCode: '12345',
  phone: '555-1234',
  ssn: '123-45-6789',
  username: 'john_doe_test01',
  password: 'Test123!',
  confirmPassword: 'Test123!',
  url: 'https://parabank.parasoft.com/parabank/register.htm',
};

// ── TC-02 | Registration with existing username ────────────────────────────
test.describe('PBQ-01 – User Registration', () => {

  test('TC-02 | Registration with existing username shows error message', async ({ page }) => {

    // ── Arrange ─────────────────────────────────────────────────────────
    await page.goto(EXISTING_USER.url);

    // ── Act ─────────────────────────────────────────────────────────────
    await page.locator('input[id="customer.firstName"]').fill(EXISTING_USER.firstName);
    await page.locator('input[id="customer.lastName"]').fill(EXISTING_USER.lastName);
    await page.locator('input[id="customer.address.street"]').fill(EXISTING_USER.address);
    await page.locator('input[id="customer.address.city"]').fill(EXISTING_USER.city);
    await page.locator('input[id="customer.address.state"]').fill(EXISTING_USER.state);
    await page.locator('input[id="customer.address.zipCode"]').fill(EXISTING_USER.zipCode);
    await page.locator('input[id="customer.phoneNumber"]').fill(EXISTING_USER.phone);
    await page.locator('input[id="customer.ssn"]').fill(EXISTING_USER.ssn);
    await page.locator('input[id="customer.username"]').fill(EXISTING_USER.username);
    await page.locator('input[id="customer.password"]').fill(EXISTING_USER.password);
    await page.locator('input[id="repeatedPassword"]').fill(EXISTING_USER.confirmPassword);
    await page.locator('input[value="Register"]').click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.locator('#customer\\.username\\.errors')).toBeVisible();
    await expect(page.getByText('This username already exists.')).toBeVisible();
  });

});