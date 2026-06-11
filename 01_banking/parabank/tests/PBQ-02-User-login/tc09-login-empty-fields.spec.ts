import { test, expect } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { LoginPage } from '../../framework/ui/pages/login.page';

test.describe('PBQ-02 – User Login', () => {

  test('TC-09 | Login with empty fields', async ({ page }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-02 User Login');
    await testCaseId('TC-09');
    await severity('normal');

    const loginPage = new LoginPage(page);

    await step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await step('Submit empty login form', async () => {
      await loginPage.submitEmpty();
    });

    await step('Verify error message is displayed', async () => {
      await expect(page.getByText('Please enter a username and password.')).toBeVisible();
    });
  });

});