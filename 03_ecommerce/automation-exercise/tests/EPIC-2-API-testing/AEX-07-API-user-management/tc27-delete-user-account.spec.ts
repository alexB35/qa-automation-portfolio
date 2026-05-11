import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { buildUser } from '../../../framework/data/user.factory';
import { createUser, deleteUser } from '../../../framework/api/user.api';

// ── Test Data ──────────────────────────────────────────────────────────────
const API_BASE = 'https://automationexercise.com/api';
const user = buildUser();

// ── AEX-07 | API User Management ─────────────────────────────────────────
test.describe('AEX-07 – API User Management', () => {
 
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ request }) => {
    const result = await createUser(request, user);
    expect(result).toHaveProperty('responseCode', 201);
  });

// ── TC-27 | DELETE user account ─────────────────────────────────────────
  test('TC-27 | DELETE user account via API', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-27 DELETE user account');
    await severity('high');
 
    await step('Send DELETE request to /api/deleteAccount', async () => {
      const result = await deleteUser(request, user.email, user.password);
 
      await step('Verify response code is 200 and account deleted', async () => {
        expect(result).toHaveProperty('responseCode', 200);
        expect(result.message).toBe('Account deleted!');
      });
    });
  });
 
});