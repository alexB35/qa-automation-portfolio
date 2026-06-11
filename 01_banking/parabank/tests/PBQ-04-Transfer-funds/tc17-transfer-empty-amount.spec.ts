import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { TransferPage } from '../../framework/ui/pages/transfer.page';

test.describe('PBQ-04 – Transfer Funds', () => {

  test('TC-17 | Transfer with empty amount field', async ({ page, loggedInUserWithAccount}) => {
    await epic('EPIC-2 - FUNDS MANAGEMENT');
    await story('PBQ-04 Transfer Funds');
    await testCaseId('TC-17');
    await severity('normal');

    const transferPage = new TransferPage(page);

    await step('Navigate to Transfer Funds page', async () => {
      await transferPage.goto();
    });

    await step('Submit transfer with empty amount', async () => {
      await transferPage.transfer('');
    });

    await step('Verify error message is displayed', async () => {
      await transferPage.expectError('An internal error has occurred and has been logged.');
    });
  });

});