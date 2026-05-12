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
# Install Allure CLI
# ================================
RUN npm install -g allure-commandline

# ================================
# CMD is defined per workflow / per run command
# ================================
