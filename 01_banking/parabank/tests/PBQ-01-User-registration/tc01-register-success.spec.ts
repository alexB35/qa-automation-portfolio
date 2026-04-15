import { test, expect } from '@playwright/test';
import * as allure from 'allure-js-commons';

// ── Test Data ──────────────────────────────────────────────────────────────
const NEW_USER = {
  firstName: 'John',
  lastName: 'Doe',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  phone: '0123456789',
  ssn: '123-45-6789',
  username: `tu${Math.random().toString(36).slice(2, 8)}`,
  password: 'Test123!',
  confirmPassword: 'Test123!',
  url: 'https://parabank.parasoft.com/parabank/register.htm',
};

// ── TC-01 | Successful user registration ──────────────────────────────────
test.describe('PBQ-01 – User Registration', () => {

  test('TC-01 | Successful user registration with valid data', async ({ page }) => {

  await allure.epic('Banking');
  await allure.feature('PBQ-01 User Registration');
  await allure.story('TC-01 Successful user registration');
  await allure.severity('critical');

    // ── Arrange ─────────────────────────────────────────────────────────
    const username = `tu${Math.random().toString(36).slice(2, 8)}`;
  

    // ── Act ─────────────────────────────────────────────────────────────
    await allure.step('Go to login page', async () => {        
    await page.goto(NEW_USER.url);
  });

  await allure.step('Enter credentials', async () => {
    await page.locator('input[id="customer.firstName"]').fill(NEW_USER.firstName);
    await page.locator('input[id="customer.lastName"]').fill(NEW_USER.lastName);
    await page.locator('input[id="customer.address.street"]').fill(NEW_USER.address);
    await page.locator('input[id="customer.address.city"]').fill(NEW_USER.city);
    await page.locator('input[id="customer.address.state"]').fill(NEW_USER.state);
    await page.locator('input[id="customer.address.zipCode"]').fill(NEW_USER.zipCode);
    await page.locator('input[id="customer.phoneNumber"]').fill(NEW_USER.phone);
    await page.locator('input[id="customer.ssn"]').fill(NEW_USER.ssn);
    await page.locator('input[id="customer.username"]').fill(username);    
    await page.waitForTimeout(500);
    await page.locator('input[id="customer.password"]').fill(NEW_USER.password);
    await page.locator('input[id="repeatedPassword"]').fill(NEW_USER.confirmPassword);
    await page.waitForTimeout(500);
  });

  await allure.step('Submit login', async () => {
    await page.locator('input[value="Register"]').click();

    // ── Assert ──────────────────────────────────────────────────────────
    await expect(page.getByText('Your account was created')).toBeVisible();
    await expect(page.locator('#leftPanel')).toContainText(`Welcome ${NEW_USER.firstName} ${NEW_USER.lastName}`);
  });

  });

}); 