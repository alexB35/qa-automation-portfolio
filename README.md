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
- Postman  
- Python / JavaScript for automation scripts  
- REST APIs  
- Jira

---

## Project Structure

### 01_Banking
- **ParaBank UI & API** – End-to-end automation tests for banking scenarios (user creation, login, transactions)

### 02_SaaS_Tech
- **DemoQA & OrangeHRM** – Functional and UI automation tests for SaaS applications, including exploratory scenarios

### framework
- Reusable automation utilities, keywords, and test templates for UI and API testing

### test-data
- Test datasets used by automated tests

### docs
- Testing documentation and workflow notes

### demo
- Screenshots and logs from test execution

---

Typical workflow used in this project:

- Create story in Jira
- Write test cases
- Implement automation tests
- Run tests
- Capture defects in Jira (if any)
- Generate test reports

---

## How to Run Tests

Install dependencies:

npm install


Run UI tests with Playwright :

npx playwright test


Run Robot Framework tests :

robot tests/
