# 🚀 GUÍA DE DESPLIEGUE EN COOLIFY - IMC Servicios Chile SpA

## 📋 Resumen de la Configuración

Tu proyecto está **completamente configurado** para desplegarse en Coolify con las siguientes características:

### ✅ Archivos Listos para Producción
- **`Dockerfile`** - Multi-stage build optimizado (Node.js + Nginx)
- **`docker-compose.yml`** - Configuración básica para Coolify
- **`docker-compose.prod.yml`** - Configuración avanzada de producción
- **`nginx.conf`** - Servidor web optimizado con seguridad
- **`coolify.yaml`** - Configuración específica de Coolify
- **`env.production.example`** - Variables de entorno de ejemplo

### 🔧 Configuración Actual
- **Puerto**: 8080 (configurado para Coolify)
- **Health Check**: `/health` endpoint
- **Imagen Base**: nginx:alpine (segura y mínima)
- **Usuario**: nginx (no-root para seguridad)
- **Recursos**: 256MB RAM, 0.5 CPU cores

## 🚀 Opciones de Despliegue

### Opción 1: Interfaz Web de Coolify (Recomendado)

1. **Acceder a Coolify**
   ```
   http://192.168.1.12:8000
   ```

2. **Crear Nueva Aplicación**
   - Hacer clic en "New Application"
   - Seleccionar "Docker Compose"
   - Subir el archivo `docker-compose.yml`

3. **Configurar Variables de Entorno**
   - Copiar variables desde `env.production.example`
   - Configurar según tu entorno

4. **Desplegar**
   - Hacer clic en "Deploy"
   - Esperar a que termine el build

### Opción 2: Script Automático

```bash
# Hacer ejecutable el script
chmod +x deploy-coolify.sh

# Ejecutar despliegue
./deploy-coolify.sh
```

### Opción 3: Comandos Manuales

```bash
# 1. Construir imagen
docker build -t imc-servicios-chile:latest .

# 2. Desplegar
docker-compose up -d

# 3. Verificar
curl http://localhost:8080/health
```

## 🔍 Verificación Post-Despliegue

### URLs de Verificación
- **Sitio Web**: `http://192.168.1.12:8080`
- **Health Check**: `http://192.168.1.12:8080/health`
- **Sitemap**: `http://192.168.1.12:8080/sitemap.xml`
- **Robots**: `http://192.168.1.12:8080/robots.txt`

### Comandos de Verificación
```bash
# Estado de contenedores
docker-compose ps

# Logs en tiempo real
docker-compose logs -f

# Estadísticas de recursos
docker stats

# Health check manual
curl -f http://localhost:8080/health
```

## ⚙️ Configuración de Coolify

### Labels de Traefik Configurados
```yaml
labels:
  - traefik.enable=true
  - traefik.http.routers.imc-landing.rule=Host(`tu-dominio.com`)
  - traefik.http.routers.imc-landing.entrypoints=http
  - traefik.http.services.imc-landing.loadbalancer.server.port=8080
  - coolify.managed=true
```

### Variables de Entorno Recomendadas
```bash
NODE_ENV=production
NGINX_WORKER_PROCESSES=auto
NGINX_WORKER_CONNECTIONS=1024
```

## 🛠️ Troubleshooting

### Problema: Contenedor no inicia
```bash
# Ver logs detallados
docker-compose logs imc-website

# Verificar configuración
docker-compose config
```

### Problema: Health check falla
```bash
# Verificar endpoint manualmente
curl -v http://localhost:8080/health

# Verificar configuración de nginx
docker exec imc-website nginx -t
```

### Problema: Puerto ocupado
```bash
# Verificar puertos en uso
netstat -tlnp | grep 8080

# Detener contenedores
docker-compose down
```

## 📊 Monitoreo y Mantenimiento

### Logs
```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio específico
docker-compose logs -f imc-website
```

### Recursos
```bash
# Ver uso de recursos
docker stats

# Ver información del contenedor
docker inspect imc-website
```

### Actualizaciones
```bash
# Reconstruir y redesplegar
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🔒 Seguridad Implementada

- ✅ **Usuario no-root**: nginx (UID 101)
- ✅ **Filesystem read-only**: Habilitado
- ✅ **Headers de seguridad**: Implementados
- ✅ **Capabilities mínimas**: Configuradas
- ✅ **No privilegios adicionales**: Configurado

## ⚡ Optimizaciones de Performance

- ✅ **Compresión Gzip**: Habilitada
- ✅ **Cache estático**: 1 año
- ✅ **Cache HTML**: 1 hora
- ✅ **Sendfile**: Optimizado
- ✅ **Worker processes**: Auto-detectados

## 📈 Próximos Pasos

1. **Configurar SSL/TLS** en Coolify
2. **Configurar dominio personalizado**
3. **Implementar CI/CD** con Git hooks
4. **Configurar backups** automáticos
5. **Implementar monitoreo** avanzado

## 🎉 Estado Final

✅ **Dockerfile optimizado** - Multi-stage, seguro, mínimo  
✅ **Docker Compose configurado** - Desarrollo y producción  
✅ **Nginx optimizado** - Performance y seguridad  
✅ **Scripts de despliegue** - Linux, macOS y Windows  
✅ **Configuración Coolify** - Labels y networking  
✅ **Documentación completa** - Guías y troubleshooting  
✅ **Variables de entorno** - Producción configurada  
✅ **Health checks** - Monitoreo automático  
✅ **Límites de recursos** - Configurados apropiadamente  
✅ **Seguridad hardening** - Implementado completamente  

---

**🚀 ¡Tu sitio web de IMC Servicios Chile SpA está listo para desplegar en Coolify!**

Todos los archivos están optimizados para máximo rendimiento, seguridad y facilidad de mantenimiento en el entorno de producción.
