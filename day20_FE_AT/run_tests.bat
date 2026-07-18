@echo off
REM ============================================================
REM  run_tests.bat
REM  Connects EmpMan_phase2 (React/Vite) with EmployeeAutomation
REM  (Java Selenium + TestNG) and runs the full suite in Chrome.
REM
REM  Prerequisites:
REM    - Node.js + npm  (for Vite dev server)
REM    - Java 11+       (for Maven / Selenium)
REM    - Maven          (mvn on PATH)
REM    - Google Chrome  (for WebDriver)
REM    - Internet access on first run (WebDriverManager downloads ChromeDriver)
REM ============================================================

echo.
echo =====================================================
echo   EMS Pro - Selenium Automation Test Runner
echo =====================================================
echo.

REM ── Step 1: Start the Vite dev server in background ────────
echo [1/4] Starting EmpMan_phase2 dev server on http://localhost:5173 ...
cd /d "%~dp0EmpMan_phase2"

REM Kill any process already using port 5173 (optional cleanup)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173"') do (
    taskkill /F /PID %%a >nul 2>&1
)

REM Start Vite dev server in a new background window
start "EMS-DEV-SERVER" /min cmd /c "npm run dev"

REM ── Step 2: Wait for the server to be ready ─────────────────
echo [2/4] Waiting for dev server to be ready ...
set RETRIES=30
set READY=0
:WAIT_LOOP
timeout /t 2 /nobreak >nul
powershell -Command "try { $r = Invoke-WebRequest http://localhost:5173 -UseBasicParsing -TimeoutSec 3; exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel%==0 (
    set READY=1
    goto SERVER_READY
)
set /a RETRIES-=1
if %RETRIES% leq 0 goto SERVER_TIMEOUT
echo     Still waiting... (%RETRIES% retries left)
goto WAIT_LOOP

:SERVER_TIMEOUT
echo.
echo [ERROR] Dev server did not start within 60 seconds.
echo         Make sure Node.js is installed and run 'npm install' in EmpMan_phase2 first.
pause
exit /b 1

:SERVER_READY
echo     Dev server is UP at http://localhost:5173
echo.

REM ── Step 3: Run Maven / TestNG tests ────────────────────────
echo [3/4] Running Selenium TestNG tests (Chrome) ...
cd /d "%~dp0EmployeeAutomation"
call mvn clean test -B
set MVN_EXIT=%errorlevel%

REM ── Step 4: Shut down the dev server ────────────────────────
echo.
echo [4/4] Stopping dev server ...
taskkill /FI "WINDOWTITLE eq EMS-DEV-SERVER" /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173"') do (
    taskkill /F /PID %%a >nul 2>&1
)

REM ── Summary ──────────────────────────────────────────────────
echo.
echo =====================================================
if %MVN_EXIT%==0 (
    echo   ALL TESTS PASSED!
) else (
    echo   SOME TESTS FAILED. Check report below:
)
echo.
echo   ExtentReport : EmployeeAutomation\target\reports\ExtentReport.html
echo   Surefire XML : EmployeeAutomation\target\surefire-reports\
echo =====================================================
echo.

REM Open the ExtentReport automatically
if exist "%~dp0EmployeeAutomation\target\reports\ExtentReport.html" (
    start "" "%~dp0EmployeeAutomation\target\reports\ExtentReport.html"
)

pause
exit /b %MVN_EXIT%
