import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { searchProduct } from '../../../framework/api/product.api';
import { ApiResponse } from '../../../framework/api/user.api';
 
test.describe('AEX-08 – API Products', () => {

  test('TC-30b | POST search with no results', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-08 API Products');
    await story('TC-30b');
    await severity('normal');

    let result: ApiResponse;
 
    await step('Send POST request to /api/searchProduct without parameter', async () => {
      result = await searchProduct(request) as ApiResponse;
    });
 
    await step('Verify response code is 400 with error message', async () => {
      expect(result).toHaveProperty('responseCode', 400);
      expect(result.message).toContain('Bad request');
    });
  });
});