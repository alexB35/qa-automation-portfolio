const fs = require('fs');
const path = require('path');

const DIRS = {
  'parabank': ['./01_banking/parabank/outputs/allure-results', './01_banking/parabank/outputs/allure-report'],
  'restful-booker': ['./02_api/restful-booker/outputs/allure-results', './02_api/restful-booker/outputs/allure-report'],
  'automation-exercise': ['./03_ecommerce/automation-exercise/outputs/allure-results', './03_ecommerce/automation-exercise/outputs/allure-report'],
  'all': [
    './allure-results', './allure-report', 
    './01_banking/parabank/outputs/allure-results',
    './01_banking/parabank/outputs/allure-report',
    './02_api/restful-booker/outputs/allure-results',
    './02_api/restful-booker/outputs/allure-report',
    './03_ecommerce/automation-exercise/outputs/allure-results',
    './03_ecommerce/automation-exercise/outputs/allure-report',
  ],
};

const target = process.argv[2] || 'all';
const dirs = DIRS[target] || DIRS['all'];

dirs.forEach(dir => {
  fs.rmSync(dir, { recursive: true, force: true });
  console.log(`🧹 Cleaned: ${dir}`);
});