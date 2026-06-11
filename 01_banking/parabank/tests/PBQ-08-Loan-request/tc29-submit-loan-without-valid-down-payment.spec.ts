import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { LoanRequestPage } from '../../framework/ui/pages/loan-request.page';

test.describe('PBQ-08 – Loan Request', () => {

  test('TC-29 | Submit loan request without valid down payment', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - FUNDS MANAGEMENT');
    await story('PBQ-08 Loan Request');
    await testCaseId('TC-29');
    await severity('critical');

    const loanPage = new LoanRequestPage(page);

    await step('Navigate to Loan Request page', async () => {
      await loanPage.goto();
    });

    await step('Submit loan request with insufficient down payment', async () => {
      await loanPage.applyForLoan('600000', '100');
    });

    await step('Verify loan is denied', async () => {
      await loanPage.expectDenied();
    });
  });

});