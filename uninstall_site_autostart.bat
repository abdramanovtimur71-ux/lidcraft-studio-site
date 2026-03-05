@echo off
set TASK_NAME=LidCraftStudio-PublicSite
schtasks /Delete /TN "%TASK_NAME%" /F
if %ERRORLEVEL% EQU 0 (
  echo [OK] Автозапуск удален: %TASK_NAME%
) else (
  echo [INFO] Задача не найдена или уже удалена
)
