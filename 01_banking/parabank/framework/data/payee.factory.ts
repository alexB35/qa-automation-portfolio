import type { Payee } from '../ui/pages/bill-pay.page';

export function buildPayee(overrides?: Partial<Payee>): Payee {
  return {
    name:          'Electric Company',
    address:       '123 Power St',
    city:          'New York',
    state:         'NY',
    zipCode:       '10001',
    phone:         '555-1234',
    accountNumber: '987654321',
    amount:        '100',
    ...overrides,
  };
}