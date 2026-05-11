![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-lightgrey)
![Allure](https://img.shields.io/badge/Allure-Test%20Reporting-ff69b4)
![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/orange-hrm-ui.yml/badge.svg)


# Automation Exercise

https://automationexercise.com

## Overview

This project demonstrates **UI + API automation** for "Automation Exercise", an e-commerce platform.  

Automates online product buying flows including register, login, product buying, checkout and an API scope.

## Technology Stack

- **Playwright** (UI & API)
- **TypeScript / Node.js**
- **Docker**
- **GitHub Actions**

## Project Structure

| **Automation Exercise UI + API** | E2E UI and API automation for e-commerce scenarios |
|------|------|
| `tests/` | Playwright test scripts |
| `framework/` | fixture and data and helpers and pages |
| `outputs/` | reports & logs |
| `resources/` | config and test-data |
| `jira/` | Screenshots of Jira boards and cards |  

**Jira :**  https://alexb35.atlassian.net/jira/software/projects/AEX/boards/3

---

## How to Run Tests 

## Locally

```
npm install
npx playwright install
npx playwright test 03_ecommerce/automation-exercise/tests
```


## Using Docker

```
docker build -t qa-tests .
docker run qa-tests npx playwright test 03_ecommerce/automation-exercise/tests
```

## Run tests locally with Docker

```
docker pull alexb35/qa-automation-portfolio:latest

docker run -e CI=true -e PROJECT=automation-exercise \
  /qa-automation-portfolio:latest \
  npx playwright test \
  --project=setup-automation-exercise \
  --project=automation-exercise
```


## Using GitHub Actions

Trigger the workflow: automation-exercise-ui.yml


## Authentication

Authentication is dynamically generated before test execution via `auth.setup.ts`.

No session files are stored in the repository.


## Reports :

Playwright reports are uploaded as artifacts (automation-exercise-playwright-report)


## View Allure Report

Download the `allure-report-automation-exercise` artifact from GitHub Actions, extract the zip, then:

# Option 1 — Allure CLI
```
allure open allure-report-automation-exercise
```

# Option 2 — Simple HTTP server (no install required)
```
npx serve allure-report-automation-exercise
```