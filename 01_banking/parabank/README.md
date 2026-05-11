![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/parabank-ui.yml/badge.svg)
![Allure](https://img.shields.io/badge/Allure-Test%20Reporting-ff69b4)

# ParaBank UI Automation

https://parabank.parasoft.com/parabank/index.htm

## Overview

This project demonstrates **end-to-end UI automation** for ParaBank, a sample online banking web application.  

The goal is to automate common banking workflows, validate UI functionality, and generate reports for test execution.

## Technology Stack

- **Playwright** (UI automation)
- **TypeScript / Node.js**
- **Docker** (test environment)
- **GitHub Actions** (CI/CD)

## Project Structure

- `tests/` → Playwright test cases (registration, login, transactions, ...)
- `setup/` → Test setup and preconditions (authentication, session management)
- `docs/` → Screenshots of test executions and Allure reports
- `resources/` → Page objects, test data, and reusable utilities
- `jira/` → Screenshots of Jira boards and cards

---

## How to Run Tests

## Locally

npm install
npx playwright install
npx playwright test 01_banking/parabank/tests

## Using Docker

docker build -t qa-tests .
docker run qa-tests npx playwright test 01_banking/parabank/tests

## Using GitHub Actions

Trigger the workflow: 
parabank-ui.yml

## Reports :

Test execution results are generated using Allure.

- Reports are automatically generated during CI runs.
- Available as downloadable artifacts in GitHub Actions.
- Include test steps, logs, and screenshots for failures.

## Notes :

You can run an entire application, User Story, or test cases individually.
Playwright is configured to not stop at a failure.
Debug information (logs, screenshots) is centralized in Allure reports.