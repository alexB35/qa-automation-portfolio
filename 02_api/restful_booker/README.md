![Postman / Newman](https://img.shields.io/badge/Postman-API_Testing-orange)
![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/restful-booker-api.yml/badge.svg)

# Restful Booker API Automation

https://restful-booker.herokuapp.com

## Overview

This project covers **API automation** for the Restful Booker API.  

It demonstrates CRUD operations via API: create, retrieve, update, and delete bookings. Includes positive and negative scenarios with Newman.

## Technology Stack

- **Postman + Newman** (API testing)
- **TypeScript / Node.js**
- **Docker**
- **GitHub Actions**

## Project Structure

| **Restful Booker API** | API testing for booking management scenarios |
|------|------|
| `tests/` | Playwright API tests |
| `outputs/` | Newman HTML reports |
| `screenshots/` | request/response evidence (if applicable) |
| `resources/` | payloads, schemas |
| `postman/` | collections & environments |
| `jira/` | API test cases & documentation |

**Jira :**  https://alexb35.atlassian.net/jira/software/projects/RFB/boards/2

---

## How to Run Tests

## Locally

newman run 02_api/restful_booker/5_postman/RFB-00_Prerequisites.postman_collection.json -e 02_api/restful_booker/5_postman/environment.json

## Using Docker 

docker build -t qa-tests .
docker run qa-tests npx newman run 02_api/restful_booker/5_postman/RFB-00_Prerequisites.postman_collection.json

## Using GitHub Actions

Trigger the workflow: restful-booker-api.yml

## Reports :

Newman HTML reports are uploaded as artifacts (restful-booker-newman-report)