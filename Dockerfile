# ================================
# Base image with Playwright
# ================================
FROM mcr.microsoft.com/playwright:v1.60.0-jammy

# ================================
# Set working directory
# ================================
WORKDIR /app

# ================================
# Copy project files
# ================================
COPY . .

# ================================
# Install project dependencies
# ================================
RUN npm install

# ================================
# Install Newman reporter
# ================================
RUN npm install newman-reporter-allure@2.15.1

# ================================
# Install Allure CLI
# ================================
RUN npm install -g allure-commandline

# ================================
# Run all test suites
# ================================
CMD ["sh", "-c", "\
  npx playwright test --project=parabank ; \
  npm run test:restful-booker ; \
  npx playwright test --project=automation-exercise ; \
  mkdir -p /app/outputs/parabank /app/outputs/restful-booker /app/outputs/automation-exercise && \
  cp -r 01_banking/parabank/outputs/allure-report/. /app/outputs/parabank/ && \
  cp -r 02_api/restful_booker/outputs/allure-report/. /app/outputs/restful-booker/ && \
  cp -r 03_ecommerce/automation-exercise/outputs/allure-report/. /app/outputs/automation-exercise/ \
"]