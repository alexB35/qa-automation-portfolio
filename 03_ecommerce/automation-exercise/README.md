![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-lightgrey)
![Allure](https://img.shields.io/badge/Allure-Test%20Reporting-ff69b4)
![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/orange-hrm-ui.yml/badge.svg)


# Automation Exercise

[https://automationexercise.com](https://automationexercise.com)

## Overview

This project demonstrates **UI + API automation** for "Automation Exercise", an e-commerce platform.  

Automates online shopping flows including registration, login, product browsing, checkout and an API scenarios.

---

## Tech Stack

- **Playwright** - _UI & API_
- **TypeScript / Node.js**
- **Docker** - contenerized execution
- **GitHub Actions** - _CI/CD_

---

## Project Structure

| Folder | Description |
|------|------|
| `tests/` | Playwright test scripts |
| `framework/` | Fixtures, helpers, page objects & API clients |
| `outputs/` | Allure reports & logs |
| `resources/` | Config & test data |
| `docs/` | Screenshots of test executions and Allure reports |
| `jira/` | Screenshots of Jira boards and cards |  

**Jira board:** [AEX Board](https://alexb35.atlassian.net/jira/software/projects/AEX/boards/3)

---

## How to Run Tests 

Refer to the [root README](../../README.md) for Docker and CI instructions.

## Locally

```bash
npm install
npx playwright install
npx playwright test 03_ecommerce/automation-exercise/tests
```

## Using GitHub Actions:

Trigger the workflow: automation-exercise-ui.yml

## Reporting:

Test execution results are generated using Allure.

- Reports are automatically generated during CI runs
- Available as downloadable artifacts in GitHub Actions
- Include test steps, logs, and screenshots on failure

---

> [!NOTE]
> You can run an entire application, a User Story, or individual test cases.
> Playwright is configured to continue on failure.
> Debug information (logs, screenshots) is centralized in Allure reports.