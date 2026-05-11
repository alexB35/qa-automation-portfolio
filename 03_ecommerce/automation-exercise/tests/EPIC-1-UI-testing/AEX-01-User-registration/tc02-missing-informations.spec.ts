import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { URLS } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';

// ── Test Data ──────────────────────────────────────────────────────────────

  

// ── TC-02 | Missing informations ──────────────────────────────────────
test.describe('AEX-01 – User Registration', () => {
  
// ── Configuration ────────────────────────────────────────────────── 
    test.use({ storageState: { cookies: [], origins: [] } });

// ── Tests ──────────────────────────────────────────────────────────
  test('TC-02 | Missing informations — required fields validation', async ({ page }) => {
 
    const user = buildUser();

    await epic('UI Testing');
    await story('AEX-01 User Registration');
    await testCaseId('TC-02 - Missing informations');
    await severity('high');
 
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
 
    await step('Submit form with empty required fields', async () => {
      await page.locator('button[data-qa="create-account"]').scrollIntoViewIfNeeded();
      await page.locator('button[data-qa="create-account"]').click();
    });
 
    await step('Verify user stays on registration page — form not submitted', async () => {
      await expect(page).toHaveURL(/signup/);
      await expect(page.locator('input[data-qa="password"]:invalid')).toHaveCount(1);
    });
  });
});