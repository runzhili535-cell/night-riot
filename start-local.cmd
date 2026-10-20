@echo off
setlocal
cd /d "%~dp0"
set "RIOT_NODE=node"
where node >nul 2>nul
if errorlevel 1 (
  if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
    set "RIOT_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
  ) else (
    echo Please install Node.js 22.12 or newer, then run npm install.
    pause
    exit /b 1
  )
)
if not exist "node_modules\vite\bin\vite.js" (
  echo Run npm install in this folder first.
  pause
  exit /b 1
)
"%RIOT_NODE%" "node_modules\vite\bin\vite.js" --host 127.0.0.1 --open
pause
