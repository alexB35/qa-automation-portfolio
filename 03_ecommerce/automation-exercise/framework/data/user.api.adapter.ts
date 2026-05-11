import { UserBase } from './user.base';

export function toApiPayload(user: UserBase) {
  return {
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    password: user.password,
    title: 'Mr',
    birth_date: user.day,
    birth_month: user.month,
    birth_year: user.year,
    firstname: user.firstName,
    lastname: user.lastName,
    company: 'TestCorp',
    address1: user.address,
    address2: '',
    country: user.country,
    zipcode: user.zipCode,
    state: user.state,
    city: user.city,
    mobile_number: user.phone
  };
}