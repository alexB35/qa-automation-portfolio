![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/orangehrm-ui.yml/badge.svg)

# Orange HRM UI Automation

## Overview

This project demonstrates **UI automation** for Orange HRM, a human resources management system.  

Automates employee workflows including login, employee creation, edit and delete.

## Technology Stack

- **Playwright** (UI automation)
- **TypeScript / Node.js**
- **Docker**
- **GitHub Actions**

## Project Structure

- `tests/` → Playwright test cases
- `outputs/` → Reports & logs
- `screenshots/` → UI validation evidence
- `resources/` → Page objects & test data
- `jira/` → Screenshots of Jira boards and user story cards

---

## How to Run Tests 

## Locally

npm install
npx playwright install
npx playwright test 03_saas/orange_hrm/tests


## Using Docker

docker build -t qa-tests .
docker run qa-tests npx playwright test 03_saas/orange_hrm/tests


## Using GitHub Actions

Trigger the workflow: orangehrm-ui.yml

## Reports :

Playwright reports are uploaded as artifacts (orangehrm-playwright-report)