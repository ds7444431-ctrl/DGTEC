@echo off
cd /d "%~dp0"
if not exist .env copy .env.example .env >nul
call npm.cmd install
start "" cmd /c "timeout /t 15 >nul & start http://localhost:3000"
call npm.cmd run dev
pause
