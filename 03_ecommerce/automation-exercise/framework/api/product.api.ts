import { APIRequestContext } from '@playwright/test';
import { API_URLS } from '../../resources/urls';
import { ApiResponse } from './user.api';

export type Product = {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: {
    usertype: { usertype: string };
    category: string;
  };
};


export type ProductsListResponse = {
  responseCode: number;
  products: Product[];
};


export async function getProductsList(
  apiContext: APIRequestContext
): Promise<ProductsListResponse> {
  const response = await apiContext.get(API_URLS.productsListUrl);
  return await response.json();
}


export type ProductByIdResult = {
  statusCode: number;
  contentType: string;
  body: {
    responseCode: number;
    product?: {
      id: number;
      name: string;
      price: string;
      brand: string;
      category: unknown;
    };
    message?: string;
  } | null;
};



export async function getProductById(
  apiContext: APIRequestContext,
  productId: number | string
): Promise<ProductByIdResult> {
  const response = await apiContext.get(API_URLS.productByIdUrl(productId));
  const contentType = response.headers()['content-type'] ?? '';

  const body = contentType.includes('application/json')
    ? await response.json()
    : null;

  return {
    statusCode: response.status(),
    contentType,
    body,
  };
}


export async function searchProduct(
  apiContext: APIRequestContext,
  searchTerm?: string
): Promise<ProductsListResponse | ApiResponse> {
  const response = await apiContext.post(
    API_URLS.searchProductsUrl,
    searchTerm !== undefined ? { form: { search_product: searchTerm } } : {}
  );
  return await response.json();
}