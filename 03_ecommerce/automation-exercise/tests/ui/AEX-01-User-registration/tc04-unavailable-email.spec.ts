import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';
import { RegisterPage } from '../../../framework/ui/pages/register.page';

test.describe('AEX-01 – User Registration', () => {

  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-04 | Unavailable email address', async ({ page, existingUser }) => {

    const registerPage = new RegisterPage(page);

    await epic('UI Testing');
    await story('AEX-01 User Registration');
    await testCaseId('TC-04');
    await severity('normal');

    await step('Navigate to signup page', async () => {
      await registerPage.goto();
    });

    await step('Enter already registered email', async () => {
      await registerPage.fillSignupNameAndEmail(existingUser.name, existingUser.email);
    });

    await step('Verify duplicate email error', async () => {
      await expect(page.getByText('Email Address already exist!')).toBeVisible();
    });
  });
});