import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ContactPage } from '../../../framework/ui/pages/contact.page';
import { buildUser } from '../../../framework/data/user.factory';
import path from 'path';

const user = buildUser();
const filePath = path.resolve(process.cwd(), '03_ecommerce/automation-exercise/resources/test-data/attachment_file.txt');

test.describe('AEX-06 – Contact us', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-22a | Successful contact submission', async ({ page }) => {

    const contactPage = new ContactPage(page);

    await epic('UI Testing');
    await story('AEX-06 Contact us');
    await testCaseId('TC-22a');
    await severity('critical');

    await step('Navigate to contact page', async () => {
      await contactPage.goto();
    });

    await step('Fill contact form', async () => {
      await contactPage.fillContactForm({
        name: user.name,
        email: user.email,
        subject: 'Test inquiry',
        message: 'This is a test message from Playwright automation',
        filePath,
      });
    });

    await step('Submit contact form', async () => {
      await contactPage.submitForm();
    }); 

    await step('Verify contact form submitted successfully', async () => {
      await expect(page.locator('#contact-page').getByText('Success! Your details have been submitted successfully.')).toBeVisible();
    });
  });
});