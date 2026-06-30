import { test, expect } from '@playwright/test';
import { epic, feature, story, severity, step } from 'allure-js-commons';
import { searchProduct, ProductsListResponse } from '../../../framework/api/product.api';
import { ApiResponse } from '../../../framework/api/user.api';

const SEARCH_TERM = 'top';

test.describe('AEX-08 – API Products', () => {

  test('TC-30a | POST search product by name', async ({ request }) => {
 
    await epic('API Testing');
    await feature('AEX-08 API Products');
    await story('TC-30a');
    await severity('critical');

    let result: ProductsListResponse | ApiResponse;
 
    await step('Send POST request to /api/searchProduct with search_product=top', async () => {
      result = await searchProduct(request, SEARCH_TERM);
    });
 
    await step('Verify status code is 200 and results returned', async () => {
      const products = result as ProductsListResponse;
      expect(products).toHaveProperty('responseCode', 200);
      expect(products).toHaveProperty('products');
      expect(Array.isArray(products.products)).toBeTruthy();
      expect(products.products.length).toBeGreaterThan(0);
    });
  });
});