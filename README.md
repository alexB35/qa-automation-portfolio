# QA Automation Portfolio

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![Postman](https://img.shields.io/badge/Postman-API_Testing-orange)
![Jira](https://img.shields.io/badge/Jira-Test_Management-blue)
![Python](https://img.shields.io/badge/Python-3.10-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-ES6-lightgrey)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub%20Actions-lightgrey)

This repository showcases QA automation skills across multiple applications, covering:

- UI test automation (Playwright)
- API testing (Playwright & Postman)
- Test case management (Jira)
- CI/CD integration (GitHub Actions)

The project demonstrates a complete QA workflow from **test design** → **automation** → **execution** → **reporting**.

---

## Technologies

- **Playwright** (UI & API automation)
- **Postman + Newman** (API testing & execution)
- **TypeScript / Node.js**
- **GitHub Actions** (CI/CD)
- **Jira** (test management)

---

## Project Structure

This repository is organized by application, each containing its own test assets and execution results.

### 01_banking
- **ParaBank UI** – End-to-end UI automation for banking workflows
  - `tests/` → Playwright test cases (registration, login, transactions)
  - `outputs/` → test execution reports and logs
  - `screenshots/` → failure evidences
  - `resources/` → locators, reusable keywords
  - `jira/` → user stories and test case screenshots
 
**Jira :** https://alexb35.atlassian.net/jira/software/projects/PBQ/boards/1




### 02_api
- **Restful Booker API** – API testing and automation for booking management scenarios
  - `tests/` → Playwright API test cases
  - `outputs/` → Newman HTML reports
  - `screenshots/` → request/response evidence (if applicable)
  - `resources/` → request payloads, schemas, reusable helpers
  - `postman/` → Postman collections and environments
  - `jira/` → API test cases and documentation

**Jira :**  https://alexb35.atlassian.net/jira/software/projects/RFB/boards/2




### 03_saas
- **OrangeHRM UI** – Functional and UI automation for HR management workflows
  - `tests/` → Playwright & Robot Framework test cases (login, employee management)
  - `outputs/` → execution reports and logs
  - `screenshots/` → UI validation evidence
  - `resources/` → page objects, test data, helper functions
  - `jira/` → user stories and test scenarios

**Jira :**  https://alexb35.atlassian.net/jira/software/projects/ORH/boards/3



### 04_other
  - config files
  
---

## Workflow

Jira → Test Cases → Automation (Playwright / Postman) → Execution → Reports → CI/CD

---

## CI/CD Pipeline

Automated workflows are implemented using GitHub Actions:

Run Playwright UI tests (Banking & SaaS)

Run Postman collections via Newman

Generate and upload test reports

---

## How to Run Tests

### Playwright (UI & API)
npm install
npx playwright install
npx playwright test 01_banking/parabank/tests

Run specific projects:

npx playwright test 02_api/restful_booker/tests
npx playwright test 03_saas/orange_hrm/tests

### Postman (Newman)
newman run 02_api/restful_booker/postman/collections/restful_booker_collection.json \
  -e 02_api/restful_booker/postman/environments/restful_booker_env.json

---

## Notes

Test data is generated dynamically where possible

API and UI tests are designed to be independent

Some third-party dependencies may contain known vulnerabilities that do not impact test execution

---

## Versions used
- Node.js >= v20
- npm >= v10
- Playwright Test

Optional / complementary tools:
- Robot Framework
- Python 3.11+