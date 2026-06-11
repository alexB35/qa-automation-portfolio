import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { FindTransactionsPage } from '../../framework/ui/pages/find-transactions.page';

test.describe('PBQ-06 – Find Transactions', () => {

  test('TC-22 | Search transactions by date', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - FUNDS MANAGEMENT');
    await story('PBQ-06 Find Transactions');
    await testCaseId('TC-22');
    await severity('critical');

    const findPage = new FindTransactionsPage(page);

    await step('Navigate to Find Transactions page', async () => {
      await findPage.goto();
      await findPage.selectFirstAccount();
    });

    await step('Search by date', async () => {
      await findPage.searchByDate(new Date().toLocaleDateString()); 
    });

    await step('Verify results table is displayed', async () => {
      await findPage.expectResultsTable();
    });
  });

});