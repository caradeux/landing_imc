# Configuración de Correo - IMC Servicios Chile

## Configuración Simplificada

Todos los formularios del sitio web están configurados para enviar correos únicamente a:

**📧 contacto@imcsonline.online**

## Formularios Configurados

1. **Formulario de Contacto Principal** (`/src/components/Contact.jsx`)
   - Envía a: `contacto@imcsonline.online`
   - Endpoint: `/api/send-email`

2. **Modal de Cotización** (`/src/components/QuoteModal.jsx`)
   - Envía a: `contacto@imcsonline.online`
   - Endpoint: `/api/send-quote`

## Configuración del Servidor

- **Servidor SMTP**: `mail.imcsonline.online`
- **Puerto**: `465` (SSL/TLS)
- **Usuario**: `contacto@imcsonline.online`
- **Contraseña**: `Marcelo2025..`

## Archivos de Configuración

- `server.js` - Servidor principal con endpoints de correo
- `.env` - Variables de entorno (copiado desde `env.example`)
- `env.example` - Plantilla de configuración

## Instrucciones de Uso

1. El servidor debe estar ejecutándose en el puerto 3001
2. Todos los correos se envían automáticamente a `contacto@imcsonline.online`
3. No se requieren cambios adicionales en la configuración

## Comandos para Ejecutar

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de correo
npm run server

# Ejecutar aplicación completa (servidor + frontend)
npm run dev:full
```

---

**✅ Configuración completada** - Todos los formularios envían correos a `contacto@imcsonline.online`
