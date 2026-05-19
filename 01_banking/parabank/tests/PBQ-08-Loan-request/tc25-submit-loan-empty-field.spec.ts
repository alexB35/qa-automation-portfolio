import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { LoanRequestPage } from '../../framework/ui/pages/loan-request.page';

// ── BUG PBQ-B05 : Empty loan amount triggers internal error instead of validation message
// Expected : field-level validation error (e.g. "Loan amount is required.")
// Actual   : generic internal error — no user-friendly feedback

test.describe('PBQ-08 – Loan Request', () => {

  test('TC-25 | Empty loan amount triggers internal error [BUG PBQ-B05]', async ({ page, loggedInUserWithAccount }) => {
    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-08 Loan Request');
    await testCaseId('TC-25');
    await severity('normal');

    const loanPage = new LoanRequestPage(page);

    await step('Navigate to Loan Request page', async () => {
      await loanPage.goto();
    });

    await step('Submit loan request without loan amount', async () => {
      await loanPage.applyForLoan('', '100');
    });

    await step('Verify internal error is displayed instead of validation', async () => {
      await loanPage.expectInternalError();
    });
  });

});