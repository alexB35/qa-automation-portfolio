import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { FindTransactionsPage } from '../../framework/ui/pages/find-transactions.page';

test.describe('PBQ-06 – Find Transactions', () => {

  test('TC-21b | Search transactions with invalid ID format', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - FUNDS MANAGEMENT');
    await story('PBQ-06 Find Transactions');
    await testCaseId('TC-21b');
    await severity('minor');

    const findPage = new FindTransactionsPage(page);

    await step('Navigate to Find Transactions page', async () => {
      await findPage.goto();
      await findPage.selectFirstAccount();
    });

    await step('Search by invalid transaction ID format', async () => {
      await findPage.searchById('00AX');
    });

    await step('Verify error message is displayed', async () => {
      await findPage.expectError('Invalid transaction ID');
    });
  });

});