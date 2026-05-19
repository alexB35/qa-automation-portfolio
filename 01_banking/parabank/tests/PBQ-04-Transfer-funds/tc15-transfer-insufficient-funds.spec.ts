import { test, expect } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { TransferPage } from '../../framework/ui/pages/transfer.page';
import { URLS } from '../../resources/urls';

test.describe('PBQ-04 – Transfer Funds', () => {

  test('TC-15 | Transfer with insufficient funds should be rejected [BUG PBQ-B03]', async ({ page, loggedInUserWithAccount: _ }) => {
    await epic('EPIC-2 - ACCOUNT MANAGEMENT');
    await story('PBQ-04 Transfer Funds');
    await testCaseId('TC-15');
    await severity('normal');

    const transferPage = new TransferPage(page);
    let totalBalance = 0;

    await step('Get total balance across all accounts', async () => {
      await page.goto(URLS.overviewUrl);
      const balanceTexts = await page.locator('table#accountTable tbody tr td:nth-child(2)').allTextContents();
      for (const text of balanceTexts) {
        const amount = parseFloat(text.replace(/[$,]/g, ''));
        if (!isNaN(amount)) totalBalance += amount;
      }
    });

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