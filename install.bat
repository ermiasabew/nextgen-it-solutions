@echo off
echo ========================================
echo NextGen IT Solutions - Server Setup
echo ========================================
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

echo Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed!
    pause
    exit /b 1
)

echo [OK] npm is installed
npm --version
echo.

echo Installing dependencies...
echo This may take a few minutes...
echo.
call npm install

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Installation failed!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the server, run:
echo   npm start
echo.
echo Or for development mode with auto-restart:
echo   npm run dev
echo.
echo Then open your browser to:
echo   Main Site: http://localhost:3000
echo   Admin Panel: http://localhost:3000/admin
echo.
echo Default Admin Login:
echo   Username: admin
echo   Password: admin123
echo.
pause
