# Configuración de Resend para Formulario de Contacto

## Pasos para configurar el envío de correos

### 1. Crear cuenta en Resend
1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita
3. Verifica tu email

### 2. Obtener API Key
1. En el dashboard de Resend, ve a "API Keys"
2. Crea una nueva API key
3. Copia la key (comienza con `re_`)

### 3. Configurar variables de entorno
1. Copia el archivo `env.example` como `.env`:
   ```bash
   cp env.example .env
   ```

2. Edita el archivo `.env` y reemplaza `re_your_api_key_here` con tu API key real:
   ```
   RESEND_API_KEY=re_1234567890abcdef...
   ```

### 4. Configurar dominio (Opcional)
**Para pruebas (recomendado):**
- Usa `onboarding@resend.dev` (ya configurado)
- Funciona inmediatamente sin configuración adicional

**Para producción:**
Si quieres usar `noreply@imcs.cl` como email de envío:
1. En Resend, ve a "Domains"
2. Agrega el dominio `imcs.cl`
3. Configura los registros DNS según las instrucciones
4. Cambia `FROM_EMAIL` en el archivo `.env`

**Nota**: El dominio `onboarding@resend.dev` es el estándar de Resend para pruebas y funciona inmediatamente.

### 5. Ejecutar el proyecto
```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo completo (frontend + API)
npm run dev:full

# O ejecutar por separado:
# Terminal 1: Frontend
npm run dev

# Terminal 2: API Server
npm run server
```

### 6. Probar el formulario
1. Ve a `http://localhost:3000`
2. Llena el formulario de contacto
3. Los correos se enviarán a `vtc.chile@gmail.com`

## Estructura del Email

El email incluye:
- Información del cliente (nombre, email, teléfono, empresa)
- Servicio de interés
- Mensaje completo
- Fecha y hora (zona horaria de Chile)
- Formato HTML profesional

## Troubleshooting

### Error: "Invalid API key"
- Verifica que la API key esté correcta en el archivo `.env`
- Asegúrate de que la API key no tenga espacios extra

### Error: "Domain not verified"
- El sistema ya está configurado con `onboarding@resend.dev` (dominio verificado por Resend)
- Si quieres usar tu propio dominio, configúralo en Resend primero

### Error: "Rate limit exceeded"
- Resend tiene límites en el plan gratuito
- Considera actualizar a un plan pagado si necesitas más envíos
