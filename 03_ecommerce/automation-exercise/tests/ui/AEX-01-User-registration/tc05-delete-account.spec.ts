import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';

test.describe('AEX-01 – User Registration', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-05 | Delete account', async ({ page, loggedInUser }) => {
 
    await epic('UI Testing');
    await story('AEX-01 User Registration');
    await testCaseId('TC-05');
    await severity('normal');

    await step('Verify account created and user is logged in', async () => {
      await expect(page.getByText(`Logged in as ${loggedInUser.name}`)).toBeVisible();
    });

    await step('Delete account', async () => {
      await page.getByRole('link', { name: ' Delete Account' }).click();
    });  
 
    await step('Verify account deleted', async () => {
      await expect(page.getByText('Account Deleted!')).toBeVisible();
    });
  });
});