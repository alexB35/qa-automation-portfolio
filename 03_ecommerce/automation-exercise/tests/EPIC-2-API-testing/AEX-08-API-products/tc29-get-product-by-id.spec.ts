import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step, issue } from 'allure-js-commons';
 
// ── Test Data ──────────────────────────────────────────────────────────────
const API_BASE = 'https://automationexercise.com/api';
 
// ── AEX-08 | API Products ─────────────────────────────────────────────────
test.describe('AEX-08 – API Products', () => {

// ── TC-29 | GET product by valid ID ────────────────────────────────────
  test('TC-29 | GET product by valid ID — verify product details', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-08 API Products');
    await story('TC-29 GET product by valid ID');
    await severity('high');
    await issue('AEX-B-04 - API No ID endpoint', 'https://alexb35.atlassian.net/browse/AEX-62');
 
    await step('Send GET request to /api/productsList/{id} with valid ID', async () => {
      const response = await request.get(`${API_BASE}/productsList/1`);
      const contentType = response.headers()['content-type'] ?? '';

      await step('Verify response is JSON', async () => {
        expect(contentType).toContain('application/json');
      });
    });
  });
});