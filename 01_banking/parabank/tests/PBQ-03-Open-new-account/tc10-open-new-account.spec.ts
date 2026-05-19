import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { OpenAccountPage } from '../../framework/ui/pages/open-account.page';

test.describe('PBQ-03 – Open New Account', () => {

  test('TC-10 | Successful account creation with valid data', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-03 Open New Account');
    await testCaseId('TC-10');
    await severity('critical');

    const openAccountPage = new OpenAccountPage(page);

    await step('Navigate to Open New Account page', async () => {
      await openAccountPage.goto();
    });

    await step('Open a new checking account', async () => {
      await openAccountPage.openAccount('0');
    });

    await step('Verify account creation success', async () => {
      await openAccountPage.expectSuccess();
    });
  });

});