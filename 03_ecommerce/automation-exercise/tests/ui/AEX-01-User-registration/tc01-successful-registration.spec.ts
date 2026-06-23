import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/register.fixture';
import { BASE_URL } from '../../../resources/urls';


test.describe('AEX-01 – User Registration', () => {

  test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-01 | Successful registration', async ({ page, registeredUser }) => {

    await epic('UI Testing');
    await story('AEX-01 User Registration');
    await testCaseId('TC-01');
    await severity('critical');

    await step('Verify account created and user is logged in', async () => {
      await expect(page.getByText(`Logged in as ${registeredUser.name}`)).toBeVisible();
    });

    await step('Verify redirect to homepage', async () => {
      await expect(page).toHaveURL(BASE_URL + '/');
    });
  });
});