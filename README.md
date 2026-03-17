# QA Automation Portfolio

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![Robot Framework](https://img.shields.io/badge/Robot_Framework-Automation-green)
![Postman](https://img.shields.io/badge/Postman-API_Testing-orange)
![Jira](https://img.shields.io/badge/Jira-Test_Management-blue)
![Python](https://img.shields.io/badge/Python-3.10-lightgrey)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-lightgrey)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub%20Actions-lightgrey)

This repository demonstrates QA automation practices including **UI automation, API testing, and test management**.  
It showcases a workflow from **test cases in Jira** to **automated test execution** and **reporting**.

---

## Technologies

- Playwright (UI & API automation)  
- Postman (API testing)  
- JavaScript / Node.js  
- Robot Framework (legacy / additional) 
- Jira

---

## Project Structure

The repository is organized by application, each containing its own test assets and execution results.

### 01_banking
- **ParaBank UI** – End-to-end UI automation for banking workflows
  - `tests/` → Playwright & Robot Framework test cases (registration, login, transactions)
  - `outputs/` → test execution reports and logs
  - `screenshots/` → captured evidence during test runs
  - `resources/` → locators, reusable keywords, test utilities
  - `jira/` → screenshots illustrating test management
 
**Jira :** https://alexb35.atlassian.net/jira/software/projects/PBQ/boards/1




### 02_api
- **Restful Booker API** – API testing and automation for booking management scenarios
  - `tests/` → API test cases (Playwright & Postman collections)
  - `outputs/` → API responses, reports and logs
  - `screenshots/` → request/response evidence (if applicable)
  - `resources/` → request payloads, schemas, reusable helpers
  - `postman/` → Postman collections and environments
  - `jira/` → screenshots illustrating test management

**Jira :**  https://alexb35.atlassian.net/jira/software/projects/RFB/boards/2




### 03_saas
- **OrangeHRM UI** – Functional and UI automation for HR management workflows
  - `tests/` → Playwright & Robot Framework test cases (login, employee management)
  - `outputs/` → execution reports and logs
  - `screenshots/` → UI validation evidence
  - `resources/` → page objects, test data, helper functions
  - `jira/` → screenshots illustrating test management

**Jira :**  https://alexb35.atlassian.net/jira/software/projects/ORH/boards/3

---

## Workflow

A typical QA workflow implemented across the projects:

Jira → Test Cases → Automation Tests → Bug creation → Test Reporting → GitHub

---

## Versions used
- Node.js >= v20  
- npm >= v10  
- Playwright Test  

Optional (legacy / additional tools):
- Robot Framework  
- Python 3.11+  