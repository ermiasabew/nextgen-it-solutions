@echo off
echo ========================================
echo Deploy to GitHub - NextGen IT Solutions
echo ========================================
echo.

echo Step 1: Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)
echo [OK] Git is installed
echo.

echo Step 2: Initializing Git repository...
if not exist .git (
    git init
    echo [OK] Git repository initialized
) else (
    echo [OK] Git repository already exists
)
echo.

echo Step 3: Adding all files...
git add .
echo [OK] Files added
echo.

echo Step 4: Creating commit...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" set commit_message=Initial commit - NextGen IT Solutions

git commit -m "%commit_message%"
echo [OK] Commit created
echo.

echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Create GitHub Repository:
echo    - Go to: https://github.com/new
echo    - Name: nextgen-it-solutions
echo    - Visibility: Public
echo    - Click "Create repository"
echo.
echo 2. Connect to GitHub (copy YOUR username):
echo    git remote add origin https://github.com/YOUR_USERNAME/nextgen-it-solutions.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Deploy on Render.com:
echo    - Go to: https://render.com
echo    - Sign up with GitHub
echo    - Click "New +" then "Web Service"
echo    - Select your repository
echo    - Click "Create Web Service"
echo.
echo 4. Your site will be live in 2-3 minutes!
echo.
echo For detailed instructions, read: DEPLOY-TO-GITHUB.md
echo.
pause
