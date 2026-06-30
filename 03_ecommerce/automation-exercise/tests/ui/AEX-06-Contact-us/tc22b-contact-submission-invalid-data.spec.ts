import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { ContactPage } from '../../../framework/ui/pages/contact.page';
import { buildUser } from '../../../framework/data/user.factory';

const user = buildUser();

test.describe('AEX-06 – Contact us', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

  test('TC-22b | Contact submission with invalid data', async ({ page }) => {

    const contactPage = new ContactPage(page);

    await epic('UI Testing');
    await story('AEX-06 Contact us');
    await testCaseId('TC-22b');
    await severity('normal');

    await step('Navigate to contact page', async () => {
      await contactPage.goto();
    });

    await step('Fill contact form', async () => {
          await contactPage.fillContactForm({
            name: user.name,
            email: 'Invalid-email',
            subject: 'Test inquiry',
            message: 'This is a test message from Playwright automation',
          });
    });

    await step('Submit contact form', async () => {
      await contactPage.submitForm();
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