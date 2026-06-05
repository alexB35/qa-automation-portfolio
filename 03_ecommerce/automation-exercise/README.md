# Automation Exercise UI / API

![Automation Exercise Banner](../../assets/auto-ex-banner.png)


<div align="center">

![CI](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/automation-exercise.yml/badge.svg)

<br/>

![Playwright](https://img.shields.io/badge/Playwright-Automation-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-lightgrey)
![Allure](https://img.shields.io/badge/Allure-Test%20Reporting-ff69b4)

</div>

---

## Overview

This project demonstrates **UI + API automation** for "Automation Exercise", an e-commerce platform.  

Automates online shopping flows including registration, login, product browsing, checkout and an API scenarios.

[https://automationexercise.com](https://automationexercise.com)

---

## Tech Stack

- **Playwright** - _UI & API_
- **TypeScript / Node.js**
- **Docker** - contenerized execution
- **GitHub Actions** - _CI/CD_

---

## Project Structure

| Folder | Description |
|------|------|
| [tests](https://github.com/alexB35/qa-automation-portfolio/tree/main/03_ecommerce/automation-exercise/tests) | Playwright test scripts | xx |
| [framework](https://github.com/alexB35/qa-automation-portfolio/tree/main/03_ecommerce/automation-exercise/framework) | Fixtures, helpers, page objects & API clients |
| [resources](https://github.com/alexB35/qa-automation-portfolio/tree/main/03_ecommerce/automation-exercise/resources) | Config & test data |
| [docs]((https://github.com/alexB35/qa-automation-portfolio/tree/main/03_ecommerce/automation-exercise/docs)) | Screenshots of test executions and Allure reports |
| [jira](https://github.com/alexB35/qa-automation-portfolio/tree/main/03_ecommerce/automation-exercise/jira) | Screenshots of Jira boards and cards | 

**Jira board:** [AEX Board](https://alexb35.atlassian.net/jira/software/projects/AEX/boards/3)

---

## How to Run Tests 

Refer to the [root README](../../README.md) for Docker and CI instructions.

## Locally

```bash
npm install
npx playwright install
npx playwright test 03_ecommerce/automation-exercise/tests
```

## Using GitHub Actions

Trigger the workflow: [automation-exercise-ui-api](https://github.com/alexB35/qa-automation-portfolio/actions/workflows/automation-exercise.yml)

## Reports

Test execution results are automatically generated after each workflow run using Allure.
Once the _deploy-allure-reports_ is done, you can consult :

**This page :** [Allure-Hub] (https://alexb35.github.io/qa-automation-portfolio/)
or you can
**Consult the report :** [Automation-Exercise] (https://alexb35.github.io/qa-automation-portfolio/automation-exercise/)

- Reports are automatically generated during CI runs
- Available as downloadable artifacts and consultable pages in GitHub Actions.
- Include test steps, logs, and screenshots on failure

## Allure

![Allure Automation Exercise](../../assets/allure-automation-exercise.png)

---

> [!NOTE]
> You can run an entire application, a User Story, or individual test cases.
> Playwright is configured to continue on know failure with the quality gate script.
> Debug informations (logs, screenshots) are centralized in Allure reports.