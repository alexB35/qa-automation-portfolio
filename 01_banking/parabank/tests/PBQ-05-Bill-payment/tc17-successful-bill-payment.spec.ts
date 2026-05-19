import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { BillPayPage } from '../../framework/ui/pages/bill-pay.page';
import { buildPayee } from '../../framework/data/payee.factory';

test.describe('PBQ-05 – Bill Pay', () => {

  test('TC-17 | Successful bill payment with valid data', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-05 Bill Pay');
    await testCaseId('TC-17');
    await severity('critical');

    const billPayPage = new BillPayPage(page);
    const payee = buildPayee({ amount: '100' });

    await step('Navigate to Bill Pay page', async () => {
      await billPayPage.goto();
    });

    await step('Fill and submit bill payment form', async () => {
      await billPayPage.fillAndSubmit(payee);
    });

    await step('Verify payment completed successfully', async () => {
      await billPayPage.expectSuccess(payee);
    });
  });

});