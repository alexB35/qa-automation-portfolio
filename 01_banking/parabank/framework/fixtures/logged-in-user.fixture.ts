import { test as base, expect } from '@playwright/test';
import { buildUser } from '../data/user.factory';
import type { UserBase } from '../data/user.base';
import { RegisterPage } from '../ui/pages/register.page';
import { OpenAccountPage } from '../ui/pages/open-account.page';
import { TransferPage } from '../ui/pages/transfer.page';

  type Fixtures = {
  registeredUser:              UserBase;
  loggedInUserWithAccount:     UserBase;
  loggedInUserWithTransaction: UserBase;
};

export const test = base.extend<Fixtures>({

  registeredUser: [async ({ page }, use) => {
    const user = buildUser();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.fillAndSubmit(user);
    await expect(page.getByText('Your account was created successfully. You are now logged in.')).toHaveCount(1);
    await page.waitForLoadState('networkidle');
    await use(user);
  }, { scope: 'test' }],

  loggedInUserWithAccount: [async ({ page }, use) => {
    const user = buildUser();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.fillAndSubmit(user);
    await expect(page.getByText('Your account was created successfully. You are now logged in.')).toHaveCount(1);

    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.openAccount(/*'0'*/);
    await expect(page.getByText('Congratulations, your account is now open.')).toHaveCount(1);

    await use(user);
  }, { scope: 'test' }],

  loggedInUserWithTransaction: [async ({ page }, use) => {
    const user = buildUser();
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.fillAndSubmit(user);
    await expect(page.getByText('Your account was created successfully. You are now logged in.')).toHaveCount(1);

    const openAccountPage = new OpenAccountPage(page);
    await openAccountPage.goto();
    await openAccountPage.openAccount(/*'0'*/);
    await expect(page.getByText('Congratulations, your account is now open.')).toHaveCount(1);

    const transferPage = new TransferPage(page);
    await transferPage.goto();
    await transferPage.transfer('100');
    await expect(page.getByText('Transfer Complete!')).toHaveCount(1);

    await use(user);
  }, { scope: 'test' }],

});

export { expect } from '@playwright/test';