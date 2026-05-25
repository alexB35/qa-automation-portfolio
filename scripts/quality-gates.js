const fs = require('fs');
const path = require('path');

const project = process.argv[2] || 'automation-exercise';

// ── Known failing tests per project ──────────────────────────────────────
const KNOWN_FAILURES = {
  'automation-exercise': [
    'TC-03',   
    'TC-10b',  
    'TC-17',   
    'TC-29',   
  ],
  'parabank': [
    'TC-05',   
    'TC-17',
    'TC-20',   
  ],
  'restful-booker': [
    // list RFB failures here
  ],
};

const RESULTS_DIRS = {
  'automation-exercise': '03_ecommerce/automation-exercise/outputs/allure-results',
  'parabank': '01_banking/parabank/outputs/allure-results',
  'restful-booker': '02_api/restful_booker/outputs/allure-results',
};

const resultsDir = RESULTS_DIRS[project];
const knownFailures = KNOWN_FAILURES[project] || [];

// ── Read allure results ───────────────────────────────────────────────────
let files;
try {
  files = fs.readdirSync(resultsDir).filter(f => f.endsWith('-result.json'));
} catch {
  console.error(`❌ No allure-results directory found at: ${resultsDir}`);
  process.exit(1);
}

const failures = [];

for (const file of files) {
  const result = JSON.parse(
    fs.readFileSync(path.join(resultsDir, file), 'utf-8')
  );

  if (result.status === 'failed' || result.status === 'broken') {
    console.log(`DEBUG failed: "${result.name}"`);
    const name = result.name || '';
    const isKnown = knownFailures.some(tc => name.includes(tc));

    if (!isKnown) {
      failures.push(name);
    }
  }
}

// ── Report ────────────────────────────────────────────────────────────────
if (failures.length > 0) {
  console.error(`❌ Quality gate failed [${project}] — unexpected test failures:`);
  failures.forEach(f => console.error(`   • ${f}`));
  process.exit(1);
} else {
  console.log(`✅ Quality gate passed [${project}] — only known failures detected`);
  process.exit(0);
}