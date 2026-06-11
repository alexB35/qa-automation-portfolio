import { test, expect } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { LoginPage } from '../../framework/ui/pages/login.page';

test.describe('PBQ-02 – User Login', () => {

  //test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-08 | Login with non-existing user', async ({ page }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-02 User Login');
    await testCaseId('TC-08');
    await severity('minor');

    const loginPage = new LoginPage(page);

    await step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await step('Login with non-existing username', async () => {
      await loginPage.login('nonexisting_user_12345', 'Test123!');
    });

    await step('Verify error message is displayed', async () => {
      await loginPage.expectLoginError('The username and password could not be verified.');
    });
  });

});