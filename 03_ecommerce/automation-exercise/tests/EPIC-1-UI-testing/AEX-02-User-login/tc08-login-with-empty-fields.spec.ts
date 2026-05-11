import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';

// ── Test Data ──────────────────────────────────────────────────────────────
const user = buildUser();

// ── TC-08 | Login with empty fields ────────────────────────────────────────────
test.describe('AEX-02 – User Login', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });
    
// ── Tests ──────────────────────────────────────────────────────────
test('TC-08 | Login with empty fields', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-02 User Login');
    await testCaseId('TC-08 - Login with empty fields');
    await severity('medium');
 
    await step('Navigate to login / signup page', async () => {
      await page.goto(URLS.loginUrl);
      await dismissGDPR(page);
      await page.locator('input[data-qa="login-email"]').fill(user.email);
      await page.locator('button[data-qa="login-button"]').click();
    });

    await step('Verify login blocked — password field required', async () => {
      await expect(page).toHaveURL(/login/);
      await expect(page.locator('input[data-qa="login-password"]:invalid')).toHaveCount(1);
    });
  });
});