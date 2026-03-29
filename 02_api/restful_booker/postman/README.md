# Restful Booker API Testing

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![Postman](https://img.shields.io/badge/Postman-API_Testing-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub_Actions-lightgrey)

---

## Overview

Restful Booker is a Web API playground created by Mark Winteringham, simulating a booking management system. It provides authentication, CRUD operations and contains some bugs (for educational purpose).

This project focuses on **API testing and automation**

It demonstrates how to design, execute, and automate API tests using:

* Playwright (API testing)
* Postman (manual and exploratory testing)
* Newman (collection execution)

The project follows a **complete QA workflow**, from test design in Jira to automated execution and reporting.

---

## Scope

The API covers a full **CRUD workflow**:

* Create a booking
* Retrieve booking details
* Update an existing booking
* Delete a booking

Each operation includes:

* Positive scenarios
* Negative scenarios
* Data validation
* Error handling

---

## Project Structure

* `tests/` → Playwright API test cases
* `outputs/` → test reports and execution logs (Newman / Playwright)
* `screenshots/` → 
* `resources/` → request payloads, helpers, and reusable utilities
* `postman/` → Postman collections and environments
* `jira/` → user stories, acceptance criteria, and test scenarios

---

## Test Approach

### Functional Testing

* Validation of API endpoints behavior
* Verification of request/response structure
* Status code validation

### Negative Testing

* Invalid or missing data
* Invalid booking IDs
* Unauthorized requests

---

## Tools & Technologies

* Playwright (API automation)
* Postman (manual & exploratory testing)
* Newman (CLI execution for Postman collections)
* TypeScript / Node.js

---

## How to Run Tests

### Playwright API Tests

```bash
npm install
npx playwright test 02_api/restful_booker/tests
```

---

### Postman (Newman)

```bash
newman run postman/collections/restful_booker_collection.json \
  -e postman/environments/restful_booker_env.json
```

---

## QA Workflow

Jira → User Stories → Acceptance Criteria → Test Scenarios → Automation (Playwright / Postman) → Execution → Reports

---

## Notes

* Tests are designed to be independent and reusable
* Dynamic data is used where applicable
* Both manual and automated testing approaches are covered

---

## Author

QA Automation Portfolio – API testing project demonstrating real-world QA practices.
