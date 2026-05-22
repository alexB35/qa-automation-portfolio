import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { FindTransactionsPage } from '../../framework/ui/pages/find-transactions.page';

test.describe('PBQ-06 – Find Transactions', () => {

  test('TC-24 | Search transaction by amount', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-06 Find Transactions');
    await testCaseId('TC-24');
    await severity('minor');

    const findPage = new FindTransactionsPage(page);

    await step('Navigate to Find Transactions page', async () => {
      await findPage.goto();
      await findPage.selectFirstAccount();
    });

    await step('Search by invalid amount format', async () => {
      await findPage.searchByAmount('invalid');
    });

    await step('Verify error message is displayed', async () => {
      await findPage.expectError('Invalid amount format');
    });
  });

});