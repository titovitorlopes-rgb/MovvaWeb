@echo off
title MovveFind - Coletor Google Maps Real
cd /d "%~dp0"
echo ========================================================
echo   Iniciando MovveFind - Motor Google Maps Atualizado...
echo ========================================================
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":3000" ^| findstr "LISTENING"') do taskkill /f /pid %%a >nul 2>&1
timeout /t 1 /nobreak >nul
start "" "http://localhost:3000"
node server.js
pause
