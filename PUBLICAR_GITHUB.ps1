param([Parameter(Mandatory=$true)][ValidatePattern('^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$')][string]$Repositorio)
$ErrorActionPreference='Stop'
Set-Location -LiteralPath $PSScriptRoot
if(-not (Get-Command gh -ErrorAction SilentlyContinue)){throw 'Instala GitHub CLI desde https://cli.github.com e inicia sesión con gh auth login.'}
gh auth status
if($LASTEXITCODE -ne 0){throw 'Inicia sesión con gh auth login.'}
if(-not (Test-Path -LiteralPath '.git')){git init -b main}
git add .
git diff --cached --quiet
if($LASTEXITCODE -eq 1){git commit -m 'PRISMA Online: banco de 40 retos y Google Sheets'}
if($LASTEXITCODE -ne 0){throw 'No fue posible preparar el commit.'}
gh repo create $Repositorio --public --source . --remote origin --push
if($LASTEXITCODE -ne 0){throw 'No se publicó. Revisa la cuenta y si el repositorio ya existe.'}
