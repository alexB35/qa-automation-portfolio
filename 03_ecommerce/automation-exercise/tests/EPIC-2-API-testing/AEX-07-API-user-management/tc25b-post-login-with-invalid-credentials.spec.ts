import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';

// ── Test Data ──────────────────────────────────────────────────────────────
const API_BASE = 'https://automationexercise.com/api';

// ── AEX-07 | API User Management ─────────────────────────────────────────
test.describe('AEX-07 – API User Management', () => {
 
  test.describe.configure({ mode: 'serial' });
  
// ── TC-25b | POST login with invalid credentials ─────────────────────────
  test('TC-25b | POST login with invalid credentials', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-07 API User Management');
    await story('TC-25b POST login invalid');
    await severity('medium');
 
    await step('Send POST request to /api/verifyLogin with invalid credentials', async () => {
      const response = await request.post(`${API_BASE}/verifyLogin`, {
        form: {
          email: 'unknown@test.com',
          password: 'WrongPass123!',
        },
      });
 
      await step('Verify response code is 404 and user not found', async () => {
        const body = await response.json();
        expect(body).toHaveProperty('responseCode', 404);
        expect(body.message).toBe('User not found!');
      });
    });
  }); 
});