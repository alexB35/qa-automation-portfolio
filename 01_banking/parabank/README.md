![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-lightgrey)
![Allure](https://img.shields.io/badge/Allure-Test%20Reporting-ff69b4)
![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/orange-hrm-ui.yml/badge.svg)


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

| **ParaBank UI** | E2E UI automation for banking scenarios |
|------|------|
| `tests/` | Playwright test scripts |
| `docs/` | Screenshots of test executions and Allure reports |
| `resources/` | Page objects & reusable helpers |
| `jira/` | Screenshots of Jira boards and cards |

**Jira :** https://alexb35.atlassian.net/jira/software/projects/PBQ/boards/1

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