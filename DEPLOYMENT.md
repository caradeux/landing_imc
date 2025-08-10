# 🚀 Guía de Despliegue - IMC Servicios Chile SpA

## Despliegue en Coolify (http://192.168.1.12:8000/)

Esta guía te ayudará a desplegar el sitio web de **IMC Servicios Chile SpA** en tu servidor Coolify.

## 📋 Prerrequisitos

- ✅ Docker y Docker Compose instalados
- ✅ Acceso al servidor Coolify en `http://192.168.1.12:8000/`
- ✅ Node.js 22+ (para desarrollo local)
- ✅ Conexión a internet para descargar dependencias

## 🏗️ Arquitectura del Despliegue

### Multi-Stage Docker Build
```
┌─────────────────┐    ┌─────────────────┐
│   Stage 1:      │    │   Stage 2:      │
│   Builder       │───▶│   Production    │
│                 │    │                 │
│ • Node.js 22    │    │ • Nginx Alpine  │
│ • npm ci        │    │ • Static files  │
│ • npm run build │    │ • Security      │
└─────────────────┘    └─────────────────┘
```

### Optimizaciones Implementadas
- 🔧 **Multi-stage build** para imagen mínima (< 50MB)
- 🛡️ **Usuario no-root** para seguridad
- 📦 **Cache de dependencias** optimizado
- 🗜️ **Compresión Gzip** habilitada
- 🏥 **Health checks** automáticos
- 📊 **Límites de recursos** configurados

## 🚀 Despliegue Rápido

### Opción 1: Script Automático (Recomendado)

#### En Linux/macOS:
```bash
# Hacer ejecutable el script
chmod +x deploy.sh

# Ejecutar despliegue
./deploy.sh
```

#### En Windows (PowerShell):
```powershell
# Ejecutar script de PowerShell
.\deploy.ps1
```

### Opción 2: Despliegue Manual

```bash
# 1. Construir la imagen
docker build -t imc-servicios-chile:latest .

# 2. Desplegar con docker-compose
docker-compose up -d

# 3. Verificar estado
docker-compose ps

# 4. Verificar salud
curl http://localhost:8080/health
```

## 🔧 Configuración de Coolify

### 1. Crear Nueva Aplicación
1. Accede a `http://192.168.1.12:8000/`
2. Crea un nuevo proyecto
3. Selecciona "Docker Compose"
4. Sube el archivo `docker-compose.yml`

### 2. Variables de Entorno
```env
NODE_ENV=production
NGINX_WORKER_PROCESSES=auto
NGINX_WORKER_CONNECTIONS=1024
```

### 3. Labels de Traefik
```yaml
labels:
  - traefik.enable=true
  - traefik.http.routers.imc-website.rule=Host(`192.168.1.12`)
  - traefik.http.routers.imc-website.entrypoints=web
  - traefik.http.services.imc-website.loadbalancer.server.port=8080
```

## 📊 Monitoreo y Salud

### Health Check Endpoint
```bash
curl http://192.168.1.12:8080/health
# Respuesta esperada: "healthy"
```

### Comandos de Monitoreo
```bash
# Ver logs en tiempo real
docker-compose logs -f

# Estadísticas de recursos
docker stats

# Estado de contenedores
docker-compose ps

# Reiniciar servicios
docker-compose restart
```

## 🛡️ Seguridad Implementada

### Configuración de Seguridad
- ✅ Usuario no-root (nginx)
- ✅ Filesystem de solo lectura
- ✅ Sin privilegios adicionales
- ✅ Tmpfs para directorios temporales
- ✅ Headers de seguridad HTTP

### Headers de Seguridad HTTP
```nginx
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000
Content-Security-Policy: default-src 'self'...
```

## 📈 Optimizaciones de Performance

### Nginx Optimizations
- ✅ Compresión Gzip habilitada
- ✅ Cache de archivos estáticos (1 año)
- ✅ Cache de HTML (1 hora)
- ✅ Sendfile y TCP optimizations
- ✅ Worker processes automáticos

### Docker Optimizations
- ✅ Imagen Alpine Linux (mínima)
- ✅ Cache de capas Docker
- ✅ Multi-stage build
- ✅ Límites de recursos configurados

## 🔍 Troubleshooting

### Problemas Comunes

#### 1. Contenedor no inicia
```bash
# Ver logs detallados
docker-compose logs imc-website

# Verificar configuración
docker-compose config
```

#### 2. Health check falla
```bash
# Verificar endpoint manualmente
curl -v http://localhost:8080/health

# Verificar configuración de Nginx
docker exec imc-website nginx -t
```

#### 3. Problemas de permisos
```bash
# Verificar usuario del contenedor
docker exec imc-website whoami

# Verificar permisos de archivos
docker exec imc-website ls -la /usr/share/nginx/html/
```

#### 4. Problemas de red
```bash
# Verificar puertos
netstat -tlnp | grep 8080

# Verificar conectividad
telnet 192.168.1.12 8080
```

## 📁 Estructura de Archivos

```
├── Dockerfile              # Multi-stage build optimizado
├── docker-compose.yml      # Configuración de servicios
├── nginx.conf              # Configuración de Nginx
├── coolify.yaml            # Configuración específica de Coolify
├── deploy.sh               # Script de despliegue (Linux/macOS)
├── deploy.ps1              # Script de despliegue (Windows)
├── DEPLOYMENT.md           # Esta guía
└── src/                    # Código fuente de React
    ├── components/         # Componentes React
    ├── assets/            # Recursos estáticos
    └── ...
```

## 🌐 URLs de Acceso

- **Sitio Web**: `http://192.168.1.12:8080`
- **Health Check**: `http://192.168.1.12:8080/health`
- **Panel Coolify**: `http://192.168.1.12:8000`

## 📞 Soporte

Para problemas técnicos o consultas sobre el despliegue:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica el health check: `curl http://localhost:8080/health`
3. Consulta la documentación de Coolify
4. Contacta al equipo de desarrollo

## 🔄 Actualizaciones

Para actualizar la aplicación:

```bash
# 1. Obtener últimos cambios
git pull origin main

# 2. Reconstruir y redesplegar
./deploy.sh

# O manualmente:
docker-compose down
docker build -t imc-servicios-chile:latest .
docker-compose up -d
```

---

**✨ ¡Despliegue completado exitosamente!**

El sitio web de **IMC Servicios Chile SpA** está ahora disponible en `http://192.168.1.12:8080` con todas las optimizaciones de seguridad, performance y monitoreo implementadas.