import { epic, story, testCaseId, severity, step, issue } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';
import { RegisterPage } from '../../../framework/ui/pages/register.page';

// ── Test Data ──────────────────────────────────────────────────────────────


// ── TC-03 | Invalid date of birth ─────────────────────────────────────
test.describe('AEX-01 – User Registration', () => {

// ── Configuration ────────────────────────────────────────────────── 
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
test('TC-03 | Invalid data - date of birth : February 31st', async ({ page }) => {
 
  const registerPage = new RegisterPage(page);
  const user = buildUser();

  await epic('UI Testing');
    await story('AEX-01 User Registration');
    await testCaseId('TC-03 - Invalid data - date of birth');
    await severity('medium');
    await issue('AEX-B-01 - Invalid date of birth during registration', 'https://alexb35.atlassian.net/browse/AEX-5');
 
    await step('Navigate to login/signup page', async () => {
      await page.goto(URLS.loginUrl);
      await dismissGDPR(page);
      await expect(page.getByText('New User Signup!')).toBeVisible();
    });
 
    await step('Enter name and email then proceed', async () => {
      await page.locator('input[data-qa="signup-name"]').fill(user.name);
      await page.locator('input[data-qa="signup-email"]').fill(user.email);
      await page.locator('button[data-qa="signup-button"]').click();
      await expect(page.getByText('Enter Account Information')).toBeVisible();
    });
 
    await step('Fill form with February 31st as date of birth', async () => {     
      await registerPage.fillRegistrationForm({ ...user, day: '31', month: 'February', year: '2000' });
    });
 
    await step('Verify invalid date rejected', async () => {
      await expect(page.getByText('Invalid date of birth')).toBeVisible();
    });
  });
});