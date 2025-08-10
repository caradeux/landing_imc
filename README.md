# IMC Servicios Chile SpA - Sitio Web Corporativo

Sitio web moderno y profesional para IMC Servicios Chile SpA, empresa líder en construcción y servicios especializados con más de 15 años de experiencia.

## 🚀 Características

- **Diseño Moderno**: Interfaz profesional con gradientes y efectos premium
- **Responsive**: Optimizado para todos los dispositivos
- **Modal de Cotización**: Sistema de cotización en 3 pasos
- **Galería de Proyectos**: Showcase de proyectos destacados
- **Testimonios**: Carrusel automático de testimonios de clientes
- **Animaciones**: Efectos visuales y transiciones suaves
- **SEO Avanzado**: Optimización completa para Google con Schema.org, sitemap, robots.txt

## 🔍 Optimización SEO

### **Palabras Clave Principales:**
- Construcción industrial Santiago
- Servicios eléctricos certificados SEC
- Obras civiles Chile
- Carpintería especializada
- Techumbres industriales
- Soldadura certificada AWS
- Construcción retail Chile
- Instalaciones eléctricas industriales

### **Elementos SEO Implementados:**
- ✅ **Meta tags optimizados** con keywords específicas
- ✅ **Schema.org markup** (Organization, LocalBusiness, Service)
- ✅ **Open Graph** y Twitter Cards
- ✅ **Sitemap.xml** estructurado
- ✅ **Robots.txt** optimizado
- ✅ **Canonical URLs** para evitar contenido duplicado
- ✅ **Structured Data** para rich snippets
- ✅ **Semantic HTML5** con microdata
- ✅ **Performance optimization** para Core Web Vitals
- ✅ **Local SEO** con coordenadas geográficas

## 🛠️ Tecnologías

- **React 18** - Framework de JavaScript
- **Vite** - Build tool y dev server
- **Lucide React** - Iconos modernos
- **Framer Motion** - Animaciones (opcional)
- **CSS3** - Estilos con gradientes y efectos

## 📦 Instalación y Desarrollo

### Prerrequisitos
- Node.js 18 o superior
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd imc-servicios-chile

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linter
```

## 🐳 Despliegue con Docker

### Build y ejecución local
```bash
# Build de la imagen
docker build -t imc-website .

# Ejecutar contenedor
docker run -p 3000:80 imc-website
```

### Docker Compose
```bash
# Ejecutar con docker-compose
docker-compose up -d
```

### Despliegue en Coolify
1. Conectar repositorio a Coolify
2. Configurar como aplicación Docker
3. El archivo `docker-compose.yml` incluye las etiquetas necesarias
4. Coolify detectará automáticamente la configuración

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── TopBar.jsx          # Barra superior con contacto
│   ├── Header.jsx          # Navegación principal
│   ├── Hero.jsx            # Sección hero con slider
│   ├── Services.jsx        # Servicios especializados
│   ├── About.jsx           # Información de la empresa
│   ├── Projects.jsx        # Galería de proyectos
│   ├── Testimonials.jsx    # Testimonios de clientes
│   ├── Contact.jsx         # Formulario de contacto
│   ├── Footer.jsx          # Footer completo
│   └── QuoteModal.jsx      # Modal de cotización
├── App.jsx                 # Componente principal
├── main.jsx               # Punto de entrada
└── index.css              # Estilos globales
```

## 🎨 Personalización

### Colores
Los colores principales se pueden modificar en `src/index.css`:
- Primario: `#667eea`
- Secundario: `#764ba2`
- Gradientes personalizados en cada sección

### Contenido
- Información de la empresa en cada componente
- Proyectos en `Projects.jsx`
- Testimonios en `Testimonials.jsx`
- Servicios en `Services.jsx`

## 📱 Funcionalidades

### Modal de Cotización
- **Paso 1**: Selección de tipo de proyecto
- **Paso 2**: Servicios y detalles del proyecto
- **Paso 3**: Información de contacto
- Validación de formularios
- Estados de carga y éxito

### Navegación
- Navegación suave entre secciones
- Header fijo con efecto de scroll
- Menú móvil responsive

### Animaciones
- Contadores animados al hacer scroll
- Carrusel automático de testimonios
- Efectos hover en cards y botones
- Transiciones suaves

## 🔧 Configuración de Producción

### Variables de Entorno
No se requieren variables de entorno específicas para el funcionamiento básico.

### Optimizaciones
- Compresión Gzip habilitada
- Cache de assets estáticos
- Minificación automática con Vite
- Lazy loading de imágenes

## 📞 Información de Contacto

- **Teléfono**: +56 9 8854 2926
- **Email**: contacto@imcs.cl
- **Ubicación**: Región Metropolitana, Santiago, Chile

## 📄 Licencia

© 2024 IMC Servicios Chile SpA. Todos los derechos reservados.

---

Desarrollado con ❤️ para IMC Servicios Chile SpA