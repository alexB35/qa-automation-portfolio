import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';
import { LoginPage } from '../../../framework/ui/pages/login.page';

test.describe('AEX-02 – User Login', () => {

    test.use({ storageState: { cookies: [], origins: [] } });
    
test('TC-08 | Login with empty fields', async ({ page }) => {
 
    const loginPage = new LoginPage(page);
  
    await epic('UI Testing');
    await story('AEX-02 User Login');
    await testCaseId('TC-08');
    await severity('normal');
 
    await step('Navigate to login / signup page', async () => {
      await loginPage.goto();
    });

    await step('Submit login form with empty password', async () => {
      await loginPage.emailInput().fill('test@test.com');
      await loginPage.loginButton().click();
    });

    await step('Verify login blocked', async () => {
      await expect(page).toHaveURL(/login/);
      await expect(loginPage.passwordInput().and(page.locator(':invalid'))).toHaveCount(1);
    });
  });
});