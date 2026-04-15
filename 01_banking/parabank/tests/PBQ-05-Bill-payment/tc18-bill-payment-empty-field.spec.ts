import { test, expect } from '@playwright/test';

// ── Test Data ──────────────────────────────────────────────────────────────
const URLS = {
  billPay: 'https://parabank.parasoft.com/parabank/billpay.htm',
};

const PAYEE = {
  name: 'Electric Company',
  address: '123 Power St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  phone: '555-1234',
  accountNumber: '987654321',
};

// ── TC-18 | Bill payment with empty field ───────────────────────────
test.describe('PBQ-05 – Bill Pay', () => {

  test('TC-18 | Bill payment with empty field shows validation error', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.billPay);

    // ── Act — fill all fields except amount ──────────────────────────────
    await page.locator('input[name="payee.name"]').fill(PAYEE.name);
    await page.locator('input[name="payee.address.street"]').fill(PAYEE.address);
    await page.locator('input[name="payee.address.city"]').fill(PAYEE.city);
    await page.locator('input[name="payee.address.state"]').fill(PAYEE.state);
    await page.locator('input[name="payee.address.zipCode"]').fill(PAYEE.zipCode);
    await page.locator('input[name="payee.phoneNumber"]').fill(PAYEE.phone);
    await page.locator('input[name="payee.accountNumber"]').fill(PAYEE.accountNumber);
    await page.locator('input[name="verifyAccount"]').fill(PAYEE.accountNumber);
    // amount left empty intentionally

    await page.getByRole('button', { name: 'Send Payment' }).click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('The amount cannot be empty.')).toBeVisible();
  });

});