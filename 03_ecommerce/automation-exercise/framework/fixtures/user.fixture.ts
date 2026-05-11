import { test as base, request, APIRequestContext, APIResponse } from '@playwright/test';
import { createUser } from '../api/user.api';
import { buildUser } from '../data/user.factory';

type User = ReturnType<typeof buildUser>;

export const test = base.extend<{
  user: User;
}>({
  user: async ({}, use: (user: User) => Promise<void>) => {

    const apiContext: APIRequestContext = await request.newContext();

    const user = buildUser();

// ── Create user ─────────────────────────────
    const response = await createUser(apiContext, user);

    if (response.responseCode !== 201) {
      throw new Error(`User creation failed: ${response.message}`);
    }

// ── Use in test ─────────────────────────────
  await use(user);

// ── Cleanup ─────────────────────────────
    const deleteResponse = await apiContext.post(
      'https://automationexercise.com/api/deleteAccount',
      {
        form: { email: user.email, password: user.password }
      }
    );

    const deleteBody = await deleteResponse.json();

    if (deleteBody.responseCode !== 200) {
      console.warn('User cleanup failed:', deleteBody);
    }

    await apiContext.dispose();
  }
});