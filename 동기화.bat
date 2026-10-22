@echo off
chcp 65001 >nul
rem YBM DS — 검증 → 커밋 → GitHub 반영 → 가이드 사이트 재배포 (Figma 점검은 Claude 에게 "ds 동기화")
cd /d "%~dp0"
node sync.mjs deploy
pause
