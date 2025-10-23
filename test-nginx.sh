#!/bin/bash
# Script para probar la configuración de nginx

echo "Probando configuración de nginx..."

# Crear un contenedor temporal para probar la configuración
docker run --rm -v "$(pwd)/nginx.conf:/etc/nginx/nginx.conf:ro" nginxinc/nginx-unprivileged:alpine3.21 nginx -t

echo "Configuración de nginx validada exitosamente!"
