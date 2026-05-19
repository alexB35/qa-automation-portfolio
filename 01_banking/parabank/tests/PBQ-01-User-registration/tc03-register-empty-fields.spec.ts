import { test, expect } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { RegisterPage } from '../../framework/ui/pages/register.page';

test.describe('PBQ-01 – User Registration', () => {

  test('TC-03 | Empty submit shows all required field errors', async ({ page }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-01 User Registration');
    await testCaseId('TC-03');
    await severity('normal');

    const registerPage = new RegisterPage(page);

    await step('Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await step('Submit empty form', async () => {
      await registerPage.submit();
    });

    await step('Verify all required field errors are displayed', async () => {
      await expect(page.getByText('First name is required.')).toBeVisible();
      await expect(page.getByText('Last name is required.')).toBeVisible();
      await expect(page.getByText('Address is required.')).toBeVisible();
      await expect(page.getByText('City is required.')).toBeVisible();
      await expect(page.getByText('State is required.')).toBeVisible();
      await expect(page.getByText('Zip Code is required.')).toBeVisible();
      await expect(page.getByText('Social Security Number is required.')).toBeVisible();
      await expect(page.getByText('Username is required.')).toBeVisible();
      await expect(page.getByText('Password is required.')).toBeVisible();
      await expect(page.getByText('Password confirmation is required.')).toBeVisible();
    });
  });

});