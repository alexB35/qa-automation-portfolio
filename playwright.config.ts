import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const isCI = process.env['CI'] !== undefined;
const isHeadless = isCI || process.env['HEADLESS'] !== undefined;

// ── Allure output per project ─────────────────────────────────────────────
const ALLURE_DIRS = {
  'parabank': '01_banking/parabank/outputs/allure-results',
  'automation-exercise': '03_ecommerce/automation-exercise/outputs/allure-results',
};

const currentProject = process.env['PROJECT'] || 'automation-exercise';
const allureResultsDir = path.resolve(
  ALLURE_DIRS[currentProject as keyof typeof ALLURE_DIRS] 
  || '03_ecommerce/automation-exercise/outputs/allure-results'
);

export default defineConfig({
  timeout: process.env['CI'] ? 45_000 : 25_000,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  fullyParallel: false,
  workers: process.env['WORKERS'] ? parseInt(process.env['WORKERS'], 10) : isCI ? 2 : 1,
  maxFailures: isCI ? 5 : 0,

  reporter: [
    ['list'],
    ['allure-playwright', { resultsDir: allureResultsDir }],
  ],

  projects: [

// ── ParaBank ──────────────────────────────────────────────────────
{
  name: 'setup-parabank',
  testMatch: './01_banking/parabank/setup/auth.setup.ts',
  use: { 
    browserName: 'firefox', 
    headless: isHeadless ,
    viewport: { width: 1920, height: 1040 },
    screenshot: 'only-on-failure',
  },
      
  },
{
  name: 'parabank',
  testDir: './01_banking/parabank/tests',
  dependencies: ['setup-parabank'],
  outputDir: './01_banking/parabank/outputs/test-results',
  use: {
    browserName: 'firefox',
    headless: isHeadless,
    viewport: { width: 1920, height: 1040 },
    screenshot: 'only-on-failure',
    storageState: './01_banking/parabank/.auth/session.json',
  },
},

// ── Automation Exercise ───────────────────────────────────────────
{
  name: 'automation-exercise',
  testDir: './03_ecommerce/automation-exercise/tests',
  outputDir: './03_ecommerce/automation-exercise/outputs/test-results',
  use: {
    browserName: 'firefox',
    headless: isHeadless,
    viewport: { width: 1920, height: 1040 },
    screenshot: 'only-on-failure',
  },
},
  ],
});