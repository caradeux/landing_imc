# Script PowerShell para probar la configuración de nginx
Write-Host "Probando configuración de nginx..." -ForegroundColor Green

# Crear un contenedor temporal para probar la configuración
docker run --rm -v "${PWD}/nginx.conf:/etc/nginx/nginx.conf:ro" nginxinc/nginx-unprivileged:alpine3.21 nginx -t

if ($LASTEXITCODE -eq 0) {
    Write-Host "Configuración de nginx validada exitosamente!" -ForegroundColor Green
} else {
    Write-Host "Error en la configuración de nginx" -ForegroundColor Red
}
