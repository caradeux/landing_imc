# Organización de Imágenes - IMC Servicios Chile

## 📁 Estructura de Carpetas

```
landing_imc/
├── public/
│   ├── images/
│   │   ├── logos/           ← Logos de empresas clientes
│   │   │   ├── jumbo.png    ← Logo de Jumbo (ya agregado)
│   │   │   ├── construmart.png
│   │   │   ├── santa-isabel.png
│   │   │   ├── easy.png
│   │   │   ├── walmart.png
│   │   │   └── sodimac.png
│   │   ├── projects/        ← Imágenes de proyectos
│   │   │   ├── proyecto-1.jpg
│   │   │   ├── proyecto-2.jpg
│   │   │   └── ...
│   │   ├── team/            ← Fotos del equipo
│   │   │   ├── director.jpg
│   │   │   ├── ingeniero-1.jpg
│   │   │   └── ...
│   │   ├── services/        ← Imágenes de servicios
│   │   │   ├── electrico.jpg
│   │   │   ├── carpinteria.jpg
│   │   │   └── ...
│   │   └── icons/           ← Iconos adicionales
│   │       ├── certificacion.png
│   │       └── ...
│   ├── favicon.ico
│   └── ...
```

## 🖼️ Cómo usar las imágenes en el código

### ✅ **Correcto - Desde public/**
```jsx
// Logo de empresa cliente
<img src="/images/logos/jumbo.png" alt="Jumbo" />

// Imagen de proyecto
<img src="/images/projects/proyecto-1.jpg" alt="Proyecto eléctrico" />

// Foto del equipo
<img src="/images/team/director.jpg" alt="Director IMC" />
```

### ❌ **Incorrecto - Desde src/**
```jsx
// NO hagas esto
import logo from '../images/jumbo.png'  // ❌
```

## 📋 **Logos de Clientes Actuales**

| Empresa | Archivo | Estado |
|---------|---------|--------|
| Jumbo | `jumbo.png` | ✅ Agregado |
| Construmart | `construmart.png` | ⏳ Pendiente |
| Santa Isabel | `santa-isabel.png` | ⏳ Pendiente |
| Easy | `easy.png` | ⏳ Pendiente |
| Walmart Chile | `walmart.png` | ⏳ Pendiente |
| Sodimac | `sodimac.png` | ⏳ Pendiente |

## 🎨 **Especificaciones de Imágenes**

### **Logos de Clientes:**
- **Formato:** PNG (con transparencia) o JPG
- **Tamaño:** Mínimo 200x100px, máximo 400x200px
- **Fondo:** Transparente o blanco
- **Calidad:** Alta resolución para pantallas retina

### **Imágenes de Proyectos:**
- **Formato:** JPG o WebP
- **Tamaño:** Mínimo 800x600px
- **Relación:** 4:3 o 16:9
- **Calidad:** Optimizada para web

### **Fotos del Equipo:**
- **Formato:** JPG
- **Tamaño:** 400x400px (cuadradas)
- **Estilo:** Profesional, fondo neutro

## 🔧 **Optimización de Imágenes**

### **Antes de subir:**
1. **Comprimir** con herramientas como TinyPNG
2. **Redimensionar** al tamaño necesario
3. **Convertir** a WebP si es posible
4. **Nombrar** archivos descriptivamente

### **Herramientas recomendadas:**
- [TinyPNG](https://tinypng.com/) - Compresión
- [Squoosh](https://squoosh.app/) - Optimización
- [Canva](https://canva.com/) - Edición básica

## 📝 **Próximos Pasos**

1. **Agregar logos faltantes** en `/public/images/logos/`
2. **Actualizar referencias** en `About.jsx`
3. **Optimizar imágenes** existentes
4. **Crear imágenes** de proyectos reales
5. **Agregar fotos** del equipo

## 🚀 **Comandos Útiles**

```bash
# Crear carpetas adicionales
mkdir public\images\projects
mkdir public\images\team
mkdir public\images\services

# Ver estructura actual
tree public\images /F
```
