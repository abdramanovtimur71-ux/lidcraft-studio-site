@echo off
set TASK_NAME=LidCraftStudio-PublicSite
set SCRIPT_PATH=C:\Users\HP\Desktop\TIMA\aura-site\run_public_site.bat

schtasks /Delete /TN "%TASK_NAME%" /F >nul 2>nul
schtasks /Create /TN "%TASK_NAME%" /SC ONLOGON /TR "\"%SCRIPT_PATH%\"" /RL LIMITED /F
if %ERRORLEVEL% EQU 0 (
  echo [OK] Автозапуск установлен: %TASK_NAME%
) else (
  echo [ERROR] Не удалось создать задачу автозапуска
)
