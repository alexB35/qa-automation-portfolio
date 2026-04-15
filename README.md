# QA Automation Portfolio
_A fully dockerized, multi-application QA automation framework with UI & API tests, reporting, and CI/CD._



![ParaBank UI Tests](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/parabank-ui.yml/badge.svg)
![Restful Booker API Tests](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/restful-booker-api.yml/badge.svg)
![Orange HRM UI Tests](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/orange-hrm-ui.yml/badge.svg)

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![Postman](https://img.shields.io/badge/Postman-API_Testing-orange)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI/CD-2088FF)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-lightgrey)



Portfolio demonstrating **UI & API automation**, **containerized execution**, and **CI/CD workflows**.

- UI test automation (Playwright)
- API testing (Playwright & Postman)
- Test case management (Jira)
- Containerized test execution (Docker)
- CI/CD integration (GitHub Actions)

**QA workflow:**

Jira → Test Design → Automation (Playwright / Postman) → Execution (Docker) → Reporting → CI/CD (GitHub Actions)

Each application has its own dedicated CI workflow, allowing independent execution and clear reporting.

---

## Test Strategy

This portfolio follows a structured QA approach to ensure high-quality, reliable, and maintainable automated tests across multiple applications.

### 1️⃣ Scope
UI automation (ParaBank, OrangeHRM), API automation (Restful Booker), independent and reusable tests.

### 2️⃣ Approach
Modular, reusable and data-driven tests executed in Docker containers; orchestrated via GitHub Actions.

### 3️⃣ Types of Tests
Functional, API, exploratory, negative testing.

### 4️⃣ Reporting & Results
Playwright & Newman HTML reports; failure screenshots; CI artifacts for traceability.

---

## Project Structure

### 01_banking
- **ParaBank UI** – End-to-end UI automation for banking scenarios
  - `tests/` → Playwright UI tests (registration, login, transactions)
  - `outputs/` → test reports & logs
  - `screenshots/` → failure evidences
  - `resources/` → locators & keywords
  - `jira/` → user stories & test case screenshots
 
**Jira :** https://alexb35.atlassian.net/jira/software/projects/PBQ/boards/1




### 02_api
- **Restful Booker API** – API testing and automation for booking management scenarios
  - `tests/` → Playwright API tests
  - `outputs/` → Newman HTML reports
  - `screenshots/` → request/response evidence (if applicable)
  - `resources/` → payloads, schemas
  - `postman/` → collections & environments
  - `jira/` → API test cases & documentation

**Jira :**  https://alexb35.atlassian.net/jira/software/projects/RFB/boards/2




### 03_saas
- **OrangeHRM UI** – Functional and UI automation for HR management scenarios
  - `tests/` → Playwright & Robot Framework tests (login, employee management)
  - `outputs/` → reports & logs
  - `screenshots/` → failure evidences
  - `resources/` → page objects & helpers
  - `jira/` → user stories & test scenarios

**Jira :**  https://alexb35.atlassian.net/jira/software/projects/ORH/boards/3



### 04_other
  - config files

---

## Tech Stack

- **Playwright** (UI & API automation)
- **Postman + Newman** (API execution)
- **TypeScript / Node.js**
- **Docker** (containerized execution)
- **GitHub Actions** (CI/CD)
- **Jira** (test management)

---

## How to Run Tests

All tests in this portfolio are containerized with Docker.
No local dependencies required.

To run tests :

- Install **Docker Desktop** for your system :

https://www.docker.com/get-started

- Clone this repository :

git clone https://github.com/alexB35/qa-automation-portfolio.git
cd qa-automation-portfolio

- Build the Docker image :

docker build -t qa-portfolio .

- Run tests :

docker run --rm qa-portfolio

Reports are generated inside each app’s outputs/ folder.
To copy them locally :

docker cp <insert_container_id>:/app/02_api/outputs ./my_local_reports

---

## Notes

Test data is dynamically generated where possible.

Tests are independent & reusable.

CI/CD pipelines generate reports and store artifacts automatically.