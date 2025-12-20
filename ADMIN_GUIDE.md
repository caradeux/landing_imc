# Guía del Panel de Administración

## Descripción

Tu sitio web ahora cuenta con un sistema completo de administración de contenido (CMS) que te permite gestionar servicios, proyectos y testimonios sin necesidad de editar código.

## Acceso al Panel de Administración

Para acceder al panel de administración, visita:
```
https://tu-sitio.com/admin
```

## Crear un Usuario Administrador

Antes de poder usar el panel, necesitas crear un usuario administrador en Supabase:

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard
2. Ve a la sección "Authentication" en el menú lateral
3. Haz clic en "Add user" > "Create new user"
4. Ingresa un correo electrónico y contraseña
5. Haz clic en "Create user"

Ahora podrás usar estas credenciales para iniciar sesión en `/admin`

## Funcionalidades del Panel

### 1. Gestión de Servicios

En esta sección puedes:
- Crear nuevos servicios que ofrece tu empresa
- Editar servicios existentes
- Eliminar servicios
- Activar/desactivar servicios (sin eliminarlos)
- Ordenar cómo aparecen en el sitio

**Campos disponibles:**
- Título del servicio
- Descripción breve
- Ícono (elige entre: Zap, Hammer, Wrench, Home, Palette, Shield)
- URL de imagen
- Color del servicio (en hexadecimal)
- Lista de características
- Orden de visualización
- Estado (activo/inactivo)

### 2. Gestión de Proyectos

En esta sección puedes:
- Agregar proyectos realizados con fotos
- Editar información de proyectos
- Eliminar proyectos
- Categorizar proyectos (Retail, Industrial, Logística, Corporativo)
- Activar/desactivar proyectos

**Campos disponibles:**
- Título del proyecto
- Descripción
- Categoría
- Año de realización
- Área del proyecto (ej: "2,500 m²")
- Duración (ej: "3 meses")
- Ubicación
- URL de imagen principal
- Lista de servicios realizados
- Aspectos destacados
- Orden de visualización
- Estado (activo/inactivo)

### 3. Gestión de Testimonios

En esta sección puedes:
- Agregar testimonios de clientes satisfechos
- Editar testimonios existentes
- Eliminar testimonios
- Calificar con estrellas (1-5)
- Activar/desactivar testimonios

**Campos disponibles:**
- Nombre del cliente
- Empresa
- Cargo
- URL de foto del cliente
- Contenido del testimonio
- Calificación (1-5 estrellas)
- Proyecto relacionado (opcional)
- Orden de visualización
- Estado (activo/inactivo)

## Consejos de Uso

### Imágenes
- Usa URLs de imágenes de buena calidad
- Recomendación: 1000px de ancho mínimo
- Puedes usar servicios como Unsplash, Pexels o subir tus propias imágenes

### Orden de Visualización
- Los números más bajos aparecen primero
- Puedes usar: 0, 1, 2, 3, etc.
- Si quieres reorganizar, simplemente cambia los números

### Estado Activo/Inactivo
- "Activo": El contenido se muestra en el sitio público
- "Inactivo": El contenido está oculto pero no eliminado
- Útil para contenido temporal o estacional

## Seguridad

- Solo usuarios autenticados pueden acceder al panel
- Los visitantes del sitio solo ven contenido marcado como "activo"
- Todas las operaciones están protegidas por Row Level Security (RLS)
- NUNCA compartas tus credenciales de administrador

## Soporte Técnico

Si necesitas agregar más usuarios administradores o tienes problemas técnicos, contacta al desarrollador del sitio.

## Base de Datos

Toda la información se almacena en Supabase, un servicio de base de datos en la nube que es:
- Seguro y confiable
- Escalable
- Con copias de seguridad automáticas
- Accesible desde cualquier lugar

---

¡Felicidades! Ahora tienes control total sobre el contenido de tu sitio web.
