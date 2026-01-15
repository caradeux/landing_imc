-- Simple migration script without functions
-- Create database extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'Zap',
  image_url text NOT NULL,
  color text NOT NULL DEFAULT '#1e40af',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  display_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  year text NOT NULL,
  area text NOT NULL,
  duration text NOT NULL,
  location text NOT NULL,
  image_url text NOT NULL,
  services jsonb NOT NULL DEFAULT '[]'::jsonb,
  highlights jsonb NOT NULL DEFAULT '[]'::jsonb,
  display_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_position text NOT NULL,
  client_company text NOT NULL,
  testimonial_text text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  display_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  website_url text,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  email text NOT NULL,
  address text NOT NULL,
  schedule text NOT NULL,
  whatsapp text,
  instagram_url text,
  facebook_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title text NOT NULL,
  hero_subtitle text NOT NULL,
  cta_primary_text text NOT NULL,
  cta_secondary_text text NOT NULL,
  company_description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create site_stats table
CREATE TABLE IF NOT EXISTS site_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  icon text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  issuer text NOT NULL,
  logo_url text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create email_settings table
CREATE TABLE IF NOT EXISTS email_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  smtp_host text NOT NULL,
  smtp_port integer NOT NULL,
  smtp_user text NOT NULL,
  smtp_password text NOT NULL,
  from_email text NOT NULL,
  from_name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create site_images table
CREATE TABLE IF NOT EXISTS site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  url text NOT NULL,
  alt_text text,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create color_schemes table
CREATE TABLE IF NOT EXISTS color_schemes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  is_active boolean NOT NULL DEFAULT false,
  primary_color text DEFAULT '#1e40af',
  secondary_color text DEFAULT '#3b82f6',
  accent_color text DEFAULT '#fbbf24',
  background_color text DEFAULT '#ffffff',
  text_color text DEFAULT '#1f2937',
  text_light_color text DEFAULT '#6b7280',
  border_color text DEFAULT '#e5e7eb',
  success_color text DEFAULT '#10b981',
  warning_color text DEFAULT '#f59e0b',
  error_color text DEFAULT '#ef4444',
  overlay_color text DEFAULT 'rgba(0, 0, 0, 0.5)',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- =====================================================
-- INSERT DATA FROM SUPABASE EXPORT
-- =====================================================

-- Insert services data
INSERT INTO services (id, title, description, icon, image_url, color, features, display_order, active, created_at, updated_at) VALUES
('b8e7c3a1-4f2d-4e8b-9c1a-2d3e4f5g6h7i', 'Servicios Eléctricos', 'Instalaciones eléctricas industriales y comerciales con certificación SEC. Especialistas en sistemas de alta y baja tensión.', 'Zap', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#1e40af', '["Instalaciones eléctricas industriales","Sistemas de iluminación LED","Tableros eléctricos certificados","Mantención preventiva","Certificación SEC","Sistemas de emergencia"]', 1, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:01:32.469983+00'),
('c9f8d4b2-5g3e-5f9c-ad2b-3e4f5g6h7i8j', 'Obras Civiles', 'Construcción y remodelación de espacios comerciales e industriales. Especialistas en retail y centros logísticos.', 'Hammer', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#059669', '["Construcción de bodegas industriales","Remodelación de tiendas retail","Fundaciones especializadas","Pavimentación industrial","Estructuras de hormigón","Obras de ampliación"]', 2, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:01:45.927659+00'),
('d0a9e5c3-6h4f-6g0d-be3c-4f5g6h7i8j9k', 'Carpintería Especializada', 'Carpintería en metalcom y madera para proyectos comerciales. Mobiliario y estructuras personalizadas.', 'Wrench', 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#dc2626', '["Carpintería en metalcom","Mobiliario comercial","Estructuras de madera","Divisiones modulares","Muebles a medida","Instalación de estanterías"]', 3, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:01:58.469983+00'),
('e1b0f6d4-7i5g-7h1e-cf4d-5g6h7i8j9k0l', 'Estructuras Metálicas', 'Diseño, fabricación e instalación de estructuras metálicas para uso industrial y comercial.', 'Home', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#ea580c', '["Estructuras industriales","Techumbres metálicas","Escaleras y pasarelas","Galpones industriales","Estructuras antisísmicas","Soldadura certificada"]', 4, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:02:11.927659+00'),
('f2c1g7e5-8j6h-8i2f-dg5e-6h7i8j9k0l1m', 'Acabados Premium', 'Acabados de alta calidad para espacios comerciales y corporativos. Pintura, revestimientos y detalles arquitectónicos.', 'Palette', 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#7c3aed', '["Pintura industrial y decorativa","Revestimientos especializados","Cielos falsos","Pisos industriales","Señalética corporativa","Acabados arquitectónicos"]', 5, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:02:24.469983+00'),
('g3d2h8f6-9k7i-9j3g-eh6f-7i8j9k0l1m2n', 'Automatización', 'Sistemas de automatización y control para procesos industriales y comerciales.', 'Shield', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#0284c7', '["Sistemas de control automatizado","Sensores industriales","Programación PLC","Monitoreo remoto","Integración de sistemas","Mantenimiento predictivo"]', 6, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:02:37.927659+00');

-- Insert projects data
INSERT INTO projects (id, title, description, category, year, area, duration, location, image_url, services, highlights, display_order, active, created_at, updated_at) VALUES
('8445496b-57f0-4368-9bf5-cc1b24ec1c53', 'Construcción Bodega Construmart', 'Construcción de bodega industrial con estructuras de alta resistencia y sistemas especializados.', 'Industrial', '2023', '5,000 m²', '6 meses', 'Quilicura, Santiago', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '["Obras Civiles","Estructuras Metálicas","Techumbres"]', '["Fundaciones de alta resistencia","Estructuras metálicas certificadas","Sistema de techumbre industrial","Instalaciones eléctricas industriales"]', 2, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:02:00.927659+00'),
('f897835a-2d9e-4a1f-a8e3-fefe58a68548', 'Remodelación Integral Departamento Residencial', 'Proyecto de remodelación integral de departamento, incluyendo renovación de cocina y baños, cambio de revestimientos, actualización de instalaciones eléctricas y sanitarias, pintura completa y mejoras en distribución para optimizar espacios.', 'Logística', '2025', '80 m²', '8 meses', 'viña del mar, chile', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '["Obras Civiles","Automatización","Estructuras"]', '["Sistemas automatizados","Estructuras de gran envergadura","Pavimentación especializada","Instalaciones de alta tecnología"]', 2, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:02:28.469983+00'),
('0a26b714-a391-4ad6-90a0-07e1cef5d71b', 'Remodelación Jumbo Maipú', 'Remodelación integral de supermercado Jumbo incluyendo sistemas eléctricos, obras civiles y acabados premium.', 'Retail', '2024', '2,500 m²', '3 meses', 'Maipú, Santiago', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '["Servicios Eléctricos","Obras Civiles","Acabados Premium"]', '["Instalación de sistema LED completo","Renovación de pisos industriales","Modernización de sistemas eléctricos","Acabados de alta calidad"]', 1, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:02:49.900671+00'),
('52077761-6327-4499-a529-0b9326ecec0d', 'Modernización Easy Providencia', 'Modernización completa de tienda Easy con nuevos estándares de diseño y funcionalidad.', 'Retail', '2024', '3,200 m²', '4 meses', 'Providencia, Santiago', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '["Carpintería Especializada","Servicios Eléctricos","Acabados"]', '["Mobiliario comercial personalizado","Sistemas de iluminación LED","Carpintería en metalcom","Acabados arquitectónicos"]', 3, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:03:07.467663+00'),
('f90b3d16-6abf-43fd-85b7-6ea4bcacf6e3', 'Oficinas Corporativas', 'Oficinas corporativas modernas con diseño arquitectónico de vanguardia.', 'Corporativo', '2024', '1,800 m²', '5 meses', 'Las Condes, Santiago', 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '["Carpintería","Acabados Premium","Servicios Eléctricos"]', '["Diseño arquitectónico moderno","Acabados de lujo","Sistemas inteligentes","Espacios colaborativos"]', 5, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:03:21.922723+00');

-- Insert testimonials data
INSERT INTO testimonials (id, client_name, client_company, client_position, testimonial_text, rating, display_order, active, created_at, updated_at) VALUES
('138408bb-c48d-42ce-8cbd-c8140396f398', 'Juan Pérez', 'Jumbo Supermercados', 'Gerente de Operaciones', 'Excelente trabajo en la remodelación de nuestra tienda. El equipo fue muy profesional y cumplió con todos los plazos establecidos. La calidad del trabajo superó nuestras expectativas.', 5, 1, true, '2025-12-20 15:58:08.338303+00', '2025-12-20 15:58:08.338303+00'),
('8f6d3e62-712d-4b4b-a673-58c547a755f4', 'María González', 'Construmart', 'Jefa de Proyectos', 'La construcción de nuestra nueva bodega fue impecable. Destacamos la atención al detalle y el compromiso con la seguridad en cada etapa del proyecto.', 5, 2, true, '2025-12-20 15:58:08.338303+00', '2025-12-20 15:58:08.338303+00'),
('1882fdd9-4f0c-424d-892c-5163790b3381', 'Carlos Rodríguez', 'Easy', 'Director de Mantención', 'Muy satisfechos con la modernización de nuestras instalaciones. El equipo demostró gran expertise técnico y excelente capacidad de coordinación.', 5, 3, true, '2025-12-20 15:58:08.338303+00', '2025-12-20 15:58:08.338303+00');

-- Insert clients data
INSERT INTO clients (id, name, logo_url, website_url, order_index, is_active, created_at, updated_at) VALUES
('20aa78b3-8aad-4f48-adc2-a95947bff2b6', 'Jumbo', '/images/logos/jumbo.png', 'https://www.jumbo.cl', 1, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('6c4c4d43-189e-4a7e-84e8-ed0ab9a652d5', 'Contrumart', '/images/logos/contrumart.png', 'https://www.construmart.cl', 2, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('a49ac136-4faf-4763-b6a1-1c60ded20052', 'Santa Isabel', '/images/logos/Santa_Isabel.png', 'https://www.santaisabel.cl', 3, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('48686789-f619-4db5-881b-caf79b4e2c75', 'Easy', '/images/logos/easy.png', 'https://www.easy.cl', 4, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('bbf02319-fdbe-4b04-932c-10e334a28a61', 'Líder', '/images/logos/Lider.png', 'https://www.lider.cl', 5, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('73801168-658c-4987-a137-457cec4294e9', 'Homecenter Sodimac', '/images/logos/Homecenter_Sodimac.png', 'https://www.sodimac.cl', 6, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00');

-- Insert contact_info data
INSERT INTO contact_info (id, phone, email, address, schedule, whatsapp, instagram_url, facebook_url, created_at, updated_at) VALUES
('72c5dbb3-1bf9-44a2-8dab-c73d6e6e1047', '+56 9 8854 2926', 'contacto@imcsonline.online', 'Quillota 801, Viña del Mar, Chile', 'Lun-Vie: 8:00-18:00 | Emergencias 24/7', 'https://wa.me/56988542926', 'https://instagram.com/imcservicioschile', 'https://facebook.com/imcservicioschile', '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00');

-- Insert site_settings data
INSERT INTO site_settings (id, hero_title, hero_subtitle, cta_primary_text, cta_secondary_text, company_description, created_at, updated_at) VALUES
('0f7deacc-3828-4e2f-a473-bfec122a3f4d', 'Líderes en Construcción y Servicios Especializados', 'Más de 15 años transformando espacios retail, industriales y comerciales con la más alta calidad y profesionalismo.', 'Cotizar Proyecto', 'Ver Servicios', 'En IMC Servicios Chile SpA, nos especializamos en brindar soluciones integrales de construcción y servicios especializados para los sectores retail, industrial y comercial. Con más de 15 años de experiencia, hemos consolidado nuestra posición como líderes en el mercado chileno.', '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00');

-- Insert site_stats data
INSERT INTO site_stats (id, label, value, icon, order_index, is_active, created_at, updated_at) VALUES
('b365fb73-6ed4-4828-a44e-cf5804951617', 'Años de Experiencia', '15+', 'Award', 1, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('cfc91e79-519e-420a-b76e-0b14a770dcec', 'Proyectos Completados', '250+', 'Target', 2, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('c76ef8b4-d634-4e1d-b7bf-a9de4de35ca3', 'Clientes Satisfechos', '50+', 'Star', 3, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('1bf1f7d3-9d64-4470-8889-612adecf2612', 'Índice de Seguridad', '0% Accidentes', 'Shield', 4, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00');

-- Insert certifications data
INSERT INTO certifications (id, name, issuer, logo_url, order_index, is_active, created_at, updated_at) VALUES
('e32b69f9-f5f6-4214-803e-5cad18c7f521', 'ISO 9001:2015', 'ISO International', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', 1, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('78e606b1-b626-4439-9ebf-ad9cec0ca7d8', 'Certificación SEC', 'Superintendencia de Electricidad y Combustibles', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', 2, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('82271301-d65f-4331-9b80-a265d4abdbef', 'Mutual de Seguridad', 'Mutual de Seguridad CChC', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80', 3, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00');

-- Insert email_settings data
INSERT INTO email_settings (id, smtp_host, smtp_port, smtp_user, smtp_password, from_email, from_name, created_at, updated_at) VALUES
('2b7e96e1-902e-4824-a10b-c093ab92ae80', 'mail.imcsonline.online', 465, 'contacto@imcsonline.online', 'Marcelo2025..', 'contacto@imcsonline.online', 'IMC Servicios Chile SpA', '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00');

-- Insert site_images data
INSERT INTO site_images (id, key, url, alt_text, order_index, is_active, created_at, updated_at) VALUES
('f02d8da9-0a12-4c23-b305-3892460b3a04', 'hero_banner', 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg', 'Banner principal', 1, true, '2025-12-20 16:05:33.425701+00', '2025-12-20 16:05:33.425701+00'),
('559f2f51-a6d1-4f38-83f0-2d1eabbc2ff9', 'about_image', 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg', 'Sobre nosotros', 1, true, '2025-12-20 16:05:33.425701+00', '2025-12-20 16:05:33.425701+00'),
('6eddefc0-17b8-4777-ac54-51881ed83504', 'parallax_1', 'https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg', 'Parallax 1', 1, true, '2025-12-20 16:05:33.425701+00', '2025-12-20 16:05:33.425701+00'),
('49158bf0-d3a8-43b2-a12f-ff70ce3ddd79', 'parallax_2', 'https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg', 'Parallax 2', 2, true, '2025-12-20 16:05:33.425701+00', '2025-12-20 16:05:33.425701+00');

-- Insert color_schemes data
INSERT INTO color_schemes (id, name, is_active, primary_color, secondary_color, accent_color, background_color, text_color, text_light_color, border_color, success_color, warning_color, error_color, overlay_color, created_at, updated_at) VALUES
('e0101d70-cbf3-45d8-99fb-085eaea6b1ad', 'Azul Profesional', true, '#1e40af', '#3b82f6', '#667eea', '#ffffff', '#333333', '#666666', '#e1e5e9', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)', '2025-12-20 16:25:43.027634+00', '2025-12-20 16:31:31.855929+00'),
('0e670142-231f-4804-858b-95101438d3d0', 'Naranja Energético', false, '#ea580c', '#9a3412', '#fb923c', '#ffffff', '#292524', '#78716c', '#e7e5e4', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)', '2025-12-20 16:25:43.027634+00', '2025-12-20 16:25:43.027634+00'),
('3f17ae09-5063-47e0-9546-1291e98c52eb', 'Azul Cielo', false, '#0284c7', '#0c4a6e', '#38bdf8', '#ffffff', '#1e293b', '#64748b', '#e0f2fe', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)', '2025-12-20 16:25:43.027634+00', '2025-12-20 16:25:43.027634+00'),
('88bc764e-a623-4c5f-8250-653df539a0af', 'Rojo Corporativo', false, '#dc2626', '#7f1d1d', '#ef4444', '#ffffff', '#18181b', '#52525b', '#e4e4e7', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)', '2025-12-20 16:25:43.027634+00', '2025-12-20 16:25:43.027634+00'),
('fc2f1c0c-e6af-498e-966b-de833f04faa7', 'Gris Elegante', false, '#475569', '#1e293b', '#64748b', '#ffffff', '#0f172a', '#475569', '#e2e8f0', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)', '2025-12-20 16:25:43.027634+00', '2025-12-20 16:30:39.137632+00'),
('4c73a722-c4a2-4ea4-b905-52674e29f207', 'Verde Corporativo', false, '#059669', '#047857', '#10b981', '#ffffff', '#1f2937', '#6b7280', '#e5e7eb', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)', '2025-12-20 16:25:43.027634+00', '2025-12-20 16:31:31.855929+00');