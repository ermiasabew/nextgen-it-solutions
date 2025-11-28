@echo off
echo ========================================
echo NextGen IT Solutions - Deployment Helper
echo ========================================
echo.

echo This script will help you prepare for deployment
echo.

echo Step 1: Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo Please download Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)
echo [OK] Git is installed
echo.

echo Step 2: Initialize Git repository...
if not exist .git (
    git init
    echo [OK] Git repository initialized
) else (
    echo [OK] Git repository already exists
)
echo.

echo Step 3: Add all files...
git add .
echo [OK] Files added
echo.

echo Step 4: Create commit...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Update NextGen IT Solutions website

git commit -m "%commit_message%"
echo [OK] Commit created
echo.

echo ========================================
echo Next Steps for Deployment:
echo ========================================
echo.
echo 1. Create a GitHub repository at: https://github.com/new
echo    Name it: nextgen-it-solutions
echo.
echo 2. Run these commands:
echo    git branch -M main
echo    git remote add origin https://github.com/YOUR_USERNAME/nextgen-it-solutions.git
echo    git push -u origin main
echo.
echo 3. Deploy on Render.com:
echo    - Go to: https://render.com
echo    - Sign up (free)
echo    - Click "New +" then "Web Service"
echo    - Connect your GitHub repository
echo    - Click "Create Web Service"
echo.
echo 4. Your site will be live in 2-3 minutes!
echo.
echo For detailed instructions, read: DEPLOYMENT-GUIDE.md
echo.
pause
