import { UserBase } from './user.base';

// ── Fresh user creation data ──────────────────────────────────────────────────────────────
export function buildUser(overrides?: Partial<UserBase>): UserBase {
  const unique = Math.random().toString(36).slice(2, 8);

  return {
    firstName: `John${unique}`,
    lastName:  `Doe${unique}`,
    address:   `${unique} Main St`,
    city:      'New York',
    state:     'NY',
    zipCode:   '10001',
    phone:     '0123456789',
    ssn:       `${unique.slice(0,3)}-${unique.slice(3,5)}-${unique.slice(5)}`,
    username:  `tu_${unique}`,
    password:  'Test123!',
    ...overrides,
  };
}