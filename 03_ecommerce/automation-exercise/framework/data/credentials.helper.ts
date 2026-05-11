import { readFileSync } from 'fs';

const CREDENTIALS_PATH = './03_ecommerce/automation-exercise/resources/test-data/credentials.json';

export function getAuthCredentials() {
  return JSON.parse(
    readFileSync(CREDENTIALS_PATH, 'utf-8'));
};