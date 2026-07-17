#Requires -RunAsAdministrator
$ErrorActionPreference = "Stop"

$AppRoot = $PSScriptRoot | Split-Path -Parent
Set-Location $AppRoot

$StandaloneDir = Join-Path $AppRoot ".next\standalone"
$ServerJs = Join-Path $StandaloneDir "server.js"

if (-not (Test-Path $ServerJs)) {
    Write-Host "Standalone nao encontrado. Rodando build completo..." -ForegroundColor Yellow
    if (-not (Test-Path (Join-Path $AppRoot "node_modules"))) {
        npm ci
    }
    npm run build
}

if (-not (Test-Path ".env.local")) {
    $vpsEnv = Join-Path $AppRoot "deploy\env.vps.local"
    if (Test-Path $vpsEnv) {
        Copy-Item $vpsEnv ".env.local"
        Write-Host "Usando deploy\env.vps.local como .env.local" -ForegroundColor Green
    } else {
        throw "Copie .env.local para $AppRoot antes de instalar."
    }
}

# Next carrega .env.local do diretorio de execucao
Copy-Item ".env.local" (Join-Path $StandaloneDir ".env.local") -Force

# static + public no standalone (caso build local nao tenha copiado)
$staticSrc = Join-Path $AppRoot ".next\static"
$staticDst = Join-Path $StandaloneDir ".next\static"
if (Test-Path $staticSrc) {
    Copy-Item $staticSrc $staticDst -Recurse -Force
}
$pubSrc = Join-Path $AppRoot "public"
$pubDst = Join-Path $StandaloneDir "public"
if (Test-Path $pubSrc) {
    Copy-Item $pubSrc $pubDst -Recurse -Force
}

Write-Host "==> Configurando Apache (XAMPP)..." -ForegroundColor Cyan
$HttpdConf = "C:\xampp\apache\conf\httpd.conf"
$VhostsFile = "C:\xampp\apache\conf\extra\httpd-vhosts.conf"
$VhostSrc = Join-Path $AppRoot "deploy\apache-vhost.conf"

if (Test-Path $HttpdConf) {
    $lines = Get-Content $HttpdConf
    $lines = $lines | ForEach-Object {
        $_ -replace "^#LoadModule proxy_module ", "LoadModule proxy_module " `
           -replace "^#LoadModule proxy_http_module ", "LoadModule proxy_http_module "
    }
    if ($lines -notcontains "Include conf/extra/httpd-vhosts.conf") {
        $lines += "Include conf/extra/httpd-vhosts.conf"
    }
    Set-Content $HttpdConf $lines

    Copy-Item $VhostSrc $VhostsFile -Force
    Write-Host "VirtualHost Apache OK." -ForegroundColor Green
} else {
    Write-Host "XAMPP nao encontrado. Configure manualmente (deploy\DEPLOY.md)." -ForegroundColor Yellow
}

Write-Host "==> Firewall porta 80..." -ForegroundColor Cyan
New-NetFirewallRule -DisplayName "HTTP-In" -Direction Inbound -Protocol TCP -LocalPort 80 -Action Allow -ErrorAction SilentlyContinue | Out-Null

Write-Host "==> PM2..." -ForegroundColor Cyan
npm install -g pm2 pm2-windows-startup 2>$null

pm2 delete descomplicalibras 2>$null
pm2 start $ServerJs --name descomplicalibras --cwd $StandaloneDir
pm2 save
pm2-startup install 2>$null

Write-Host ""
Write-Host "Pronto! Reinicie Apache no XAMPP." -ForegroundColor Green
Write-Host "Local:  http://127.0.0.1:3000"
Write-Host "Site:   https://descomplicalibras.shop"
