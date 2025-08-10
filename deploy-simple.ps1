# Simple deploy script for IMC Servicios Chile SpA website
# PowerShell version for Windows

param(
    [string]$ImageName = "imc-servicios-chile:latest"
)

Write-Host "Iniciando despliegue de IMC Servicios Chile SpA" -ForegroundColor Blue
Write-Host "Destino: http://192.168.1.12:8000/" -ForegroundColor Blue
Write-Host ""

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "Docker esta ejecutandose" -ForegroundColor Green
} catch {
    Write-Host "Docker no esta ejecutandose. Inicia Docker Desktop." -ForegroundColor Red
    exit 1
}

# Check required files
$requiredFiles = @("Dockerfile", "docker-compose.yml", "nginx.conf", "package.json")
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "Archivo requerido no encontrado: $file" -ForegroundColor Red
        exit 1
    }
}
Write-Host "Todos los archivos requeridos presentes" -ForegroundColor Green

# Clean up
Write-Host "Limpiando builds anteriores..." -ForegroundColor Yellow
docker system prune -f | Out-Null

# Build image
Write-Host "Construyendo imagen Docker..." -ForegroundColor Yellow
docker build -t $ImageName .
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al construir imagen" -ForegroundColor Red
    exit 1
}
Write-Host "Imagen construida exitosamente" -ForegroundColor Green

# Deploy
Write-Host "Desplegando aplicacion..." -ForegroundColor Yellow
docker-compose down | Out-Null
docker-compose up -d
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al desplegar" -ForegroundColor Red
    exit 1
}
Write-Host "Aplicacion desplegada exitosamente" -ForegroundColor Green

# Wait and check
Write-Host "Esperando que la aplicacion este lista..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Health check
Write-Host "Verificando salud de la aplicacion..." -ForegroundColor Yellow
$maxAttempts = 10
$attempt = 1

while ($attempt -le $maxAttempts) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080/health" -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200) {
            Write-Host "Aplicacion esta saludable" -ForegroundColor Green
            break
        }
    } catch {
        # Continue trying
    }
    
    if ($attempt -eq $maxAttempts) {
        Write-Host "La aplicacion no responde" -ForegroundColor Red
        docker-compose logs --tail=10
        exit 1
    }
    
    Write-Host "Intento $attempt/$maxAttempts - Esperando..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    $attempt++
}

# Show status
Write-Host ""
Write-Host "Estado de contenedores:" -ForegroundColor Blue
docker-compose ps

Write-Host ""
Write-Host "Despliegue completado exitosamente!" -ForegroundColor Green
Write-Host "Sitio web disponible en: http://192.168.1.12:8080" -ForegroundColor Green
Write-Host "Panel de Coolify: http://192.168.1.12:8000" -ForegroundColor Green

# Open browser
try {
    Start-Process "http://192.168.1.12:8080"
} catch {
    Write-Host "No se pudo abrir el navegador automaticamente" -ForegroundColor Yellow
}

Write-Host "Script completado" -ForegroundColor Green