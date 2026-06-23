const host = process.env['AUTOMATION_EXERCISE_URL'] || 'https://automationexercise.com';
export const BASE_URL = host;




// ── Common URLs ─────────────────────────────────────────────────────────────
export const URLS = {
  homeUrl: BASE_URL,
  signupUrl: `${BASE_URL}/signup`,
  loginUrl: `${BASE_URL}/login`,
  productUrl: `${BASE_URL}/products`,
  cartUrl: `${BASE_URL}/view_cart`,
  productDetailsUrl: (productId: number | string) => `${BASE_URL}/product_details/${productId}`,
  brandProductsUrl: `${BASE_URL}/brand_products`,
  contactUrl: `${BASE_URL}/contact_us`,
};




// ── API URLs ─────────────────────────────────────────────────────────────
export const BASE_API_URL = `${BASE_URL}/api`;

export const API_URLS = {
  productsListUrl: `${BASE_API_URL}/productsList`,
  productByIdUrl:         (productId: number | string) => `${BASE_API_URL}/productsList/${productId}`,
  brandsListUrl: `${BASE_API_URL}/brandsList`,
  searchProductsUrl: `${BASE_API_URL}/searchProducts`,
  verifyLoginUrl: `${BASE_API_URL}/verifyLogin`,
  createAccountUrl: `${BASE_API_URL}/createAccount`,
  deleteAccountUrl: `${BASE_API_URL}/deleteAccount`,
  updateAccountUrl: `${BASE_API_URL}/updateAccount`,
  getUserDetailByEmailUrl: `${BASE_API_URL}/getUserDetailByEmail`,
};