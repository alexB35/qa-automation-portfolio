import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { TransferPage } from '../../framework/ui/pages/transfer.page';

test.describe('PBQ-04 – Transfer Funds', () => {

  test('TC-14 | Successful fund transfer between accounts', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-04 Transfer Funds');
    await testCaseId('TC-14');
    await severity('critical');

    const transferPage = new TransferPage(page);

    await step('Navigate to Transfer Funds page', async () => {
      await transferPage.goto();
    });

    await step('Transfer $100 between accounts', async () => {
      await transferPage.transfer('100');
    });

    await step('Verify transfer completed successfully', async () => {
      await transferPage.expectSuccess();
    });
  });

});