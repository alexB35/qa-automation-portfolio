import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { BASE_URL } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';

// ── Test Data ──────────────────────────────────────────────────────────────

const user = buildUser();



// ── TC-21b | Contact submission with invalid data ──────────────────────────────────
test.describe('AEX-06 – Contact us', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });


// ── Tests ──────────────────────────────────────────────────────────
  test('TC-22b | Contact submission with invalid data', async ({ page }) => {

    await epic('UI Testing');
    await story('AEX-06 Contact us');
    await testCaseId('TC-22b - Contact submission with invalid data');
    await severity('medium');

    await step('Navigate to homepage', async () => {
      await page.goto(BASE_URL);
      await dismissGDPR(page);
      await expect(page).toHaveURL(BASE_URL + '/');
    });

    await step('Navigate to the contact page', async () => {
      await page.getByRole('link', { name: 'Contact us' }).click();
      await expect(page.getByText('Get In Touch')).toBeVisible();
    });

    await step('Submit contact form', async () => {
      await page.locator('input[data-qa="name"]').fill(user.name);
      const emailInput = page.locator('input[data-qa="email"]');
      await emailInput.fill('invalid-email');
      await page.locator('input[data-qa="subject"]').fill('Test inquiry');
      await page.locator('textarea[data-qa="message"]').fill('This is a test message from Playwright automation');
      await page.locator('input[data-qa="submit-button"]').click();
    }); 

    await step('Verify email validation error', async () => {
      const emailInput = page.locator('input[data-qa="email"]');
      const isValid = await emailInput.evaluate(
        (el: HTMLInputElement) => el.checkValidity()
      );
      expect(isValid).toBe(false);
    });
  });
});