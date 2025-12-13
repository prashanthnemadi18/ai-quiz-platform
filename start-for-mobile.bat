@echo off
echo ========================================
echo  Starting Quiz Platform for Mobile
echo ========================================
echo.
echo Finding your IP address...
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4 Address"') do (
    set IP=%%a
    goto :found
)

:found
set IP=%IP:~1%
echo ========================================
echo  Server Starting...
echo ========================================
echo.
echo  Share this link with students:
echo.
echo  http://%IP%:3000
echo.
echo ========================================
echo  Instructions for Students:
echo  1. Connect to the same WiFi
echo  2. Open browser on phone
echo  3. Type the URL above
echo  4. Start taking quizzes!
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev:network
