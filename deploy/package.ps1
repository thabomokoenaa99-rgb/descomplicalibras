$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$OutZip = Join-Path $PSScriptRoot "descomplicalibras-deploy.zip"

Write-Host "Build de producao..." -ForegroundColor Cyan
Set-Location $Root

# Garante build atualizado
npm run build

Write-Host "Empacotando..." -ForegroundColor Cyan
$Stage = Join-Path $env:TEMP "descomplicalibras-stage"
if (Test-Path $Stage) { Remove-Item $Stage -Recurse -Force }
New-Item -ItemType Directory -Path $Stage | Out-Null

$Include = @(
    ".next\standalone",
    ".next\static",
    "public",
    "deploy",
    "package.json",
    "package-lock.json"
)

# env de producao (nao commitar — ja esta no .gitignore)
$vpsEnv = Join-Path $Root "deploy\env.vps.local"
if (-not (Test-Path $vpsEnv)) {
    Write-Host "AVISO: deploy\env.vps.local nao encontrado. Copie .env.local manualmente na VPS." -ForegroundColor Yellow
}

foreach ($item in $Include) {
    $src = Join-Path $Root $item
    if (Test-Path $src) {
        Copy-Item $src (Join-Path $Stage $item) -Recurse -Force
    }
}

# static dentro de standalone/.next
$staticSrc = Join-Path $Root ".next\static"
$staticDst = Join-Path $Stage ".next\standalone\.next\static"
if (Test-Path $staticSrc) {
    New-Item -ItemType Directory -Force -Path (Split-Path $staticDst) | Out-Null
    Copy-Item $staticSrc $staticDst -Recurse -Force
}

# public dentro de standalone
$pubSrc = Join-Path $Root "public"
$pubDst = Join-Path $Stage ".next\standalone\public"
if (Test-Path $pubSrc) {
    Copy-Item $pubSrc $pubDst -Recurse -Force
}

if (Test-Path $OutZip) { Remove-Item $OutZip -Force }
Compress-Archive -Path "$Stage\*" -DestinationPath $OutZip -Force
Remove-Item $Stage -Recurse -Force

Write-Host "Pacote criado: $OutZip" -ForegroundColor Green
Write-Host "Copie este ZIP para a VPS via RDP e extraia em C:\apps\descomplicalibras\"
