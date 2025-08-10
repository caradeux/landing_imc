#!/bin/bash

# Deploy script for IMC Servicios Chile SpA website
# Optimized for Coolify deployment at http://192.168.1.12:8000/

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
COOLIFY_HOST="192.168.1.12"
COOLIFY_PORT="8000"
APP_NAME="imc-servicios-chile"
IMAGE_NAME="imc-servicios-chile:latest"

echo -e "${BLUE}🚀 Iniciando despliegue de IMC Servicios Chile SpA${NC}"
echo -e "${BLUE}📍 Destino: http://${COOLIFY_HOST}:${COOLIFY_PORT}/${NC}"
echo ""

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker no está ejecutándose. Por favor, inicia Docker."
    exit 1
fi

print_status "Docker está ejecutándose"

# Check if required files exist
required_files=("Dockerfile" "docker-compose.yml" "nginx.conf" "package.json")
for file in "${required_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        print_error "Archivo requerido no encontrado: $file"
        exit 1
    fi
done

print_status "Todos los archivos requeridos están presentes"

# Clean up previous builds
echo -e "${BLUE}🧹 Limpiando builds anteriores...${NC}"
docker system prune -f > /dev/null 2>&1 || true
print_status "Limpieza completada"

# Build the Docker image
echo -e "${BLUE}🔨 Construyendo imagen Docker...${NC}"
if docker build -t "$IMAGE_NAME" .; then
    print_status "Imagen Docker construida exitosamente"
else
    print_error "Error al construir la imagen Docker"
    exit 1
fi

# Check image size
IMAGE_SIZE=$(docker images "$IMAGE_NAME" --format "table {{.Size}}" | tail -n 1)
print_status "Tamaño de la imagen: $IMAGE_SIZE"

# Stop and remove existing containers
echo -e "${BLUE}🛑 Deteniendo contenedores existentes...${NC}"
docker-compose down > /dev/null 2>&1 || true
print_status "Contenedores existentes detenidos"

# Deploy with docker-compose
echo -e "${BLUE}🚀 Desplegando aplicación...${NC}"
if docker-compose up -d; then
    print_status "Aplicación desplegada exitosamente"
else
    print_error "Error al desplegar la aplicación"
    exit 1
fi

# Wait for application to be ready
echo -e "${BLUE}⏳ Esperando que la aplicación esté lista...${NC}"
sleep 10

# Health check
echo -e "${BLUE}🏥 Verificando salud de la aplicación...${NC}"
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    if curl -f -s "http://localhost:8080/health" > /dev/null; then
        print_status "Aplicación está saludable"
        break
    fi
    
    if [ $attempt -eq $max_attempts ]; then
        print_error "La aplicación no responde después de $max_attempts intentos"
        echo -e "${YELLOW}Mostrando logs del contenedor:${NC}"
        docker-compose logs --tail=20
        exit 1
    fi
    
    echo -e "${YELLOW}Intento $attempt/$max_attempts - Esperando...${NC}"
    sleep 2
    ((attempt++))
done

# Show container status
echo -e "${BLUE}📊 Estado de los contenedores:${NC}"
docker-compose ps

# Show resource usage
echo -e "${BLUE}💾 Uso de recursos:${NC}"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"

# Final success message
echo ""
echo -e "${GREEN}🎉 ¡Despliegue completado exitosamente!${NC}"
echo -e "${GREEN}🌐 Sitio web disponible en: http://${COOLIFY_HOST}:8080${NC}"
echo -e "${GREEN}🔧 Panel de Coolify: http://${COOLIFY_HOST}:${COOLIFY_PORT}${NC}"
echo ""

# Show useful commands
echo -e "${BLUE}📋 Comandos útiles:${NC}"
echo -e "  Ver logs:           ${YELLOW}docker-compose logs -f${NC}"
echo -e "  Reiniciar:          ${YELLOW}docker-compose restart${NC}"
echo -e "  Detener:            ${YELLOW}docker-compose down${NC}"
echo -e "  Estado:             ${YELLOW}docker-compose ps${NC}"
echo -e "  Estadísticas:       ${YELLOW}docker stats${NC}"
echo ""

# Optional: Open browser (uncomment if needed)
# if command -v xdg-open > /dev/null; then
#     xdg-open "http://${COOLIFY_HOST}:8080"
# elif command -v open > /dev/null; then
#     open "http://${COOLIFY_HOST}:8080"
# fi

print_status "Script de despliegue completado"