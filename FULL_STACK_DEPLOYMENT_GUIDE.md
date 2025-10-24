# 🚀 GUÍA DE DESPLIEGUE FULL STACK EN COOLIFY - IMC Servicios Chile SpA

## 📋 Resumen de la Configuración Full Stack

Tu proyecto ahora está configurado como **Full Stack** con las siguientes características:

### ✅ Arquitectura Completa
- **Frontend**: React 18 + Vite (archivos estáticos)
- **Backend**: Node.js + Express (API para emails)
- **Servidor Web**: Nginx (proxy reverso + archivos estáticos)
- **Base de Datos**: No requerida (solo emails)

### 🔧 Configuración Actualizada

#### **Archivos Principales:**
1. **`Dockerfile`** - Multi-stage build con Full Stack
   - Stage 1: Build React (Node.js)
   - Stage 2: Production (Node.js + Nginx)
   - Puerto: **8080** (Nginx) + **3001** (Node.js interno)

2. **`nginx.conf`** - Proxy reverso configurado
   - Sirve archivos estáticos de React
   - Proxy `/api/*` → Node.js backend
   - Optimizaciones de performance y seguridad

3. **`start.sh`** - Script de inicio robusto
   - Inicia Nginx en background
   - Inicia Node.js como proceso principal
   - Logging detallado y verificaciones

4. **`server.js`** - Backend Express
   - `/api/send-email` - Formulario de contacto
   - `/api/send-quote` - Modal de cotización
   - `/api/health` - Health check del backend

### 🌐 Flujo de Datos

```
Cliente → Nginx (8080) → {
  /api/* → Node.js (3001) → Email
  /* → Archivos estáticos React
}
```

### 📊 Endpoints Disponibles

#### **Frontend (Nginx)**
- `GET /` - Página principal React
- `GET /health` - Health check
- `GET /sitemap.xml` - Sitemap
- `GET /robots.txt` - Robots.txt

#### **Backend (Node.js)**
- `POST /api/send-email` - Enviar formulario de contacto
- `POST /api/send-quote` - Enviar solicitud de cotización
- `GET /api/health` - Health check del backend

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
   ```bash
   NODE_ENV=production
   PORT=3001
   NGINX_PORT=8080
   
   # Configuración de email
   SMTP_HOST=mail.imcsonline.online
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=contacto@imcsonline.online
   SMTP_PASS=Marcelo2025..
   ```

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
curl http://localhost:8080/api/health
```

## 🔍 Verificación Post-Despliegue

### URLs de Verificación
- **Sitio Web**: `http://192.168.1.12:8080`
- **Health Check Frontend**: `http://192.168.1.12:8080/health`
- **Health Check Backend**: `http://192.168.1.12:8080/api/health`
- **Sitemap**: `http://192.168.1.12:8080/sitemap.xml`
- **Robots**: `http://192.168.1.12:8080/robots.txt`

### Comandos de Verificación
```bash
# Estado de contenedores
docker-compose ps

# Logs en tiempo real
docker-compose logs -f

# Logs específicos del backend
docker-compose logs -f | grep "Node.js"

# Logs específicos de nginx
docker-compose logs -f | grep "nginx"

# Estadísticas de recursos
docker stats

# Health check manual
curl -f http://localhost:8080/health
curl -f http://localhost:8080/api/health
```

## 🧪 Pruebas de Funcionalidad

### Probar Formulario de Contacto
```bash
curl -X POST http://localhost:8080/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+56912345678",
    "service": "Construcción Industrial",
    "message": "Mensaje de prueba"
  }'
```

### Probar Modal de Cotización
```bash
curl -X POST http://localhost:8080/api/send-quote \
  -H "Content-Type: application/json" \
  -d '{
    "projectType": "Industrial",
    "services": ["Construcción", "Eléctrico"],
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+56912345678",
    "location": "Santiago",
    "description": "Proyecto de prueba"
  }'
```

## 🛠️ Troubleshooting

### Problema: Contenedor no inicia
```bash
# Ver logs detallados
docker-compose logs imc-website

# Verificar configuración
docker-compose config

# Verificar que ambos servicios estén corriendo
docker exec imc-website ps aux
```

### Problema: API no responde
```bash
# Verificar que Node.js esté corriendo
docker exec imc-website netstat -tlnp | grep 3001

# Verificar logs de Node.js
docker-compose logs | grep "Node.js"

# Probar conexión interna
docker exec imc-website curl http://localhost:3001/api/health
```

### Problema: Nginx no sirve archivos
```bash
# Verificar configuración de nginx
docker exec imc-website nginx -t

# Verificar que archivos estén en /app/public
docker exec imc-website ls -la /app/public

# Verificar logs de nginx
docker-compose logs | grep "nginx"
```

### Problema: Emails no se envían
```bash
# Verificar configuración SMTP
docker exec imc-website env | grep SMTP

# Verificar logs de email
docker-compose logs | grep "Email"

# Probar conectividad SMTP
docker exec imc-website nc -zv mail.imcsonline.online 465
```

## 📊 Monitoreo y Mantenimiento

### Logs
```bash
# Ver todos los logs
docker-compose logs -f

# Logs del frontend (nginx)
docker-compose logs -f | grep "nginx"

# Logs del backend (node.js)
docker-compose logs -f | grep "Node.js"

# Logs de emails
docker-compose logs -f | grep "Email"
```

### Recursos
```bash
# Ver uso de recursos
docker stats

# Ver información del contenedor
docker inspect imc-website

# Ver procesos dentro del contenedor
docker exec imc-website ps aux
```

### Actualizaciones
```bash
# Reconstruir y redesplegar
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Solo reiniciar servicios
docker-compose restart
```

## 🔒 Seguridad Implementada

- ✅ **Usuario no-root**: nginx (UID 101)
- ✅ **Filesystem read-only**: Habilitado
- ✅ **Headers de seguridad**: Implementados
- ✅ **Proxy reverso**: Configurado correctamente
- ✅ **Capabilities mínimas**: Configuradas
- ✅ **No privilegios adicionales**: Configurado

## ⚡ Optimizaciones de Performance

- ✅ **Compresión Gzip**: Habilitada
- ✅ **Cache estático**: 1 año
- ✅ **Cache HTML**: 1 hora
- ✅ **Proxy keepalive**: Configurado
- ✅ **Worker processes**: Auto-detectados
- ✅ **Upstream connection pooling**: Habilitado

## 📈 Próximos Pasos

1. **Configurar SSL/TLS** en Coolify
2. **Configurar dominio personalizado**
3. **Implementar CI/CD** con Git hooks
4. **Configurar backups** automáticos
5. **Implementar monitoreo** avanzado
6. **Configurar alertas** de salud
7. **Optimizar configuración SMTP**

## 🎉 Estado Final

✅ **Dockerfile Full Stack** - React + Node.js + Nginx  
✅ **Proxy reverso configurado** - Nginx → Node.js  
✅ **API de emails funcional** - Contacto + Cotizaciones  
✅ **Script de inicio robusto** - Logging y verificaciones  
✅ **Health checks** - Frontend y Backend  
✅ **Variables de entorno** - Configuración completa  
✅ **Documentación actualizada** - Guías y troubleshooting  
✅ **Seguridad hardening** - Implementado completamente  
✅ **Performance optimizado** - Cache y compresión  

---

**🚀 ¡Tu sitio web Full Stack de IMC Servicios Chile SpA está listo para desplegar en Coolify con funcionalidad completa de emails!**

Ahora los usuarios podrán:
- ✅ Navegar por el sitio web React
- ✅ Enviar formularios de contacto
- ✅ Solicitar cotizaciones
- ✅ Recibir confirmaciones por email
