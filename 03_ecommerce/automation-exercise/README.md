![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
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

- `tests/` → Playwright test cases
- `outputs/` → Reports & logs
- `screenshots/` → UI validation evidence
- `resources/` → Helpers & URLs
- `jira/` → Screenshots of Jira boards and user story cards

---

## How to Run Tests 

## Locally

npm install
npx playwright install
npx playwright test 03_ecommerce/automation-exercise/tests


## Using Docker

docker build -t qa-tests .
docker run qa-tests npx playwright test 03_ecommerce/automation-exercise/tests

## Run tests locally with Docker

docker pull alexb35/qa-automation-portfolio:latest

docker run -e CI=true -e PROJECT=automation-exercise \
  /qa-automation-portfolio:latest \
  npx playwright test \
  --project=setup-automation-exercise \
  --project=automation-exercise


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
allure open allure-report-automation-exercise

# Option 2 — Simple HTTP server (no install required)
npx serve allure-report-automation-exercise


