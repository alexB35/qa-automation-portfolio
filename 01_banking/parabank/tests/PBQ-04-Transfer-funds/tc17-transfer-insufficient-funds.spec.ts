import { test, expect } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { TransferPage } from '../../framework/ui/pages/transfer.page';

test.describe('PBQ-04 – Transfer Funds', () => {

  test('TC-17 | Transfer with insufficient funds', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-04 Transfer Funds');
    await testCaseId('TC-17');
    await severity('normal');

    const transferPage = new TransferPage(page);

    await step('Navigate to Transfer Funds page', async () => {
      await transferPage.goto();
    });

    await step('Submit transfer with amount exceeding total balance', async () => {
      await transferPage.transfer('999999');
    });

    await step('Verify transfer is rejected', async () => {
      await expect(page.getByText('Insufficient funds')).toHaveCount(1);
    });
  });

});