# ================================
# Base image with Playwright
# ================================
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

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
# Install Newman + Allure CLI
# ================================
RUN npm install -g newman newman-reporter-htmlextra
RUN npm install -g allure-commandline

# ================================
# Default command: run Playwright tests
# ================================
CMD ["npx", "playwright", "test"]