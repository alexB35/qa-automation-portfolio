import { UserBase } from './user.base';


// ── Fresh user creation data ──────────────────────────────────────────────────────────────
export function buildUser(): UserBase {
    const unique = Math.random().toString(36).slice(2, 8);

    return {
        name: 'John Doe',
        email: `john_doe_${unique}@test.com`,
        password: 'Test123!',
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Test Street',
        country: 'United States',
        state: 'NV',
        city: 'Las Vegas',
        zipCode: '10001',
        phone: '0123456789',
        day: '15',
        month: 'May',
        year: '2000',
    };
}

// ── Reusable user creation data - lasts 2 minutes ──────────────────────────────────────────────────────────────
const now = new Date();
const timeStamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(Math.floor(now.getMinutes() / 2)).padStart(2, '0')}`;

export const AUTH_USER = {
    name: 'John Doe',
    email: `john_doe_${timeStamp}@test.com`,
    password: 'Test123!',
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Test Street',
    country: 'United States',
    state: 'New York',
    city: 'New York',
    zipCode: '10001',
    phone: '0123456789',
    day: '15',
    month: 'May',
    year: '1990',
};