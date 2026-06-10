$ErrorActionPreference = "Stop"

Write-Host "Starting Docker stack..." -ForegroundColor Cyan

docker-compose up --build -d

Write-Host "Waiting for ParaBank startup..." -ForegroundColor Cyan

$parabankContainer = docker-compose ps -q parabank

for ($i = 1; $i -le 60; $i++) {
  $health = docker inspect --format "{{.State.Health.Status}}" $parabankContainer 2>$null

  if ($health -eq "healthy") {
    Write-Host "ParaBank is healthy." -ForegroundColor Green
    break
  }

  Start-Sleep -Seconds 2
}

Write-Host "ParaBank startup logs:" -ForegroundColor Cyan
docker-compose logs parabank

Write-Host "Following test logs only..." -ForegroundColor Cyan
docker-compose logs -f tests

$testsContainer = docker-compose ps -q tests
docker wait $testsContainer | Out-Null
$composeExitCode = docker inspect --format "{{.State.ExitCode}}" $testsContainer

Write-Host "Stopping Docker stack..." -ForegroundColor Cyan
docker-compose down

Write-Host "Generating local Allure hub..." -ForegroundColor Cyan
node docker-scripts/create-local-allure-hub.js

Write-Host "Serving reports at http://localhost:9323" -ForegroundColor Cyan
Start-Process "http://localhost:9323"

npx http-server reports -p 9323 -c-1

exit $composeExitCode