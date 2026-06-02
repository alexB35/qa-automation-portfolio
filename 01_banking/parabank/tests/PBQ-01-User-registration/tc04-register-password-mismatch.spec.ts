import { test, expect } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { buildUser } from '../../framework/data/user.factory';
import { RegisterPage } from '../../framework/ui/pages/register.page';

test.describe('PBQ-01 – User Registration', () => {

  test('TC-04 | Password mismatch shows error message', async ({ page }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-01 User Registration');
    await testCaseId('TC-04');
    await severity('critical');

    const registerPage = new RegisterPage(page);
    const user = buildUser();

    await step('Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await step('Submit form with mismatching passwords', async () => {
      await registerPage.fillAndSubmit(user, 'WrongPassword!');
    });

    await step('Verify password mismatch error is displayed', async () => {
      await expect(page.getByText('Passwords did not match.')).toBeVisible();
    });
  });

});