import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { LoginPage } from '../../framework/ui/pages/login.page';

test.describe('PBQ-02 – User Login', () => {

  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-07 | Login with wrong password shows error message', async ({ page }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-02 User Login');
    await testCaseId('TC-07');
    await severity('normal');

    const loginPage = new LoginPage(page);
    
    await step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await step('Login with wrong password', async () => {
      await loginPage.login('john', 'WrongPassword!');
    });

    await step('Verify error message is displayed', async () => {
      await loginPage.expectLoginError('The username and password could not be verified.');
    });
  });

});