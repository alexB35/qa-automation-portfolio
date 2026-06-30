import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';

test.describe('AEX-02 – User Login', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-09 | Logout', async ({ page, loggedInUser }) => {
 
    await epic('UI Testing');
    await story('AEX-02 User Login');
    await testCaseId('TC-09');
    await severity('normal');
 
    await step('Navigate to login / signup page', async () => {
      await expect(page.getByText(`Logged in as ${loggedInUser.name}`)).toBeVisible();
    });
 
    await step('Logout', async () => {
      await page.getByRole('link', { name: ' Logout' }).click();
    });
 
    await step('Verify logout successful', async () => {
      await expect(page.getByText('Signup / Login')).toBeVisible();
    });
  });
});