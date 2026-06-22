@echo off
title Gemini for Windows - Build
echo.
echo  ================================================
echo   Gemini for Windows - Electron Build Script
echo  ================================================
echo.

:: Clean previous build output
if exist "dist-electron" (
    echo  [1/3] Cleaning previous build...
    rmdir /s /q "dist-electron" 2>nul
    echo        Done.
) else (
    echo  [1/3] No previous build to clean.
)
echo.

:: Install dependencies
echo  [2/3] Installing dependencies...
echo.
call npm install
if %errorlevel% neq 0 (
    echo.
    echo  !! npm install failed. Make sure Node.js is installed.
    echo     Download: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo.

:: Build the .exe
echo  [3/3] Building Windows executable...
echo.
call npm run build:win
if %errorlevel% neq 0 (
    echo.
    echo  !! Build failed. Check the errors above.
    echo.
    pause
    exit /b 1
)

echo.
echo  ================================================
echo   Build complete!
echo   Output: dist-electron\
echo  ================================================
echo.

:: Open the output folder
if exist "dist-electron" (
    explorer "dist-electron"
)

pause
