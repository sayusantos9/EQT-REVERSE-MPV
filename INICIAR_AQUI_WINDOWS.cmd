@echo off
setlocal EnableExtensions
chcp 65001 >nul
TITLE EQT Reverse V11 - Sem Supabase - Iniciar
set "PROJECT_DIR=%~dp0"
pushd "%PROJECT_DIR%" || goto :error

echo.
echo ======================================================
echo    EQT REVERSE V11 - INICIADOR AUTOMATICO
 echo ======================================================
echo.
echo Pasta deste app: %CD%
if not exist "package.json" (
  echo [ERRO] package.json nao encontrado na pasta deste script.
  goto :error
)
if not exist "App.js" (
  echo [ERRO] App.js nao encontrado nesta pasta.
  goto :error
)
where node >nul 2>nul || (echo [ERRO] Instale Node.js 22 LTS primeiro. & goto :error)
where npm.cmd >nul 2>nul || (echo [ERRO] npm.cmd nao encontrado. & goto :error)
for /f %%V in ('node -p "process.versions.node"') do set "NODE_VER=%%V"
echo Node.js: %NODE_VER%
node -e "if (Number(process.versions.node.split('.')[0]) < 22) process.exit(1)" || (echo [ERRO] Este app exige Node.js 22.13+ & goto :error)
echo.
echo [1/3] Conferindo nome do projeto...
call npm.cmd --prefix "%CD%" pkg get name
if errorlevel 1 goto :error
echo.
echo [2/3] Instalando dependencias EXATAMENTE nesta pasta...
call npm.cmd --prefix "%CD%" install
if errorlevel 1 goto :error
if not exist "%CD%\node_modules\expo\bin\cli" (
 echo [ERRO] O Expo nao apareceu em node_modules desta pasta.
 echo Informe o erro do npm exibido acima.
 goto :error
)
echo.
echo [3/3] Iniciando Expo local diretamente - sem npx...
node "%CD%\node_modules\expo\bin\cli" start --lan --clear
if errorlevel 1 goto :error
popd
pause
exit /b 0
:error
echo.
echo =============================================
echo  NAO FOI POSSIVEL INICIAR O EQT REVERSE.
echo  Fotografe o erro ACIMA e envie ao ChatGPT.
echo  Nao use npm audit fix --force.
echo =============================================
popd
pause
exit /b 1
