/**
 * Script para importar proyectos a la base de datos
 * Ejecutar con: node scripts/import-projects.js
 */

// Usar la API de producción directamente
const API_BASE_URL = 'https://www.imcs.cl/api';

const projectsData = [
  {
    title: "Remodelación Integral de Cocinas Premium",
    description: "Transformación completa de cocinas residenciales de alta gama con instalación de mobiliario italiano, cubiertas de mármol importado, electrodomésticos empotrables y sistemas de iluminación LED. Proyecto ejecutado en departamentos de lujo en Viña del Mar y Reñaca.",
    category: "Residencial",
    year: "2025",
    area: "45 m²",
    duration: "6 semanas",
    location: "Viña del Mar, Chile",
    image_url: "/images/projects/remodelacion-cocinas-lujo/cocina-lujo-isla-central-marmol.jpg",
    services: ["Diseño de interiores", "Instalación de mobiliario", "Cubiertas de mármol", "Instalación eléctrica", "Iluminación LED"],
    highlights: ["Mármol importado premium", "Electrodomésticos de alta gama", "Gabinetes con cierre suave", "Isla central con barra desayunador", "Iluminación LED bajo gabinetes", "Acabados de primera calidad"],
    display_order: 1,
    active: true
  },
  {
    title: "Restauración de Balcones - Edificio Greco II",
    description: "Trabajo especializado de restauración y reparación de barandas oxidadas, aplicación de pasta muro, yeso y pintura anticorrosiva en balcones de edificio residencial frente al mar. Incluye tratamiento antióxido profesional, sellado de grietas y pintura de alta durabilidad resistente a la salinidad marina.",
    category: "Restauración",
    year: "2025",
    area: "120 m² lineales",
    duration: "4 semanas",
    location: "Reñaca, Viña del Mar",
    image_url: "/images/projects/edificio-greco-restauracion/baranda-pintada-despues-restauracion.jpg",
    services: ["Tratamiento antióxido", "Reparación de barandas", "Aplicación de pasta muro", "Pintura anticorrosiva", "Sellado de grietas"],
    highlights: ["Trabajo en altura certificado", "Pintura resistente a salinidad", "Restauración de fierro oxidado", "Garantía de 5 años", "Mínima intervención al residente", "Acabado profesional"],
    display_order: 2,
    active: true
  },
  {
    title: "Obras Civiles - Easy Viña del Mar",
    description: "Ejecución de obras civiles y terminaciones para tienda retail Easy en Viña del Mar. Incluye instalación de separadores de vidrio templado, fabricación y montaje de bolardos metálicos de seguridad, tabiquería en drywall y trabajos de soldadura especializada para estructuras de exhibición.",
    category: "Retail",
    year: "2025",
    area: "350 m²",
    duration: "8 semanas",
    location: "Viña del Mar, Chile",
    image_url: "/images/projects/easy-vina-del-mar/separacion-vidrio-retail-01.jpg",
    services: ["Instalación vidrio templado", "Soldadura estructural", "Tabiquería drywall", "Bolardos de seguridad", "Terminaciones retail"],
    highlights: ["Vidrio templado de seguridad", "Bolardos antichoque", "Soldadura certificada AWS", "Cumplimiento normativa retail", "Entrega en plazo", "Trabajo sin interrumpir operaciones"],
    display_order: 3,
    active: true
  },
  {
    title: "Construcción y Reparación de Muros Perimetrales",
    description: "Proyecto integral de construcción de muros perimetrales desde cimientos con armadura de acero, albañilería en ladrillo fiscal, estucado profesional y pintura de terminación. Incluye demolición de estructuras deterioradas, excavación de fundaciones y acabados de primera calidad.",
    category: "Obras Civiles",
    year: "2025",
    area: "85 m² lineales",
    duration: "5 semanas",
    location: "Santiago, Chile",
    image_url: "/images/projects/construccion-muros/muro-estucado-terminado.jpg",
    services: ["Demolición", "Cimientos y fundaciones", "Albañilería", "Estucado de muros", "Pintura exterior"],
    highlights: ["Armadura de acero reforzada", "Ladrillo fiscal certificado", "Estucado impermeable", "Pintura exterior durable", "10 años de garantía estructural", "Trabajo limpio y ordenado"],
    display_order: 4,
    active: true
  },
  {
    title: "Remodelación de Penthouse - Lobby y Entrada",
    description: "Transformación del lobby de entrada y áreas comunes de penthouse de lujo. Trabajos de pintura decorativa, instalación de iluminación empotrada, restauración de pisos de mármol y mejoras en la circulación del espacio. Acabados de alta gama con atención al detalle.",
    category: "Residencial",
    year: "2025",
    area: "35 m²",
    duration: "3 semanas",
    location: "Las Condes, Santiago",
    image_url: "/images/projects/remodelacion-penthouse/lobby-entrada-elegante-penthouse.jpg",
    services: ["Pintura decorativa", "Iluminación empotrada", "Restauración de pisos", "Molduras y terminaciones", "Instalaciones eléctricas"],
    highlights: ["Diseño personalizado", "Acabados de lujo", "Iluminación de ambiente", "Pisos de mármol restaurados", "Atención al detalle", "Entrega impecable"],
    display_order: 5,
    active: true
  },
  {
    title: "Trabajos de Pintura - Cocina, Murallas y Cielo",
    description: "Servicio completo de pintura interior en departamentos residenciales incluyendo preparación de superficies, reparación de imperfecciones, aplicación de pasta muro, lijado fino y pintura de terminación premium en cocinas, murallas y cielos. Utilizamos pinturas de alta calidad con certificación ambiental.",
    category: "Residencial",
    year: "2025",
    area: "80 m²",
    duration: "2 semanas",
    location: "Viña del Mar, Chile",
    image_url: "/images/projects/edificio-greco-restauracion/reparacion-cielo-departamento.jpg",
    services: ["Preparación de superficies", "Reparación de grietas", "Pasta muro profesional", "Pintura interior premium", "Limpieza final"],
    highlights: ["Pinturas certificadas", "Acabado profesional", "Sin olores molestos", "Protección de mobiliario", "Trabajo limpio", "Garantía de satisfacción"],
    display_order: 6,
    active: true
  }
];

async function importProjects() {
  console.log('🚀 Iniciando importación de proyectos...\n');

  for (const project of projectsData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project)
      });

      if (response.ok) {
        console.log(`✅ Proyecto creado: ${project.title}`);
      } else {
        const error = await response.json();
        console.error(`❌ Error en "${project.title}":`, error);
      }
    } catch (error) {
      console.error(`❌ Error de conexión para "${project.title}":`, error.message);
    }
  }

  console.log('\n✨ Importación completada!');
}

// Ejecutar si se llama directamente
importProjects();
