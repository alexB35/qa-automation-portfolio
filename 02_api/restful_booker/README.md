![Postman / Newman](https://img.shields.io/badge/Postman-API_Testing-orange)
![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/restful-booker-api.yml/badge.svg)
![Allure](https://img.shields.io/badge/Allure-Test%20Reporting-ff69b4)

# Restful Booker API Automation

[https://restful-booker.herokuapp.com](https://restful-booker.herokuapp.com)

## Overview

This project covers **API automation** for the Restful Booker API.  

It demonstrates CRUD operations via API: create, retrieve, update, and delete bookings. Includes positive and negative scenarios with Newman.

---

## Tech Stack

- **Postman + Newman** - _API testing_
- **Docker** - _containerized execution_
- **GitHub Actions** - _CI/CD_

---

## Project Structure

| Folder | Description |
|------|------|
| `tests/` | Newman API test collections |
| `postman/` | Collections & environments |
| `resources/` | Payloads, schemas |
| `outputs/` | Allure reports |
| `jira/` | Screenshots of Jira boards and cards |

**Jira board:** [RFB Board](https://alexb35.atlassian.net/jira/software/projects/RFB/boards/2)

---

## How to Run Tests

Refer to the [root README](../../README.md) for Docker and CI instructions.

```bash
newman run 02_api/restful_booker/5_postman/RFB-00_Prerequisites.postman_collection.json \
  -e 02_api/restful_booker/5_postman/environment.json
```

## Using GitHub Actions

Trigger the workflow: restful-booker-api.yml

## Reports :

Test execution results are generated using Allure.

- Reports are automatically generated during CI runs
- Available as downloadable artifacts in GitHub Actions
- Include request/response details and failure evidence

---

> [!NOTE]
> Collections are executed sequentially — prerequisites must run first to generate the auth token.
> Each collection targets a specific CRUD operation.