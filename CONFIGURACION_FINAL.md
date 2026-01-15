# 🔄 Migración de Supabase a PostgreSQL - Estado Actual

**Fecha:** 15 de enero de 2026  
**Estado:** ⚠️ En Progreso - Requiere Intervención Manual

---

## 📊 Resumen del Progreso

### ✅ Completado
1. **Base de Datos PostgreSQL Desplegada**
   - UUID: `cs48k4wskco0swgwwsg4s8sk`
   - Estado: 🟢 running:healthy
   - Credenciales configuradas correctamente

2. **Script de Migración Creado**
   - Archivo: `migrate-to-coolify-postgres.sql`
   - Incluye todas las tablas y datos de Supabase
   - 11 tablas con datos completos exportados

3. **API Layer Desarrollada**
   - Archivo: `src/lib/database.js` - Cliente PostgreSQL
   - Archivo: `src/lib/api.js` - API client para reemplazar Supabase
   - Archivo: `server.js` - Endpoints API actualizados

4. **Variables de Entorno Actualizadas**
   - ❌ Eliminadas: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
   - ✅ Agregadas: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `VITE_API_URL`

### ⚠️ Problema Actual
**Error:** `Cannot find module '/app/src/lib/database.js'`

**Causa:** Los archivos nuevos (`database.js`, `api.js`) no están siendo incluidos en el contenedor Docker durante el build, a pesar de estar en el repositorio Git.

---

## 🔧 Solución Requerida

### Opción 1: Verificar Dockerfile (Recomendada)
El `Dockerfile` puede estar excluyendo los archivos `src/lib/`. Necesitamos:

1. **Revisar el Dockerfile actual**
2. **Asegurar que incluya todos los archivos src/**
3. **Verificar que no haya .dockerignore excluyendo archivos**

### Opción 2: Migración Manual Temporal
Mientras se resuelve el problema del Docker build:

1. **Acceder al contenedor via Terminal**
2. **Crear manualmente los archivos faltantes**
3. **Ejecutar la migración desde dentro del contenedor**

---

## 📋 Datos de Migración Listos

### Tablas a Migrar (11 total)
| Tabla | Registros | Estado |
|-------|-----------|--------|
| services | 6 | ✅ Listo |
| projects | 5 | ✅ Listo |
| testimonials | 3 | ✅ Listo |
| clients | 6 | ✅ Listo |
| contact_info | 1 | ✅ Listo |
| site_settings | 1 | ✅ Listo |
| site_stats | 4 | ✅ Listo |
| certifications | 3 | ✅ Listo |
| email_settings | 1 | ✅ Listo |
| site_images | 4 | ✅ Listo |
| color_schemes | 6 | ✅ Listo |

### Endpoint de Migración
```
POST http://192.168.1.89:3002/api/admin/migrate
```

---

## 🎯 Próximos Pasos

### Paso 1: Resolver Problema de Build
```bash
# Verificar Dockerfile
cat Dockerfile

# Verificar .dockerignore
cat .dockerignore

# Forzar rebuild completo
# (Usar botón "Redeploy" en Coolify)
```

### Paso 2: Ejecutar Migración
```bash
# Una vez que el servidor esté funcionando
curl -X POST http://192.168.1.89:3002/api/admin/migrate
```

### Paso 3: Actualizar Componentes React
Reemplazar todas las importaciones de Supabase:
```javascript
// Cambiar esto:
import { supabase } from '../lib/supabase'

// Por esto:
import { api } from '../lib/api'
```

### Paso 4: Verificar Funcionalidad
1. **Frontend:** Verificar que los datos se cargan correctamente
2. **Admin Panel:** Probar funciones CRUD
3. **Formularios:** Verificar envío de emails

---

## 🔗 Enlaces Importantes

- **Aplicación:** http://192.168.1.89:3002
- **Admin Panel:** http://192.168.1.89:3002/admin
- **Coolify Dashboard:** http://192.168.1.89:8000
- **Repositorio:** https://github.com/caradeux/landing_imc.git

---

## 📞 Estado de Servicios

| Servicio | UUID | Estado | Puerto |
|----------|------|--------|--------|
| sitio-imc | a0kos0wc8ws00804cc44gskw | ⚠️ Restarting | 3002:8080 |
| sitio_imc_db | cs48k4wskco0swgwwsg4s8sk | 🟢 Running | 5432 (interno) |
| sitio_imc_cache | kg44so4440s4s8ko40sww480 | 🟢 Running | 6379 (interno) |

---

## 💡 Notas Técnicas

- **Commit Actual:** `dfe5d4e` - "Add PostgreSQL migration and API layer to replace Supabase"
- **Problema:** Docker build no incluye archivos nuevos
- **Solución Temporal:** Acceso manual al contenedor
- **Solución Definitiva:** Corregir Dockerfile/build process

---

**Última Actualización:** 15 de enero de 2026, 18:07 UTC