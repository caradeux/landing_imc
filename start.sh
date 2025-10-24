#!/bin/sh
# Script de inicio simplificado para Full Stack - IMC Servicios Chile SpA

echo "🚀 Iniciando IMC Servicios Chile SpA - Full Stack..."

# Configurar variables de entorno
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-3001}

echo "📋 Configuración:"
echo "   - NODE_ENV: $NODE_ENV"
echo "   - PORT: $PORT"

# Crear directorios necesarios para nginx
mkdir -p /var/log/nginx /var/lib/nginx /tmp/nginx
chown -R nginx:nginx /var/log/nginx /var/lib/nginx /tmp/nginx

# Verificar configuración de nginx
echo "🔍 Verificando configuración de nginx..."
nginx -t

# Iniciar nginx en background
echo "🌐 Iniciando nginx..."
nginx -g "daemon off;" &

# Esperar un momento para que nginx se inicie
sleep 3

# Verificar que nginx esté corriendo
if pgrep nginx > /dev/null; then
    echo "✅ Nginx iniciado correctamente"
else
    echo "❌ Error al iniciar nginx"
    exit 1
fi

# Cambiar al directorio de la aplicación
cd /app

# Iniciar el servidor Node.js
echo "🟢 Iniciando servidor Node.js en puerto $PORT..."
exec node server.js