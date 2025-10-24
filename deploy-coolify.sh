#!/bin/bash
# Script de despliegue simplificado para Coolify - IMC Servicios Chile SpA
# Versión optimizada para producción

set -e  # Salir si hay algún error

echo "🚀 Iniciando despliegue de IMC Servicios Chile SpA en Coolify..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    error "No se encontró package.json. Ejecuta este script desde el directorio raíz del proyecto."
fi

log "Verificando configuración..."

# Verificar archivos necesarios
required_files=("Dockerfile" "docker-compose.yml" "nginx.conf")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        error "Archivo requerido no encontrado: $file"
    fi
done

success "Archivos de configuración encontrados"

# Verificar Docker
if ! command -v docker &> /dev/null; then
    error "Docker no está instalado o no está en el PATH"
fi

if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose no está instalado o no está en el PATH"
fi

success "Docker y Docker Compose disponibles"

# Limpiar contenedores anteriores
log "Limpiando contenedores anteriores..."
docker-compose down --remove-orphans || true

# Construir imagen
log "Construyendo imagen Docker..."
docker build -t imc-servicios-chile:latest .

if [ $? -eq 0 ]; then
    success "Imagen construida correctamente"
else
    error "Error al construir la imagen Docker"
fi

# Desplegar con docker-compose
log "Desplegando aplicación..."
docker-compose up -d

if [ $? -eq 0 ]; then
    success "Aplicación desplegada correctamente"
else
    error "Error al desplegar la aplicación"
fi

# Esperar a que el contenedor esté listo
log "Esperando a que la aplicación esté lista..."
sleep 10

# Verificar health check
log "Verificando health check..."
max_attempts=30
attempt=1

while [ $attempt -le $max_attempts ]; do
    if curl -f http://localhost:8080/health &> /dev/null; then
        success "Health check exitoso"
        break
    else
        warning "Intento $attempt/$max_attempts - Esperando health check..."
        sleep 2
        ((attempt++))
    fi
done

if [ $attempt -gt $max_attempts ]; then
    error "Health check falló después de $max_attempts intentos"
fi

# Verificar estado de contenedores
log "Verificando estado de contenedores..."
docker-compose ps

# Mostrar logs recientes
log "Mostrando logs recientes..."
docker-compose logs --tail=20

# Mostrar información de acceso
echo ""
echo "🎉 ¡Despliegue completado exitosamente!"
echo ""
echo "📊 Información de acceso:"
echo "   🌐 Sitio web: http://localhost:8080"
echo "   🏥 Health check: http://localhost:8080/health"
echo "   📄 Sitemap: http://localhost:8080/sitemap.xml"
echo "   🤖 Robots: http://localhost:8080/robots.txt"
echo ""
echo "🔧 Comandos útiles:"
echo "   📋 Ver estado: docker-compose ps"
echo "   📝 Ver logs: docker-compose logs -f"
echo "   🛑 Detener: docker-compose down"
echo "   🔄 Reiniciar: docker-compose restart"
echo ""

success "IMC Servicios Chile SpA está funcionando correctamente en Coolify!"
