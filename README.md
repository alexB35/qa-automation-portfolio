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

- Playwright, Robot Framework  
- Python / JavaScript for automation scripts  
- Postman  
- REST APIs  
- Jira

---

## Project Structure

### 01_Banking
- **ParaBank UI** – End-to-end UI automation tests for banking scenarios
  - `tests/` → Robot Framework & Playwright test cases (user creation, login, transactions)
  - `resources/` → locators, keywords, reusable test libraries
 
**Jira :** https://alexb35.atlassian.net/jira/software/projects/PBQ/boards/1

### 02_API_Testing
- **Restful Booker API** – API testing and automation for booking management scenarios
  - `tests/` → API test cases (Postman / Robot Framework)
  - `resources/` → request templates, payloads, reusable keywords

**Jira :**  https://alexb35.atlassian.net/jira/software/projects/RFB/boards/2

### 03_SaaS
- **OrangeHRM UI** – Functional and UI automation tests for HR management scenarios
  - `tests/` → Robot Framework & Playwright test cases
  - `resources/` → test data templates, page objects, helper keywords

**Jira :**  https://alexb35.atlassian.net/jira/software/projects/ORH/boards/3

### 04_framework
- Reusable automation utilities, keywords, and test templates for UI and API testing

### 05_output
- Centralized test datasets (CSV/JSON) used across all projects

### 06_docs
- Testing documentation and workflow notes

### 07_demo
- Screenshots and logs from tespython --version execution

---

## Workflow

A typical QA workflow implemented across the projects:

Jira → Test Cases → Automation Tests → Bug creation → Test Reporting → GitHub

---

## Versions used
- Node.js >= v24.14.0
- Npm 11.11.0
- Python 3.11+
- Robot Framework 7.4.2
- Browser drivers (Chromium/Firefox)
