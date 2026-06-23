import { APIRequestContext } from '@playwright/test';
import { UserBase } from '../data/user.base';
import { toApiPayload } from '../data/user.api.adapter';
import { API_URLS } from '../../resources/urls';

// ── Create API user ──────────────────────────────────
export type CreateUserResponse = {
  responseCode: number;
  message: string;
};

export async function createUser(
  apiContext: APIRequestContext,
  user: UserBase
): Promise<CreateUserResponse> {

  const response = await apiContext.post(
    API_URLS.createAccountUrl,
    { form: toApiPayload(user) }
  );
  

  return await response.json();
}



// ── Delete API user ──────────────────────────────────
export type DeleteUserResponse = {
  responseCode: number;
  message: string;
};

export async function deleteUser(
  apiContext: APIRequestContext,
  email: string,
  password: string
): Promise<DeleteUserResponse> {
  const response = await apiContext.delete(
    API_URLS.deleteAccountUrl,
    {
      form: { email, password },
    }
  );
  return await response.json();
}