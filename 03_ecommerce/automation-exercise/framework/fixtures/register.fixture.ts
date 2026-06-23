import { expect } from '@playwright/test';
import { test as base } from './no-ads.fixture';
import { buildUser } from '../data/user.factory';
import type { UserBase } from '../data/user.base';
import { RegisterPage } from '../ui/pages/register.page';
import { LoginPage } from '../ui/pages/login.page';
import { createUser, deleteUser } from '../api/user.api';
import { request } from '@playwright/test';
import { URLS } from '../../resources/urls';
import { dismissGDPR } from '../ui/helpers/ui-helpers';

type Fixtures = {
  existingUser:   UserBase;
  registeredUser: UserBase;
  loggedInUser:   UserBase;
};

export const test = base.extend<Fixtures>({

  // ── User created via API + teardown ───────────────────────────────
  existingUser: [async ({}, use) => {
    const apiContext = await request.newContext();
    const user = buildUser();

    const response = await createUser(apiContext, user);
    if (response.responseCode !== 201) {
      throw new Error(`Setup failed: ${response.message}`);
    }

    await use(user);

    await deleteUser(apiContext, user.email, user.password);
    await apiContext.dispose();
  }, { scope: 'test' }],

  // ── User registered via UI ─────────────────────────────────────────
  registeredUser: [async ({ page }, use) => {
    const user = buildUser();
    const registerPage = new RegisterPage(page);

    await page.goto(URLS.loginUrl);
    await dismissGDPR(page);
    await registerPage.goToSignupPage();
    await registerPage.fillSignupNameAndEmail(user.name, user.email);
    await registerPage.fillRegistrationForm(user);
    await registerPage.clickContinue();

    await use(user);
  }, { scope: 'test' }],

  // ── User created via API + logged in via UI ───────────────────────
  loggedInUser: [async ({ page }, use) => {
    const apiContext = await request.newContext();
    const user = buildUser();

    const response = await createUser(apiContext, user);
    if (response.responseCode !== 201) {
      throw new Error(`Setup failed: ${response.message}`);
    }

    const loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await dismissGDPR(page);
    await loginPage.login(user.email, user.password);

    await use(user);

    await apiContext.dispose();
  }, { scope: 'test' }],

});

export { expect } from '@playwright/test';