import { test as setup, expect } from '@playwright/test';

const AUTH_FILE = './01_banking/parabank/.auth/session.json';

export const TEST_USER = {
  username: `tu${Math.random().toString(36).slice(2, 8)}`,
  password: 'Test123!',
  firstName: 'John',
  lastName: 'Doe',
};

setup('Create test account and authenticate', async ({ page }) => {

  const username = `tu${Math.random().toString(36).slice(2, 8)}`;
  const password = 'Test123!';

  // ── Step 1 : Register new user ───────────────────────────────────────
  await page.goto('https://parabank.parasoft.com/parabank/register.htm');
  await page.locator('input[id="customer.firstName"]').fill('John');
  await page.locator('input[id="customer.lastName"]').fill('Doe');
  await page.locator('input[id="customer.address.street"]').fill('123 Main St');
  await page.locator('input[id="customer.address.city"]').fill('New York');
  await page.locator('input[id="customer.address.state"]').fill('NY');
  await page.locator('input[id="customer.address.zipCode"]').fill('10001');
  await page.locator('input[id="customer.phoneNumber"]').fill('0123456789');
  await page.locator('input[id="customer.ssn"]').fill('123-45-6789');
  await page.locator('input[id="customer.username"]').fill(username);
  await page.locator('input[id="customer.password"]').fill(password);
  await page.locator('input[id="repeatedPassword"]').fill(password);
  await page.locator('input[value="Register"]').click();
  await expect(page.getByText('Your account was created')).toBeVisible({ timeout: 10000 });
  console.log(`✅ User registered: ${username}`);

  // ── Step 2 : Open a second bank account ─────────────────────────────
  await page.goto('https://parabank.parasoft.com/parabank/openaccount.htm');
  await page.locator('#type').selectOption('0');
  await page.getByRole('button', { name: 'Open New Account' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Open New Account' }).click();
  await page.waitForLoadState('networkidle');
  await expect(page.getByText('Congratulations, your account is now open.')).toHaveCount(1);
  console.log(`✅ Second bank account opened`);

  // ── Step 3 : Save session ────────────────────────────────────────────
  await page.context().storageState({ path: AUTH_FILE });
  console.log(`✅ Fresh session saved for: ${username}`);
});