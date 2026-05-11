import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { BASE_URL } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';

// ── Test Data ──────────────────────────────────────────────────────────────
const user = buildUser();

// ── TC-23 | Newsletter subscription ────────────────────────────────────────────
test.describe('AEX-06 – Contact Us', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });


// ── Tests ──────────────────────────────────────────────────────────
test('TC-23 | Newsletter subscription', async ({ page }) => {
 
    await epic('UI Testing');
    await story('AEX-06 Contact Us');
    await testCaseId('TC-23 - Newsletter subscription');
    await severity('low');
 
    await step('Navigate to homepage', async () => {
      await page.goto(BASE_URL);
      await dismissGDPR(page);
    });

    await step('Subscribe to newsletter', async () => {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      const emailInput = page.locator('#susbscribe_email');
      await expect(emailInput).toBeVisible();
      await emailInput.fill(user.email);
      await page.locator('button[id="subscribe"]').click();
    });

    await step('Verify successful subscription', async () => {
      await expect(page.getByText(`You have been successfully subscribed!`)).toBeVisible();
    });

  });
});