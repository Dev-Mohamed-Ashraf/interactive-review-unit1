@echo off
rem Double-click: shares the review on the same Wi-Fi (iPad / iPhone / interactive board).
rem Open the address printed below in Safari / Chrome on the device. Needs Python.
cd /d "%~dp0"
where python >nul 2>nul
if not %errorlevel%==0 (
  echo Python is not installed. Install it from https://www.python.org/downloads/ then try again.
  pause
  exit /b
)
echo Open the address below on the iPad / phone / board (same Wi-Fi). Keep this window open.
python tools\serve.py 8765 --lan
pause
