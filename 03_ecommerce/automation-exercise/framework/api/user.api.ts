import { APIRequestContext } from '@playwright/test';
import { UserBase } from '../data/user.base';


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
    'https://automationexercise.com/api/createAccount',
    {
      form: {
        name: user.name,
        email: user.email,
        password: user.password,
        title: 'Mr',
        birth_date: String(user.day),
        birth_month: user.month,
        birth_year: String(user.year),
        firstname: user.firstName,
        lastname: user.lastName,
        company: 'TestCompany',
        address1: user.address,
        address2: '',
        country: user.country,
        zipcode: user.zipCode,
        state: user.state,
        city: user.city,
        mobile_number: user.phone
      }
    }
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
    'https://automationexercise.com/api/deleteAccount',
    {
      form: { email, password },
    }
  );
  return await response.json();
}