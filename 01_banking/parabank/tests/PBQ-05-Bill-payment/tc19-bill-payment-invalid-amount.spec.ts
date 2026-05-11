import { test, expect } from '@playwright/test';
import { URLS } from '../../resources/urls';


// ── Test Data ──────────────────────────────────────────────────────────────

const PAYEE = {
  name: 'Electric Company',
  address: '123 Power St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  phone: '555-1234',
  accountNumber: '987654321',
  amount: '-100',
};

// ── TC-19 | Bill payment with negative amount ──────────────────────────────
test.describe('PBQ-05 – Bill Pay', () => {

  test('TC-19 | Bill payment with negative amount should be rejected (KNOWN BUG PBQ-B04: payment processed with negative amount)', async ({ page }) => {

    // ── Arrange — session already active via storageState ────────────────
    await page.goto(URLS.billPayUrl);

    // ── Act — fill all fields with negative amount ───────────────────────
    await page.locator('input[name="payee.name"]').fill(PAYEE.name);
    await page.locator('input[name="payee.address.street"]').fill(PAYEE.address);
    await page.locator('input[name="payee.address.city"]').fill(PAYEE.city);
    await page.locator('input[name="payee.address.state"]').fill(PAYEE.state);
    await page.locator('input[name="payee.address.zipCode"]').fill(PAYEE.zipCode);
    await page.locator('input[name="payee.phoneNumber"]').fill(PAYEE.phone);
    await page.locator('input[name="payee.accountNumber"]').fill(PAYEE.accountNumber);
    await page.locator('input[name="verifyAccount"]').fill(PAYEE.accountNumber);
    await page.locator('input[name="amount"]').fill(PAYEE.amount);

    // Wait for accounts to load and select source account
    await page.locator('#fromAccountId option').first().waitFor({ state: 'attached' });
    const fromOptions = await page.locator('#fromAccountId option').all();
    const fromAccount = await fromOptions[0].getAttribute('value');
    await page.locator('#fromAccountId').selectOption(fromAccount!);

    await page.getByRole('button', { name: 'Send Payment' }).click();
    await page.waitForLoadState('networkidle');

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Amount must be greater than 0')).toHaveCount(1);
  });

});