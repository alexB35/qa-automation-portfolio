import { test, expect } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { OpenAccountPage } from '../../framework/ui/pages/open-account.page';
import { URLS } from '../../resources/urls';

test.describe('PBQ-03 – Open New Account', () => {

  test('TC-12 | New account appears in accounts overview after creation', async ({ page, loggedInUserWithAccount }) => {

    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-03 Open New Account');
    await testCaseId('TC-12');
    await severity('normal');

    const openAccountPage = new OpenAccountPage(page);
    let newAccountId: string;

    await step('Navigate to Open New Account page', async () => {
      await openAccountPage.goto();
    });

    await step('Open a new checking account', async () => {
      await openAccountPage.openAccount('0');
      await openAccountPage.expectSuccess();
      newAccountId = await openAccountPage.getNewAccountId();
    });

    await step('Navigate to Accounts Overview', async () => {
      await page.goto(URLS.overviewUrl);
    });

    await step('Verify new account appears in overview', async () => {
      await expect(page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();
      await expect(page.getByText(newAccountId!, { exact: true })).toBeVisible();
    });
  });

});