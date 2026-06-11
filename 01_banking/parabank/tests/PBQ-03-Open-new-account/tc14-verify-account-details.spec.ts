import { test, expect } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { OpenAccountPage } from '../../framework/ui/pages/open-account.page';
import { URLS } from '../../resources/urls';

test.describe('PBQ-03 – Open New Account', () => {

  test('TC-14 | Verify account details page', async ({ page, loggedInUserWithAccount }) => {

    await epic('EPIC-2 - FUNDS MANAGEMENT');
    await story('PBQ-03 Open New Account');
    await testCaseId('TC-14');
    await severity('normal');

    const openAccountPage = new OpenAccountPage(page);
    let newAccountId: string;

    await step('Navigate to Open New Account page', async () => {
      await openAccountPage.goto();
    });

    await step('Open a new checking account', async () => {
      await openAccountPage.openAccount(/*'0'*/);
      await openAccountPage.expectSuccess();
      newAccountId = await openAccountPage.getNewAccountId();
    });

    await step('Navigate to account details via overview', async () => {
      await page.goto(URLS.overviewUrl);
      await page.getByText(newAccountId!, { exact: true }).click();
    });

    await step('Verify account details page displays correct information', async () => {
      await expect(page.getByText('Account Details')).toBeVisible();
      await expect(page.getByText('Account Number:')).toBeVisible();
      await expect(page.getByText('Account Type:')).toBeVisible();
      await expect(page.getByText('Balance:')).toBeVisible();
      await expect(page.getByText('Available:')).toBeVisible();
      await expect(page.getByText('Account Activity')).toBeVisible();
    });
  });

});