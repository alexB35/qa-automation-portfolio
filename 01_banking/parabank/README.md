![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-lightgrey)
![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/parabank-ui.yml/badge.svg)
![Allure](https://img.shields.io/badge/Allure-Test%20Reporting-ff69b4)

# ParaBank UI Automation

[https://parabank.parasoft.com](https://parabank.parasoft.com/parabank/index.htm)

## Overview

This project demonstrates **end-to-end UI automation** for ParaBank, a sample online banking web application.  

The goal is to automate common banking workflows, validate UI functionality, and generate reports for test execution.

## Tech Stack

- **Playwright** - _UI automation_
- **TypeScript / Node.js**
- **Docker** - _test environment_
- **GitHub Actions** - _CI/CD_
- **Allure** - _test reporting_

---

## Project Structure

| Folder | Description |
|---|---|
| `tests/` | Playwright test scripts |
| `framework/` | Fixtures, helpers & page objects |
| `resources/` | Config & test data |
| `docs/` | Screenshots of test executions and Allure reports |
| `jira/` | Screenshots of Jira boards and cards |

**Jira :** [PBQ Board](https://alexb35.atlassian.net/jira/software/projects/PBQ/boards/1)

---

## How to Run Tests

## Locally
```bash
npm install
npx playwright install
npx playwright test 01_banking/parabank/tests
```

## Using GitHub Actions

Trigger the workflow: 
parabank-ui.yml

## Reports :

Test execution results are generated using Allure.

- Reports are automatically generated during CI runs.
- Available as downloadable artifacts in GitHub Actions.
- Include test steps, logs, and screenshots for failures.

> [!NOTE]
> You can run an entire application, a User Story, or individual test cases.
> Playwright is configured to continue on failure.
> Debug information (logs, screenshots) is centralized in Allure reports.