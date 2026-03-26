param(
  [int]$Port = 3000,
  [switch]$OpenBrowser
)

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host ""
  Write-Host "Node.js is not installed or not available in PATH." -ForegroundColor Red
  Write-Host "Install Node.js 18+ and run this script again." -ForegroundColor Yellow
  exit 1
}

Write-Host ""
Write-Host "Starting the invitation site..." -ForegroundColor Cyan
Write-Host "Local URL: http://127.0.0.1:$Port" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor DarkGray
Write-Host ""

if ($OpenBrowser) {
  Start-Job -ScriptBlock {
    param($TargetPort)
    Start-Sleep -Seconds 2
    Start-Process "http://127.0.0.1:$TargetPort"
  } -ArgumentList $Port | Out-Null
}

$env:PORT = "$Port"
node server.js
