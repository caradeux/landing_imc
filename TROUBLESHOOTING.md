# 🔧 Troubleshooting Guide - Sitio IMC

## 🚨 Problema Actual: Aplicación no accesible en http://192.168.1.89:3002

### Diagnóstico Realizado

**Problema identificado:** El Dockerfile expone el puerto 8080, pero Coolify necesita mapear correctamente este puerto al puerto externo 3002.

**Configuración actual:**
- Puerto interno del contenedor: 8080 (nginx)
- Puerto externo deseado: 3002
- Mapeo requerido: `3002:8080`

---

## ✅ Solución Recomendada

### Opción 1: Configurar manualmente en Coolify Dashboard

1. Accede al dashboard de Coolify: http://localhost:8000
2. Ve a tu proyecto "My first project"
3. Selecciona la aplicación "sitio-imc"
4. En la sección "Network", configura:
   - **Ports Exposes:** `8080`
   - **Ports Mappings:** `3002:8080`
5. Guarda los cambios
6. Reinicia la aplicación

### Opción 2: Verificar el contenedor directamente

Si tienes acceso SSH al servidor (192.168.1.89), ejecuta:

```bash
# Ver contenedores en ejecución
docker ps -a | grep sitio-imc

# Ver los puertos mapeados
docker port [CONTAINER_ID]

# Ver logs del contenedor
docker logs [CONTAINER_ID]

# Inspeccionar el contenedor
docker inspect [CONTAINER_ID] | grep -A 10 "Ports"
```

### Opción 3: Probar acceso interno primero

Desde el servidor (192.168.1.89):

```bash
# Probar si nginx responde en el puerto 8080 dentro del contenedor
docker exec [CONTAINER_ID] curl -I http://localhost:8080

# Probar si el puerto está mapeado correctamente
curl -I http://localhost:3002

# Verificar que el puerto 3002 está escuchando
netstat -tuln | grep 3002
```

---

## 🔍 Verificaciones Adicionales

### 1. Estado de los Servicios

```bash
# PostgreSQL
docker ps | grep sitio_imc_db
# Debería mostrar: running:healthy

# Redis
docker ps | grep sitio_imc_cache
# Debería mostrar: running:healthy

# Aplicación
docker ps | grep sitio-imc
# Debería mostrar: running:healthy
```

### 2. Logs de la Aplicación

En Coolify Dashboard:
1. Ve a la aplicación "sitio-imc"
2. Click en "Logs"
3. Busca errores relacionados con:
   - Nginx no iniciando
   - Puertos en uso
   - Permisos

### 3. Variables de Entorno

Verifica que estas variables estén configuradas:

```
NODE_ENV=production
PORT=3000
DATABASE_URL=postgres://sitio_imc_user:***@cs48k4wskco0swgwwsg4s8sk:5432/sitio_imc_production
REDIS_URL=redis://default:***@kg44so4440s4s8ko40sww480:6379/0
VITE_SUPABASE_URL=https://dnvvyegqunbpilccrnto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SMTP_HOST=mail.imcsonline.online
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contacto@imcsonline.online
DOMAIN=192.168.1.89
```

---

## 🐛 Errores Comunes

### Error: "Connection Refused"

**Causa:** El puerto no está mapeado correctamente o el contenedor no está corriendo.

**Solución:**
1. Verifica que el contenedor esté corriendo: `docker ps`
2. Verifica el mapeo de puertos en Coolify
3. Reinicia la aplicación

### Error: "502 Bad Gateway"

**Causa:** Nginx no puede conectarse al backend de Node.js.

**Solución:**
1. Verifica que Node.js esté corriendo en el puerto 3001 (interno)
2. Revisa los logs de nginx
3. Verifica la configuración de nginx.conf

### Error: "Port Already in Use"

**Causa:** El puerto 3002 ya está siendo usado por otra aplicación.

**Solución:**
1. Identifica qué está usando el puerto: `netstat -tuln | grep 3002`
2. Usa otro puerto (ej: 3003, 3004)
3. Actualiza la configuración en Coolify

---

## 📊 Tabla de Puertos

| Servicio | Puerto Interno | Puerto Externo | Estado Esperado |
|----------|----------------|----------------|-----------------|
| Nginx | 8080 | 3002 | Listening |
| Node.js API | 3001 | N/A (interno) | Running |
| PostgreSQL | 5432 | N/A (interno) | Running |
| Redis | 6379 | N/A (interno) | Running |

---

## 🔄 Pasos de Recuperación

Si la aplicación no funciona después de seguir los pasos anteriores:

### 1. Reinicio Completo

```bash
# Desde Coolify Dashboard o API
# 1. Detener la aplicación
# 2. Esperar 10 segundos
# 3. Iniciar la aplicación
```

### 2. Rebuild desde Cero

```bash
# En Coolify Dashboard:
# 1. Ve a la aplicación
# 2. Click en "Deploy"
# 3. Marca "Force Rebuild"
# 4. Click en "Deploy"
```

### 3. Verificar Dockerfile

El Dockerfile debe tener:
```dockerfile
EXPOSE 8080
```

Y el start.sh debe iniciar nginx en el puerto 8080.

---

## 📞 Información de Soporte

**UUIDs Importantes:**
- Aplicación: a0kos0wc8ws00804cc44gskw
- PostgreSQL: cs48k4wskco0swgwwsg4s8sk
- Redis: kg44so4440s4s8ko40sww480
- Servidor: uw8w4s8sww88ss40ssc0gso4
- Proyecto: tc0gcwgk8s4wk4cos08ow0kg

**Accesos:**
- Coolify Dashboard: http://localhost:8000
- Servidor: 192.168.1.89
- Puerto Aplicación: 3002

---

## 🎯 Checklist de Verificación

- [ ] Contenedor está corriendo (`docker ps`)
- [ ] Puerto 8080 expuesto en el contenedor
- [ ] Puerto 3002 mapeado a 8080
- [ ] Nginx iniciado correctamente
- [ ] Node.js corriendo en puerto 3001
- [ ] PostgreSQL accesible
- [ ] Redis accesible
- [ ] Variables de entorno configuradas
- [ ] Logs sin errores críticos
- [ ] Puerto 3002 accesible desde la red local

---

**Última actualización:** 15 de enero de 2026
