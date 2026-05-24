import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { BillPayPage } from '../../framework/ui/pages/bill-pay.page';
import { buildPayee } from '../../framework/data/payee.factory';

test.describe('PBQ-05 – Bill Pay', () => {

  test('TC-20 | Bill payment with negative amount', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-05 Bill Pay');
    await testCaseId('TC-20');
    await severity('normal');

    const billPayPage = new BillPayPage(page);
    const payee = buildPayee({ amount: '-500' });

    await step('Navigate to Bill Pay page', async () => {
      await billPayPage.goto();
    });

    await step('Submit payment with negative amount', async () => {
      await billPayPage.fillAndSubmit(payee);
    });

    await step('Verify payment is rejected', async () => {
      await billPayPage.expectValidationError('Amount must be greater than 0');
    });
  });

});