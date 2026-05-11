import { UserBase } from './user.base';

export function toUIForm(user: UserBase) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    country: user.country,
    phone: user.phone
  };
}