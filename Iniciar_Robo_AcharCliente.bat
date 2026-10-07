@echo off
title MovveFind - Coletor Google Maps Real
cd /d "%~dp0"
echo ========================================================
echo   Iniciando MovveFind - Motor Google Maps...
echo   Local: http://localhost:3000
echo ========================================================
start "" "http://localhost:3000"
node server.js
pause
