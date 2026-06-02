![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-lightgrey)
![Allure](https://img.shields.io/badge/Allure-Test%20Reporting-ff69b4)
![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/parabank-ui.yml/badge.svg)

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
| `framework/` | Fixtures, helpers, data & page objects |
| `resources/` | Config & URLs |
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

Trigger the workflow: [parabank-ui](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/parabank-ui.yml)

## Reports :

Test execution results are automatically generated after each workflow run using Allure.
Once the _deploy-allure-reports_ is done, you can consult :

**This page :** [Allure-Hub] (https://alexb35.github.io/qa-automation-portfolio/)
or you can
**Consult the report :** [ParaBank] (https://alexb35.github.io/qa-automation-portfolio/parabank/)

- Reports are automatically generated during CI runs.
- Available as downloadable artifacts in GitHub Actions.
- Include test steps, logs, and screenshots for failures.

## Allure :

![Allure Parabank](../assets/allure-parabank.png)

> [!NOTE]
> You can run an entire application, a User Story, or individual test cases.
> Playwright is configured to continue on know failure with the quality gate script.
> Debug informations (logs, screenshots) are centralized in Allure reports.

> [!IMPORTANT]
> This project targets the local Parabank environment _(localhost:8080)_ rather than the public shared environment.
> The shared environment is occasionally unstable, triggering Cloudflare limitations and unavailabilities due to pentests.