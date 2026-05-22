import { test, expect } from '@playwright/test';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { buildUser } from '../../framework/data/user.factory';
import { RegisterPage } from '../../framework/ui/pages/register.page';

test.describe('PBQ-01 – User Registration', () => {

  test('TC-05 | Weak password (spaces only)', async ({ page }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-01 User Registration');
    await testCaseId('TC-05');
    await severity('normal');

    const registerPage = new RegisterPage(page);
    const user = buildUser({ password: '     ' });

    await step('Navigate to registration page', async () => {
      await registerPage.goto();
    });

    await step('Submit form with spaces-only password', async () => {
      await registerPage.fillAndSubmit(user, '     ');
    });

    await step('Verify registration is rejected', async () => {
      await expect(page.getByText('Password is required.')).toHaveCount(1);
    });
  });

});