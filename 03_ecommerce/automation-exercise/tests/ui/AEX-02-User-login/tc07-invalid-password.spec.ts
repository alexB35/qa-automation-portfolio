import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';
import { LoginPage } from '../../../framework/ui/pages/login.page';

test.describe('AEX-02 – User Login', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-07 | Invalid password', async ({ page, existingUser }) => {
    
    const loginPage = new LoginPage(page);

    await epic('UI Testing');
    await story('AEX-02 User Login');
    await testCaseId('TC-07');
    await severity('critical');
 
    await step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await step('Login with invalid password', async () => {
      await loginPage.login(existingUser.email, 'WrongPass123!');
    });

    await step('Verify invalid password error', async () => {
      await expect(page.getByText(`Your email or password is incorrect!`)).toBeVisible();
    });
  });
});