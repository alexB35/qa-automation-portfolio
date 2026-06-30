import { APIRequestContext } from '@playwright/test';
import { UserBase } from '../data/user.base';
import { toApiPayload } from '../data/user.api.adapter';
import { API_URLS } from '../../resources/urls';

// ── Shared API response shape ────────────────────────
export type ApiResponse = {
  responseCode: number;
  message: string;
};


// ── Create API user ──────────────────────────────────
export async function createUser(
  apiContext: APIRequestContext,
  user: UserBase
): Promise<ApiResponse> {

  const response = await apiContext.post(
    API_URLS.createAccountUrl,
    { form: toApiPayload(user) }
  );
  

  return await response.json();
}



// ── Delete API user ──────────────────────────────────
export async function deleteUser(
  apiContext: APIRequestContext,
  email: string,
  password: string
): Promise<ApiResponse> {
  const response = await apiContext.delete(
    API_URLS.deleteAccountUrl,
    {
      form: { email, password },
    }
  );
  return await response.json();
}


// ── Verify login ──────────────────────────────────────
export async function verifyLogin(
  apiContext: APIRequestContext,
  email: string,
  password: string
): Promise<ApiResponse> {
  const response = await apiContext.post(
    API_URLS.verifyLoginUrl,
    {
      form: { email, password },
    }
  );
  return await response.json();
}


// ── Get user detail by email ─────────────────────────
export type UserDetailResponse = {
  responseCode: number;
  message?: string;
  user?: {
    email: string;
    name: string;
    [key: string]: unknown;
  };
};

export async function getUserDetailByEmail(
  apiContext: APIRequestContext,
  email: string
): Promise<UserDetailResponse> {
  const response = await apiContext.get(
    API_URLS.getUserDetailByEmailUrl,
    { params: { email } }
  );
  return await response.json();
}