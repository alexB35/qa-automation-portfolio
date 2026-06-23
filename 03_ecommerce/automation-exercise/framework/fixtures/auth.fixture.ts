import { test as base } from './user.fixture';
import type { UserBase } from '../data/user.base';
import { LoginPage } from '../ui/pages/login.page';

export const test = base.extend<{
  authUser: UserBase;
}>({
  authUser: async (
    { page, user }: { page: any; user: UserBase },
    use: (user: UserBase) => Promise<void>
  ) => {

    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(user.email, user.password);

    await use(user);
  }
});