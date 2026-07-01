const fs = require('fs');
const { execSync } = require('child_process');

const project = process.argv[2] || 'automation-exercise';

const ALLURE = {
  'automation-exercise': {
    results: '03_ecommerce/automation-exercise/outputs/allure-results',
    report:  '03_ecommerce/automation-exercise/outputs/allure-report',
    run:     'automation-exercise',
  },
  'parabank': {
    results: '01_banking/parabank/outputs/allure-results',
    report:  '01_banking/parabank/outputs/allure-report',
    run:     'parabank',
  },
};

const cfg = ALLURE[project];

// ── Ensure allure-results directory exists ────────────────────────────────
fs.mkdirSync(cfg.results, { recursive: true });

// ── Build playwright command ──────────────────────────────────────────────
const projects = cfg.setup
  ? `--project=${cfg.setup} --project=${cfg.run}`
  : `--project=${cfg.run}`;

// ── Run Playwright (ignore exit code so Allure always generates) ──────
try {
  execSync(
    `cross-env PROJECT=${project} npx playwright test ${projects}`,
    { stdio: 'inherit' }
  );
} catch (err) {
  console.error('Playwright error:', err.message);
}

// ── Generate and open Allure report ──────────────────────────────────
execSync(
  `npx allure generate ${cfg.results} --output ${cfg.report} && npx allure open ${cfg.report}`,
  { stdio: 'inherit' }
);