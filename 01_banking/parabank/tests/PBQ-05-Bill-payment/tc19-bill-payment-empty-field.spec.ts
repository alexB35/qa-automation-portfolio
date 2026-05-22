import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { BillPayPage } from '../../framework/ui/pages/bill-pay.page';
import { buildPayee } from '../../framework/data/payee.factory';

test.describe('PBQ-05 – Bill Pay', () => {

  test('TC-18 | Bill payment with empty amount shows validation error', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-05 Bill Pay');
    await testCaseId('TC-18');
    await severity('normal');

    const billPayPage = new BillPayPage(page);
    const payee = buildPayee({ amount: undefined });

    await step('Navigate to Bill Pay page', async () => {
      await billPayPage.goto();
    });

    await step('Submit payment with empty amount', async () => {
      await billPayPage.fillAndSubmit(payee);
    });

    await step('Verify validation error is displayed', async () => {
      await billPayPage.expectValidationError('The amount cannot be empty.');
    });
  });

});