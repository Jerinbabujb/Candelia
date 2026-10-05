@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22.12 or newer, then run this file again.
  pause
  exit /b 1
)
if not exist dist\index.html (
  echo The built demo is missing. Run START-PRODUCTION.bat to rebuild it.
  pause
  exit /b 1
)
start "" "http://localhost:3000"
node server.js --production
pause
