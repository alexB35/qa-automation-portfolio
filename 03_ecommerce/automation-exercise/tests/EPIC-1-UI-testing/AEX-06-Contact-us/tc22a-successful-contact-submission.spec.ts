import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { dismissGDPR } from '../../../framework/ui/helpers/ui-helpers';
import { BASE_URL } from '../../../resources/config/urls';
import { buildUser } from '../../../framework/data/user.factory';
import path from 'path';

// ── Test Data ──────────────────────────────────────────────────────────────

const user = buildUser();
const filePath = path.resolve(process.cwd(), '03_ecommerce/automation-exercise/resources/test-data/attachment_file.txt');


// ── TC-22a | Successful contact submission ──────────────────────────────────
test.describe('AEX-06 – Contact us', () => {

// ── Configuration ──────────────────────────────────────────────────
    test.use({ storageState: { cookies: [], origins: [] } });


// ── Tests ──────────────────────────────────────────────────────────
  test('TC-22a | Successful contact submission with valid data', async ({ page }) => {

    await epic('UI Testing');
    await story('AEX-06 Contact us');
    await testCaseId('TC-22a - Successful contact submission');
    await severity('high');

    await step('Navigate to homepage', async () => {
      await page.goto(BASE_URL);
      await dismissGDPR(page);
    });

    await step('Navigate to the contact page', async () => {
      await page.getByRole('link', { name: 'Contact us' }).click();
      await expect(page.getByText('Get In Touch')).toBeVisible();
    });

    await step('Submit contact form', async () => {
      await page.locator('input[data-qa="name"]').fill(user.name);
      await page.locator('input[data-qa="email"]').fill(user.email);
      await page.locator('input[data-qa="subject"]').fill('Test inquiry');
      await page.locator('textarea[data-qa="message"]').fill('This is a test message from Playwright automation');
      await page.locator('input[name="upload_file"]').setInputFiles(filePath);
      await page.waitForLoadState('domcontentloaded');
      page.once('dialog', async dialog => {
        await dialog.accept();
      });
      await page.click('input[data-qa="submit-button"]');
    }); 

    await step('Verify contact form submitted successfully', async () => {
      await expect(page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();
    });
  });
});