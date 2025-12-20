-- Script para insertar datos de ejemplo en el CMS
-- Ejecuta este script en Supabase SQL Editor para poblar la base de datos con datos de ejemplo

-- Insertar servicios de ejemplo
INSERT INTO services (title, description, icon, image_url, color, features, display_order, active) VALUES
(
  'Servicios Eléctricos',
  'Instalaciones certificadas y sistemas de automatización',
  'Zap',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '#1e40af',
  '["Instalaciones domiciliarias certificadas", "Electricidad semi-industrial", "Sistemas de iluminación LED", "Automatización y control", "Mantenimiento preventivo", "Certificaciones SEC"]'::jsonb,
  1,
  true
),
(
  'Obras Civiles',
  'Construcción de alta resistencia y calidad certificada',
  'Hammer',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '#0f172a',
  '["Hormigón de alta resistencia", "Enfierraduras especializadas", "Fundaciones y cimientos", "Estructuras de concreto", "Pavimentación industrial", "Control de calidad certificado"]'::jsonb,
  2,
  true
),
(
  'Carpintería Especializada',
  'Soluciones arquitectónicas y mobiliario comercial',
  'Wrench',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '#dc2626',
  '["Carpintería en metalcom", "Estructuras de aluminio", "Mobiliario comercial", "Soluciones arquitectónicas", "Acabados de lujo", "Diseño personalizado"]'::jsonb,
  3,
  true
),
(
  'Techumbres Industriales',
  'Cubiertas metálicas y sistemas de protección',
  'Home',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '#ea580c',
  '["Cubiertas metálicas", "Sistemas de drenaje", "Aislación térmica", "Impermeabilización", "Mantenimiento especializado", "Garantía extendida"]'::jsonb,
  4,
  true
),
(
  'Acabados Premium',
  'Pintura industrial y acabados especiales',
  'Palette',
  'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '#059669',
  '["Pintura industrial", "Acabados especiales", "Protección anticorrosiva", "Sistemas de recubrimiento", "Preparación de superficies", "Control de calidad"]'::jsonb,
  5,
  true
),
(
  'Soldadura Certificada',
  'Soldadura especializada con certificación AWS',
  'Shield',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '#7c3aed',
  '["Soldadura especializada", "Estructuras metálicas", "Certificación AWS", "Soldadura bajo agua", "Reparaciones industriales", "Control de calidad"]'::jsonb,
  6,
  true
);

-- Insertar proyectos de ejemplo
INSERT INTO projects (title, description, category, year, area, duration, location, image_url, services, highlights, display_order, active) VALUES
(
  'Remodelación Jumbo Maipú',
  'Remodelación integral de supermercado Jumbo incluyendo sistemas eléctricos, obras civiles y acabados premium.',
  'Retail',
  '2024',
  '2,500 m²',
  '3 meses',
  'Maipú, Santiago',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '["Servicios Eléctricos", "Obras Civiles", "Acabados Premium"]'::jsonb,
  '["Instalación de sistema LED completo", "Renovación de pisos industriales", "Modernización de sistemas eléctricos", "Acabados de alta calidad"]'::jsonb,
  1,
  true
),
(
  'Construcción Bodega Construmart',
  'Construcción de bodega industrial con estructuras de alta resistencia y sistemas especializados.',
  'Industrial',
  '2023',
  '5,000 m²',
  '6 meses',
  'Quilicura, Santiago',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '["Obras Civiles", "Estructuras Metálicas", "Techumbres"]'::jsonb,
  '["Fundaciones de alta resistencia", "Estructuras metálicas certificadas", "Sistema de techumbre industrial", "Instalaciones eléctricas industriales"]'::jsonb,
  2,
  true
),
(
  'Modernización Easy Providencia',
  'Modernización completa de tienda Easy con nuevos estándares de diseño y funcionalidad.',
  'Retail',
  '2024',
  '3,200 m²',
  '4 meses',
  'Providencia, Santiago',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '["Carpintería Especializada", "Servicios Eléctricos", "Acabados"]'::jsonb,
  '["Mobiliario comercial personalizado", "Sistemas de iluminación LED", "Carpintería en metalcom", "Acabados arquitectónicos"]'::jsonb,
  3,
  true
),
(
  'Centro Logístico Santa Isabel',
  'Centro de distribución logística con tecnología avanzada y sistemas automatizados.',
  'Logística',
  '2023',
  '8,000 m²',
  '8 meses',
  'Pudahuel, Santiago',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '["Obras Civiles", "Automatización", "Estructuras"]'::jsonb,
  '["Sistemas automatizados", "Estructuras de gran envergadura", "Pavimentación especializada", "Instalaciones de alta tecnología"]'::jsonb,
  4,
  true
),
(
  'Oficinas Corporativas',
  'Oficinas corporativas modernas con diseño arquitectónico de vanguardia.',
  'Corporativo',
  '2024',
  '1,800 m²',
  '5 meses',
  'Las Condes, Santiago',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  '["Carpintería", "Acabados Premium", "Servicios Eléctricos"]'::jsonb,
  '["Diseño arquitectónico moderno", "Acabados de lujo", "Sistemas inteligentes", "Espacios colaborativos"]'::jsonb,
  5,
  true
);

-- Insertar testimonios de ejemplo
INSERT INTO testimonials (client_name, client_company, client_position, client_photo_url, content, rating, project_name, display_order, active) VALUES
(
  'Juan Pérez',
  'Jumbo Supermercados',
  'Gerente de Operaciones',
  '',
  'Excelente trabajo en la remodelación de nuestra tienda. El equipo fue muy profesional y cumplió con todos los plazos establecidos. La calidad del trabajo superó nuestras expectativas.',
  5,
  'Remodelación Jumbo Maipú',
  1,
  true
),
(
  'María González',
  'Construmart',
  'Jefa de Proyectos',
  '',
  'La construcción de nuestra nueva bodega fue impecable. Destacamos la atención al detalle y el compromiso con la seguridad en cada etapa del proyecto.',
  5,
  'Construcción Bodega Construmart',
  2,
  true
),
(
  'Carlos Rodríguez',
  'Easy',
  'Director de Mantención',
  '',
  'Muy satisfechos con la modernización de nuestras instalaciones. El equipo demostró gran expertise técnico y excelente capacidad de coordinación.',
  5,
  'Modernización Easy Providencia',
  3,
  true
);
