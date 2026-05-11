# QA Automation Portfolio
## _A fully dockerized, multi-application QA automation framework with UI & API tests, reporting, and CI/CD._

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

Portfolio demonstrating **UI & API automation**, **containerized execution**, and **CI/CD workflows**.

- UI test automation (Playwright)
- API testing (Playwright & Postman)
- Test case management (Jira)
- Containerized test execution (Docker)
- CI/CD integration (GitHub Actions)

**QA workflow:**

_Jira → Test Design → Automation (Playwright / Postman) → Execution (Docker) → Reporting (Allure) → CI/CD (GitHub Actions)_

Each application has its own dedicated CI workflow, allowing independent execution and clear reporting.

---

## Test Strategy

This portfolio follows a structured QA approach to ensure high-quality, reliable, and maintainable automated tests across multiple applications.

### 1️⃣ Scope
_UI & API automation, independent and reusable tests._

### 2️⃣ Approach
_Modular, reusable and data-driven tests executed in Docker containers; orchestrated via GitHub Actions._

### 3️⃣ Types of Tests
_Functional, API, exploratory, positive / negative and validation tests._

### 4️⃣ Reporting & Results
_Playwright & Newman HTML reports; failure screenshots; CI artifacts for traceability._

---

## Project Structure

| ** Application ** | Scope |
|------|------|
| ParaBank | UI automation for banking scenarios |
| Restful Booker | API testing for booking management scenarios |
| Automation Exercise | UI and API automation for e-commerce scenarios |


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

```
git clone https://github.com/alexB35/qa-automation-portfolio.git
cd qa-automation-portfolio
```

- Build the Docker image :

```
docker build -t qa-portfolio .
```

- Run tests :

```
docker run --rm qa-portfolio
```

Reports are generated inside each app’s outputs/ folder.
To copy them locally :

```
docker cp <insert_container_id>:/app/02_api/outputs ./my_local_reports
```

---

> [!NOTE]

> Test data is dynamically generated where possible.

> Tests are independent & reusable.

> CI/CD pipelines generate reports and store artifacts automatically.

> Docker image includes known npm dependency vulnerabilities. In a production environment, these would be addressed by pinning secure package versions and using a minimal base image.


