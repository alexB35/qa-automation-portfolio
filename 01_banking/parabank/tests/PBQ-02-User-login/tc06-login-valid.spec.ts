import { test, expect } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { LoginPage } from '../../framework/ui/pages/login.page';

test.describe('PBQ-02 – User Login', () => {

  test('TC-06 | Successful login with valid credentials', async ({ page, registeredUser }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-02 User Login');
    await testCaseId('TC-06');
    await severity('critical');

    const loginPage = new LoginPage(page);
    
    await step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await step('Login with valid credentials', async () => {
      await loginPage.login(registeredUser.username, registeredUser.password);
    });

    await step('Verify login success', async () => {
      await loginPage.expectLoginSuccess();
    });
  });

});