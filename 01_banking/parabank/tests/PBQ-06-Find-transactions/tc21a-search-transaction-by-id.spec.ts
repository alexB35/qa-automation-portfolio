import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { FindTransactionsPage } from '../../framework/ui/pages/find-transactions.page';

test.describe('PBQ-06 – Find Transactions', () => {

  test('TC-21a | Search transactions by ID', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - FUNDS MANAGEMENT');
    await story('PBQ-06 Find Transactions');
    await testCaseId('TC-21a');
    await severity('normal');

    const findPage = new FindTransactionsPage(page);

    await step('Navigate to Find Transactions page', async () => {
      await findPage.goto();
      await findPage.selectFirstAccount();
    });

    await step('Search by valid transaction ID', async () => {
      await findPage.searchById('00001');
    });

    await step('Verify results table is displayed', async () => {
      await findPage.expectResultsTable();
    });
  });

});