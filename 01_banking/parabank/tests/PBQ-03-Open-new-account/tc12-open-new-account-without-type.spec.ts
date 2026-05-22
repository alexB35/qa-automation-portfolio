import { test } from '../../framework/fixtures/logged-in-user.fixture';
import { epic, story, testCaseId, severity, step } from 'allure-js-commons';
import { OpenAccountPage } from '../../framework/ui/pages/open-account.page';

test.skip('TC-12 | Open account without selecting account type — not testable (automatically pre-selected)', async () => {
  // Account type is automatically pre-selected by ParaBank on page load.
  // It is not possible to submit the form without a selection — the UI
  // does not expose this state. Marked as not testable at UI level.
});