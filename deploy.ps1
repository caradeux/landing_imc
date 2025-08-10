# Deploy script for IMC Servicios Chile SpA website
# Optimized for Coolify deployment at http://192.168.1.12:8000/
# PowerShell version for Windows

param(
    [string]$CoolifyHost = "192.168.1.12",
    [string]$CoolifyPort = "8000",
    [string]$AppName = "imc-servicios-chile",
    [string]$ImageName = "imc-servicios-chile:latest"
)

# Colors for output
$Red = [System.ConsoleColor]::Red
$Green = [System.ConsoleColor]::Green
$Yellow = [System.ConsoleColor]::Yellow
$Blue = [System.ConsoleColor]::Blue
$White = [System.ConsoleColor]::White

function Write-Status {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor $Red
}

function Write-Info {
    param([string]$Message)
    Write-Host "🔵 $Message" -ForegroundColor $Blue
}

# Main deployment process
Write-Host "🚀 Iniciando despliegue de IMC Servicios Chile SpA" -ForegroundColor $Blue
Write-Host "📍 Destino: http://$CoolifyHost`:$CoolifyPort/" -ForegroundColor $Blue
Write-Host ""

# Check if Docker is running
try {
    $dockerInfo = docker info 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "Docker no está ejecutándose"
    }
    Write-Status "Docker está ejecutándose"
} catch {
    Write-Error "Docker no está ejecutándose. Por favor, inicia Docker Desktop."
    exit 1
}

# Check if required files exist
$requiredFiles = @("Dockerfile", "docker-compose.yml", "nginx.conf", "package.json")
foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Error "Archivo requerido no encontrado: $file"
        exit 1
    }
}
Write-Status "Todos los archivos requeridos están presentes"

# Clean up previous builds
Write-Info "🧹 Limpiando builds anteriores..."
try {
    docker system prune -f | Out-Null
    Write-Status "Limpieza completada"
} catch {
    Write-Warning "No se pudo limpiar completamente, continuando..."
}

# Build the Docker image
Write-Info "🔨 Construyendo imagen Docker..."
try {
    $buildOutput = docker build -t $ImageName . 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Error en la construcción"
    }
    Write-Status "Imagen Docker construida exitosamente"
} catch {
    Write-Error "Error al construir la imagen Docker"
    Write-Host $buildOutput -ForegroundColor $Red
    exit 1
}

# Check image size
try {
    $imageSize = docker images $ImageName --format "{{.Size}}" | Select-Object -First 1
    Write-Status "Tamaño de la imagen: $imageSize"
} catch {
    Write-Warning "No se pudo obtener el tamaño de la imagen"
}

# Stop and remove existing containers
Write-Info "🛑 Deteniendo contenedores existentes..."
try {
    docker-compose down 2>$null | Out-Null
    Write-Status "Contenedores existentes detenidos"
} catch {
    Write-Warning "No había contenedores previos ejecutándose"
}

# Deploy with docker-compose
Write-Info "🚀 Desplegando aplicación..."
try {
    $deployOutput = docker-compose up -d 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Error en el despliegue"
    }
    Write-Status "Aplicación desplegada exitosamente"
} catch {
    Write-Error "Error al desplegar la aplicación"
    Write-Host $deployOutput -ForegroundColor $Red
    exit 1
}

# Wait for application to be ready
Write-Info "⏳ Esperando que la aplicación esté lista..."
Start-Sleep -Seconds 10

# Health check
Write-Info "🏥 Verificando salud de la aplicación..."
$maxAttempts = 30
$attempt = 1

while ($attempt -le $maxAttempts) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8080/health" -UseBasicParsing -TimeoutSec 5
        if ($response.StatusCode -eq 200) {
            Write-Status "Aplicación está saludable"
            break
        }
    } catch {
        # Continue trying
    }
    
    if ($attempt -eq $maxAttempts) {
        Write-Error "La aplicación no responde después de $maxAttempts intentos"
        Write-Warning "Mostrando logs del contenedor:"
        docker-compose logs --tail=20
        exit 1
    }
    
    Write-Warning "Intento $attempt/$maxAttempts - Esperando..."
    Start-Sleep -Seconds 2
    $attempt++
}

# Show container status
Write-Info "📊 Estado de los contenedores:"
docker-compose ps

# Show resource usage
Write-Info "💾 Uso de recursos:"
try {
    docker stats --no-stream --format "table {{.Container}}`t{{.CPUPerc}}`t{{.MemUsage}}`t{{.NetIO}}"
} catch {
    Write-Warning "No se pudo obtener estadísticas de recursos"
}

# Final success message
Write-Host ""
Write-Host "🎉 ¡Despliegue completado exitosamente!" -ForegroundColor $Green
Write-Host "🌐 Sitio web disponible en: http://$CoolifyHost`:8080" -ForegroundColor $Green
Write-Host "🔧 Panel de Coolify: http://$CoolifyHost`:$CoolifyPort" -ForegroundColor $Green
Write-Host ""

# Show useful commands
Write-Info "📋 Comandos útiles:"
Write-Host "  Ver logs:           " -NoNewline; Write-Host "docker-compose logs -f" -ForegroundColor $Yellow
Write-Host "  Reiniciar:          " -NoNewline; Write-Host "docker-compose restart" -ForegroundColor $Yellow
Write-Host "  Detener:            " -NoNewline; Write-Host "docker-compose down" -ForegroundColor $Yellow
Write-Host "  Estado:             " -NoNewline; Write-Host "docker-compose ps" -ForegroundColor $Yellow
Write-Host "  Estadísticas:       " -NoNewline; Write-Host "docker stats" -ForegroundColor $Yellow
Write-Host ""

# Optional: Open browser
try {
    Start-Process "http://$CoolifyHost`:8080"
    Write-Status "Abriendo navegador..."
} catch {
    Write-Warning "No se pudo abrir el navegador automáticamente"
}

Write-Status "Script de despliegue completado"