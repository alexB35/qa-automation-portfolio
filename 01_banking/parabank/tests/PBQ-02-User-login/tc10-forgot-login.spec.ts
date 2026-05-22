import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { ForgotLoginPage } from '../../framework/ui/pages/forgot-login.page';

test.describe('PBQ-02 – User Login', () => {

  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-10 | Forgot login info', async ({ page, registeredUser }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-02 User Login');
    await testCaseId('TC-10');
    await severity('normal');

    const forgotLoginPage = new ForgotLoginPage(page);

    await step('Navigate to forgot login page', async () => {
      await forgotLoginPage.goto();
    });

    await step('Fill in customer lookup form with registered user data', async () => {
      await forgotLoginPage.fillAndSubmit(registeredUser);
    });

    await step('Verify credentials are displayed and user is logged in', async () => {
      await forgotLoginPage.expectLookupSuccess(registeredUser);
    });
  });

});