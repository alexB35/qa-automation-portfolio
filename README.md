# QA Automation Portfolio

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![Robot Framework](https://img.shields.io/badge/Robot_Framework-Automation-green)
![Postman](https://img.shields.io/badge/Postman-API_Testing-orange)
![GitHub](https://img.shields.io/badge/GitHub-Version_Control-blue)
![Jira](https://img.shields.io/badge/Jira-Test_Management-blue)

This repository demonstrates QA automation practices including **UI automation, API testing, and test management**.  
It showcases a workflow from **test cases in Jira** to **automated test execution** and **reporting**.

---

## Technologies

- Playwright, Robot Framework  
- Python / JavaScript for automation scripts
- Postman  
- REST APIs  
- Jira

---

## Project Structure

### 01_Banking
- **`ParaBank UI & API`** – End-to-end automation tests (UI & API) for banking scenarios
  - tests/ → contains Robot Framework & Playwright test cases

### 02_SaaS_Tech
- **`DemoQA & OrangeHRM`** – Functional and UI automation tests for SaaS applications, including exploratory scenarios
  - tests/ → contains Robot Framework & Playwright test cases

### 03_framework
- Reusable automation utilities, keywords, and test templates for UI and API testing

### 04_output
- Centralized test datasets (CSV/JSON) used across all projects

### 05_docs
- Testing documentation and workflow notes

### 06_demo
- Screenshots and logs from test execution

---

## Workflow

### Typical workflow used in this project:

- Create story in Jira
- Write test cases
- Implement automation tests
- Run tests
- Log defects in Jira for traceability
- Generate test reports

---

## How to Run Tests

### Install dependencies
npm install

### Run UI tests with Playwright
npx playwright test

### Run Robot Framework tests
robot tests/
