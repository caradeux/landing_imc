# 🚀 Sitio IMC - Deployment Summary

**Deployment Date:** January 15, 2026  
**Status:** ✅ Successfully Deployed  
**Server:** localhost (192.168.1.89)

---

## 📦 Application Details

### Main Application: sitio-imc
- **UUID:** a0kos0wc8ws00804cc44gskw
- **Status:** 🟢 running:healthy
- **Repository:** https://github.com/caradeux/landing_imc.git
- **Branch:** main
- **Build Pack:** Dockerfile
- **Internal Port:** 8080 (nginx) + 3001 (Node.js)
- **External Port:** 🎯 **PORT 3002** (Needs manual configuration in Coolify)
- **Container Network:** coolify
- **Last Deployment:** 2026-01-15 17:36:02 UTC
- **Commit:** 020716e47748bc4a525fc23592170a3ff06758f1

### Local Network Access
```
http://192.168.1.89:3002
```

---

## 🗄️ Database Services

### PostgreSQL Database
- **Name:** sitio_imc_db
- **UUID:** cs48k4wskco0swgwwsg4s8sk
- **Status:** 🟢 running:healthy
- **Image:** postgres:16-alpine
- **Database Name:** sitio_imc_production
- **Username:** sitio_imc_user
- **Password:** SitioIMC_DB_P@ssw0rd_2026_Secure!
- **Internal Connection URL:**
  ```
  postgres://sitio_imc_user:SitioIMC_DB_P@ssw0rd_2026_Secure!@cs48k4wskco0swgwwsg4s8sk:5432/sitio_imc_production
  ```

### Redis Cache
- **Name:** sitio_imc_cache
- **UUID:** kg44so4440s4s8ko40sww480
- **Status:** 🟢 running:healthy
- **Image:** redis:7.2
- **Password:** SitioIMC_Redis_P@ssw0rd_2026_Secure!
- **Internal Connection URL:**
  ```
  redis://default:SitioIMC_Redis_P@ssw0rd_2026_Secure!@kg44so4440s4s8ko40sww480:6379/0
  ```

---

## 🔐 Environment Variables

The following environment variables have been configured:

| Variable | Value | Purpose |
|----------|-------|---------|
| NODE_ENV | production | Application environment |
| PORT | 3000 | Internal application port |
| NEXT_TELEMETRY_DISABLED | 1 | Disable Next.js telemetry |
| DATABASE_URL | postgres://sitio_imc_user:***@cs48k4wskco0swgwwsg4s8sk:5432/sitio_imc_production | PostgreSQL connection |
| REDIS_URL | redis://default:***@kg44so4440s4s8ko40sww480:6379/0 | Redis connection |
| VITE_SUPABASE_URL | https://dnvvyegqunbpilccrnto.supabase.co | Supabase project URL |
| VITE_SUPABASE_ANON_KEY | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... | Supabase anonymous key |
| SMTP_HOST | mail.imcsonline.online | Email server host |
| SMTP_PORT | 465 | Email server port |
| SMTP_SECURE | true | Use SSL/TLS |
| SMTP_USER | contacto@imcsonline.online | Email username |
| SMTP_PASS | *** | Email password |
| DOMAIN | 192.168.1.89 | Server IP address |

---

## 🌐 Port Mappings Table

| Application | Container ID | Internal Port | External Port | Status |
|-------------|--------------|---------------|---------------|--------|
| **sitio-imc** | a0kos0wc8ws00804cc44gskw | 8080 | **NEEDS CONFIG** | 🟢 Running |
| v0-asolux-website | y8cwc84owwok84w0g004w0wc | 3000 | 3001 | 🟢 Running |
| sitio_imc_db | cs48k4wskco0swgwwsg4s8sk | 5432 | Internal Only | 🟢 Running |
| sitio_imc_cache | kg44so4440s4s8ko40sww480 | 6379 | Internal Only | 🟢 Running |

### Available Ports for Future Deployments
- 3003, 3004, 3005... (3001-3099 range)

---

## ✅ Deployment Verification

### Application Logs
```
🚀 Iniciando IMC Servicios Chile SpA - Full Stack...
📋 Configuración:
   - NODE_ENV: production
   - PORT (Node.js): 3001
   - NGINX_PORT: 8080
🔍 Verificando configuración de nginx...
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
🌐 Iniciando nginx...
✅ Nginx iniciado correctamente
🟢 Iniciando servidor Node.js en puerto 3001...
Servidor API ejecutándose en http://localhost:3001
```

### Health Check Commands
```bash
# Check if application is running
curl http://192.168.1.89:3002

# Check application logs
docker logs h4k8g08gsc8w44cwc040og00

# Check all running containers
docker ps | grep sitio

# Verify port is listening
netstat -an | findstr :3002
```

---

## 🔄 Next Steps

1. ✅ Application deployed and running
2. ✅ Database and cache services operational
3. ✅ Environment variables configured
4. ⏳ **Configure Cloudflare Tunnel** (see CLOUDFLARE_TUNNEL_CONFIG.md)
5. ⏳ Test application functionality
6. ⏳ Monitor application logs

---

## 📞 Support Information

- **Coolify Dashboard:** http://localhost:8000
- **Application UUID:** h4k8g08gsc8w44cwc040og00
- **Project:** My first project (tc0gcwgk8s4wk4cos08ow0kg)
- **Environment:** production (swsso0kw8sgs4kc8okckcwkg)

---

## 🔗 Quick Links

- [Cloudflare Tunnel Configuration](./CLOUDFLARE_TUNNEL_CONFIG.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [Port Allocation Report](./PORT_ALLOCATION.md)
- [Verification Script](./verificar_deployment.sh)
