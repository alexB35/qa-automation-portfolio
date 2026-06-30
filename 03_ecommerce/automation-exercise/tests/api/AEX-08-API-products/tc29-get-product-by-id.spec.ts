import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step, issue } from 'allure-js-commons';
import { getProductById, ProductByIdResult } from '../../../framework/api/product.api';
 
test.describe('AEX-08 – API Products', () => {

  test('TC-29 | GET product by ID', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-08 API Products');
    await story('TC-29');
    await severity('critical');
    await issue('AEX-B-04 - API No ID endpoint', 'https://alexb35.atlassian.net/browse/AEX-62');
 
    let result: ProductByIdResult;

    await step('Send GET request to /api/productsList/{id} with valid ID', async () => {
      result = await getProductById(request, 1);
    });

    await step('Verify response returns product details for ID 1', async () => {
      expect(result.statusCode).toBe(200);
      expect(result.body).not.toBeNull();
      expect(result.body?.product).toHaveProperty('id', 1);
    });
  });
});