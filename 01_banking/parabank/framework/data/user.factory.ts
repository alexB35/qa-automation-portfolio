import { UserBase } from './user.base';

// ── Fresh user creation data ──────────────────────────────────────────────────────────────
export function buildUser(overrides?: Partial<UserBase>): UserBase {
  const unique = Math.random().toString(36).slice(2, 8);

  return {
    firstName: 'John',
    lastName:  'Doe',
    address:   '123 Main St',
    city:      'New York',
    state:     'NY',
    zipCode:   '10001',
    phone:     '0123456789',
    ssn:       '123-45-6789',
    username:  `tu_${unique}`,
    password:  'Test123!',
    ...overrides,
  };
}