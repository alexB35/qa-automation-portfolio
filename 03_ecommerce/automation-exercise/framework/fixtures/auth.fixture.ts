import { test as base } from './user.fixture';
import type { UserBase } from '../data/user.base';

export const test = base.extend<{
  authUser: UserBase;
}>({
  authUser: async (
    { page, user }: { page: any; user: UserBase },
    use: (user: UserBase) => Promise<void>
  ) => {

    await page.goto('/login');

    await page.fill('[data-qa="login-email"]', user.email);
    await page.fill('[data-qa="login-password"]', user.password);
    await page.click('[data-qa="login-button"]');

    await use(user);
  }
});