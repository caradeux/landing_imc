#!/bin/sh
# Script de inicio para Full Stack - IMC Servicios Chile SpA
# Inicia tanto Nginx como Node.js en el mismo contenedor

set -e

echo "🚀 Iniciando IMC Servicios Chile SpA - Full Stack..."

# Función para logging
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Verificar que el directorio público existe
if [ ! -d "/app/public" ]; then
    log "❌ Error: Directorio /app/public no encontrado"
    exit 1
fi

# Verificar que server.js existe
if [ ! -f "/app/server.js" ]; then
    log "❌ Error: server.js no encontrado"
    exit 1
fi

# Configurar variables de entorno por defecto
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-3001}

log "📋 Configuración:"
log "   - NODE_ENV: $NODE_ENV"
log "   - PORT: $PORT"
log "   - Directorio público: /app/public"

# Crear directorios necesarios para nginx
mkdir -p /var/log/nginx /var/lib/nginx /tmp/nginx
chown -R nginx:nginx /var/log/nginx /var/lib/nginx /tmp/nginx

# Verificar configuración de nginx
log "🔍 Verificando configuración de nginx..."
nginx -t
if [ $? -eq 0 ]; then
    log "✅ Configuración de nginx válida"
else
    log "❌ Error en configuración de nginx"
    exit 1
fi

# Iniciar nginx en background
log "🌐 Iniciando nginx..."
nginx -g "daemon off;" &
NGINX_PID=$!

# Esperar un momento para que nginx se inicie
sleep 2

# Verificar que nginx esté corriendo
if kill -0 $NGINX_PID 2>/dev/null; then
    log "✅ Nginx iniciado correctamente (PID: $NGINX_PID)"
else
    log "❌ Error al iniciar nginx"
    exit 1
fi

# Iniciar servidor Node.js
log "🟢 Iniciando servidor Node.js..."
log "   - Puerto: $PORT"
log "   - Archivo: server.js"

# Cambiar al directorio de la aplicación
cd /app

# Iniciar el servidor Node.js
exec node server.js
