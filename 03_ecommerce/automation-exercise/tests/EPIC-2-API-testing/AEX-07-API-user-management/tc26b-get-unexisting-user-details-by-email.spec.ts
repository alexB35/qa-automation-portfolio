import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
 
// ── Test Data ──────────────────────────────────────────────────────────────
const API_BASE = 'https://automationexercise.com/api';

// ── AEX-07 | API User Management ─────────────────────────────────────────
test.describe('AEX-07 – API User Management', () => {
 
  test.describe.configure({ mode: 'serial' });

// ── TC-26b | GET unexisting user details by email ────────────────────────
  test('TC-26b | GET unexisting user details by email', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-26b GET unexisting user details');
    await severity('medium');
 
    await step('Send GET request with unknown email', async () => {
      const response = await request.get(`${API_BASE}/getUserDetailByEmail`, {
        params: { email: 'unknown_user_99999@test.com' },
      });
 
      await step('Verify response code is 404 and account not found', async () => {
        const body = await response.json();
        expect(body).toHaveProperty('responseCode', 404);
        expect(body.message).toContain('Account not found');
      });
    });
  });
});