@echo off
rem Double-click: opens the review on this computer.
rem With Python installed it runs a tiny local server (best); otherwise it opens index.html directly.
cd /d "%~dp0"
where python >nul 2>nul
if %errorlevel%==0 (
  start "" cmd /c "timeout /t 2 >nul & start http://127.0.0.1:8765"
  echo The review is running. Keep this window open during class. Close it to stop.
  python tools\serve.py 8765
) else (
  start "" "%~dp0index.html"
)
