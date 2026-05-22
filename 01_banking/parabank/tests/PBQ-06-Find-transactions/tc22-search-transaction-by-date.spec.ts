import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { FindTransactionsPage } from '../../framework/ui/pages/find-transactions.page';

test.describe('PBQ-06 – Find Transactions', () => {

  test('TC-22 | Search transaction by date', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-06 Find Transactions');
    await testCaseId('TC-22');
    await severity('minor');

    const findPage = new FindTransactionsPage(page);

    await step('Navigate to Find Transactions page', async () => {
      await findPage.goto();
      await findPage.selectFirstAccount();
    });

    await step('Search by invalid date format', async () => {
      await findPage.searchByDate('00/00/0000');
    });

    await step('Verify error message is displayed', async () => {
      await findPage.expectError('Invalid date format');
    });
  });

});