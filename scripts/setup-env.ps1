# 🔒 SCRIPT DE CONFIGURAÇÃO SEGURA - META ADS API
# Execute este script uma vez para configurar o ambiente local

Write-Host "🚀 Configurando Meta Pixel de forma segura..." -ForegroundColor Cyan

# Verificar se .env.local já existe
if (Test-Path ".env.local") {
    Write-Host "⚠️  Arquivo .env.local já existe!" -ForegroundColor Yellow
    $overwrite = Read-Host "Deseja sobrescrever? (s/N)"
    if ($overwrite -ne "s" -and $overwrite -ne "S") {
        Write-Host "❌ Configuração cancelada." -ForegroundColor Red
        exit
    }
}

# Criar conteúdo do .env.local
$envContent = @"
# 🔐 VARIÁVEIS SENSÍVEIS - NUNCA COMMITAR ESTE ARQUIVO
# Meta/Facebook API Configuration
VITE_FACEBOOK_PIXEL_ID=643598702005540
FACEBOOK_ACCESS_TOKEN=EAAGpn3fXmJQBO1G9i92wm0P1KfmDbtrCbAkkXeocn9cbzct3ZCpsXtEwLlE54fhVxUOrcnVUCi57UuH1ixTJokzuUnmk3dMh20d2Aui1PydCdiPDOhY6rEBrmPtAFLXZCXw9ZAQAgIJwvmIaTA2AWZA8ZBUOsDGRa2eezCTkkDB5UEa7qj8Sk6qXIAE4b0mBQpgZDZD

# API Version (pode ser pública)
VITE_FACEBOOK_API_VERSION=v18.0

# Environment
NODE_ENV=development
"@

# Escrever arquivo
$envContent | Out-File -FilePath ".env.local" -Encoding UTF8

Write-Host "✅ Arquivo .env.local criado com sucesso!" -ForegroundColor Green

# Verificar se está no .gitignore
$gitignoreContent = Get-Content ".gitignore" -Raw -ErrorAction SilentlyContinue
if ($gitignoreContent -match "\.env\.local") {
    Write-Host "✅ Arquivo .env.local já está protegido no .gitignore" -ForegroundColor Green
} else {
    Write-Host "⚠️  Adicionando .env.local ao .gitignore..." -ForegroundColor Yellow
    Add-Content ".gitignore" "`n.env.local"
    Write-Host "✅ Proteção adicionada ao .gitignore" -ForegroundColor Green
}

# Verificar node_modules
if (Test-Path "node_modules") {
    Write-Host "✅ Dependências já instaladas" -ForegroundColor Green
} else {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
    Write-Host "✅ Dependências instaladas!" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 CONFIGURAÇÃO CONCLUÍDA!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Execute: npm run dev" -ForegroundColor White
Write-Host "2. Verifique se aparece: '🔒 Meta Pixel configurado com segurança'" -ForegroundColor White
Write-Host "3. Configure as variáveis na Vercel para produção" -ForegroundColor White
Write-Host ""
Write-Host "📖 Guia completo: docs/META_SECURITY_GUIDE.md" -ForegroundColor Cyan 