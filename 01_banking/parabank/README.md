![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/parabank-ui.yml/badge.svg)

# ParaBank UI Automation

## Overview

This project demonstrates **end-to-end UI automation** for ParaBank, a sample online banking web application.  

The goal is to automate common banking workflows, validate UI functionality, and generate reports for test execution.

## Technology Stack

- **Playwright** (UI automation)
- **TypeScript / Node.js**
- **Docker** (test environment)
- **GitHub Actions** (CI/CD)

## Project Structure

- `tests/` → Playwright test cases (registration, login, transactions)
- `outputs/` → Playwright execution reports
- `screenshots/` → UI validation evidence
- `resources/` → Page objects & reusable functions
- `jira/` → Screenshots of Jira boards and user story cards

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

Trigger the workflow: parabank-ui.yml

## Reports :

Playwright reports are uploaded as artifacts in GitHub Actions workflow (parabank-playwright-report)

## Notes :

Tests are independent and can be run individually
Failure screenshots and evidences are stored in screenshots/