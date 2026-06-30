import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';
import { LoginPage } from '../../../framework/ui/pages/login.page';

test.describe('AEX-02 – User Login', () => {
  
    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-06 | Successful login', async ({ page, loggedInUser }) => {
 
    const loginPage = new LoginPage(page);
  
    await epic('UI Testing');
    await story('AEX-02 User Login');
    await testCaseId('TC-06');
    await severity('critical');

    await step('Verify successful login', async () => {
      await expect(page.getByText(`Logged in as ${loggedInUser.name}`)).toBeVisible();
    });
  });
});