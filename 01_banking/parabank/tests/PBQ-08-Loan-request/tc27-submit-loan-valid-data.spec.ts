import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { LoanRequestPage } from '../../framework/ui/pages/loan-request.page';

test.describe('PBQ-08 – Loan Request', () => {

  test('TC-27 | Submit loan request with valid data', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - FUNDS MANAGEMENT');
    await story('PBQ-08 Loan Request');
    await testCaseId('TC-27');
    await severity('critical');

    const loanPage = new LoanRequestPage(page);

    await step('Navigate to Loan Request page', async () => {
      await loanPage.goto();
    });

    await step('Submit loan request with valid data', async () => {
      await loanPage.applyForLoan('600', '100');
    });

    await step('Verify loan is approved', async () => {
      await loanPage.expectApproved();
    });
  });

});