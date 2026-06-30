import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { test, expect } from '../../../framework/fixtures/no-ads.fixture';
import { HomePage } from '../../../framework/ui/pages/home.page';
import { buildUser } from '../../../framework/data/user.factory';

const user = buildUser();

test.describe('AEX-06 – Contact us', () => {

    test.use({ storageState: { cookies: [], origins: [] } });

test('TC-23 | Newsletter subscription', async ({ page }) => {

  const homePage = new HomePage(page);
 
    await epic('UI Testing');
    await story('AEX-06 Contact Us');
    await testCaseId('TC-23');
    await severity('minor');
 
    await step('Navigate to homepage', async () => {
      await homePage.goto();
    });

    await step('Subscribe to newsletter', async () => {
      await homePage.subscribeToNewsletter(user.email);
    });

    await step('Verify successful subscription', async () => {
      await expect(page.getByText(`You have been successfully subscribed!`)).toBeVisible();
    });

  });
});