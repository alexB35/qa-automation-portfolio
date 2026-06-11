import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { UpdateProfilePage } from '../../framework/ui/pages/update-profile.page';

test.describe('PBQ-07 – Update Contact Info', () => {

  test('TC-26 | Update contact information with invalid data', async ({ page, registeredUser }) => {
    await epic('EPIC-1 - USER MANAGEMENT');
    await story('PBQ-07 Update Contact Info');
    await testCaseId('TC-26');
    await severity('normal');

    const updateProfilePage = new UpdateProfilePage(page);

    await step('Navigate to Update Profile page', async () => {
      await updateProfilePage.goto();
    });

    await step('Clear all required fields and submit', async () => {
      await updateProfilePage.fillAndSubmit({
        firstName: 'John123!?',
        lastName: 'Does456!?*',
        address:   '456 Invalid St. @!?**',
        city:    'AAAAAAA!?**',
        state:   'ZZ!?**',
        zipCode: '999999¨%$$',
        phone:   '00000000@!?**',
      });
    });

    await step('Verify validation errors are displayed', async () => {
      await updateProfilePage.expectValidationErrors();
    });
  });

});