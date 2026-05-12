# QA Automation Portfolio

![QA Automation Portfolio](./assets/banner1.png)

## A dockerized QA automation framework featuring UI/API testing, CI/CD pipelines and Allure reporting.

> Open to QA Automation opportunities.

---

![ParaBank - UI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/parabank-ui.yml/badge.svg)
![Restful Booker - API](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/restful-booker-api.yml/badge.svg)
![Automation Exercise - UI + API](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/automation-exercise.yml/badge.svg)

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![Postman / Newman](https://img.shields.io/badge/Postman-API_Testing-orange)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI/CD-2088FF)
![Allure](https://img.shields.io/badge/Allure-Test%20Reporting-ff69b4)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-lightgrey)

---

## Framework features

- Reusable fixtures & helpers
- Data-driven testing
- Dynamic test data generation
- API cleanup hooks
- Isolated test execution
- CI-ready architecture


## QA workflow

_Test Design (Jira) → Automation (Playwright / Postman) → Execution (Docker) → CI/CD (GitHub Actions) → Reporting (Allure)_

Each application has its own dedicated CI workflow, allowing independent execution and clear reporting.

---

## Test Strategy

This portfolio follows a structured QA approach to ensure high-quality, reliable, and maintainable automated tests across multiple applications.

### 1️⃣ Scope
_UI & API automation, independent and reusable tests._

### 2️⃣ Approach
_Modular, reusable and data-driven tests executed in Docker containers; orchestrated via GitHub Actions._

### 3️⃣ Types of Tests
_Functional, API, positive/negative and validation testing._

### 4️⃣ Reporting & Results
_Playwright & Newman HTML reports; failure screenshots; CI artifacts for traceability._

---

## Project Structure

| Application | Scope |
|------|------|
| [ParaBank](./01_banking/parabank/README.md) | UI automation for banking scenarios |
| [Restful Booker](./02_api/restful_booker/README.md) | API testing for booking management scenarios |
| [Automation Exercise](./03_ecommerce/automation-exercise/README.md) | UI and API automation for e-commerce scenarios |

---

## Tech Stack

- **Playwright** - _UI & API automation_
- **Postman + Newman** - _API execution_
- **TypeScript / Node.js**
- **Docker** - _containerized execution_
- **GitHub Actions** - _CI/CD integration_
- **Allure** - _test reporting_
- **Jira** - _test management_

---

## How to Run Tests

_All tests are containerized — no local dependencies required beyond Docker._

**Prerequisites:** 
[Install Docker Desktop](https://www.docker.com/get-started)

**Clone the repository:**
```bash
git clone https://github.com/alexB35/qa-automation-portfolio.git
cd qa-automation-portfolio
```

**Run tests with volume mount** (recommended — reports are accessible locally):
```bash
docker run --rm -v $(pwd)/reports:/app/outputs qa-portfolio
```

**Or run without volume mount:**
```bash
docker run --rm qa-portfolio
```

Reports are generated inside each app's `outputs/` folder and accessible at `./reports/` on your machine.

---

## Reporting sample

![Allure report](./assets/allure_report.png)

---

> [!NOTE]
> Test data is dynamically generated where possible.
> Tests are independent & reusable.
> CI/CD pipelines generate reports and store artifacts automatically.

> [!WARNING]
> Docker image includes known npm dependency vulnerabilities. In a real environment, dependencies would be pinned to secure versions and a minimal base image used.


