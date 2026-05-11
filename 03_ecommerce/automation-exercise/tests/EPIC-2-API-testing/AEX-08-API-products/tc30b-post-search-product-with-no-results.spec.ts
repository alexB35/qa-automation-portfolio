import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
 
// ── Test Data ──────────────────────────────────────────────────────────────
const API_BASE = 'https://automationexercise.com/api';
 
// ── AEX-08 | API Products ─────────────────────────────────────────────────
test.describe('AEX-08 – API Products', () => {

// ── TC-30b | POST search without parameter ──────────────────────────────
  test('TC-30b | POST search with no results — missing parameter returns 400', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-08 API Products');
    await story('TC-30b POST search missing parameter');
    await severity('medium');
 
    await step('Send POST request to /api/searchProduct without parameter', async () => {
      const response = await request.post(`${API_BASE}/searchProduct`);
      const body = await response.json();
 
      await step('Verify response code is 400 with error message', async () => {
        expect(body).toHaveProperty('responseCode', 400);
        expect(body.message).toContain('Bad request');
      });
    });
  });
});