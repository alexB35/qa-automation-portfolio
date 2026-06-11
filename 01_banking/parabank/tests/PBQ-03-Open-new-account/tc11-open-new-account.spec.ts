import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { OpenAccountPage } from '../../framework/ui/pages/open-account.page';

test.describe('PBQ-03 – Open New Account', () => {

  test('TC-11 | Successful account creation', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - FUNDS MANAGEMENT');
    await story('PBQ-03 Open New Account');
    await testCaseId('TC-11');
    await severity('critical');

    const openAccountPage = new OpenAccountPage(page);

    await step('Navigate to Open New Account page', async () => {
      await openAccountPage.goto();
    });

    await step('Open a new checking account', async () => {
      await openAccountPage.openAccount(/*'0'*/);
    });

    await step('Verify account creation success', async () => {
      await openAccountPage.expectSuccess();
    });
  });

});