-- =====================================================
-- IMC Servicios Chile SpA - Database Migration Script
-- From Supabase to Coolify PostgreSQL
-- Date: January 15, 2026
-- =====================================================

-- Create database extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. CREATE ALL TABLES
-- =====================================================

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
  client_company text NOT NULL,
  client_position text NOT NULL DEFAULT '',
  client_photo_url text DEFAULT '',
  content text NOT NULL,
  rating integer NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  project_name text DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_info table
CREATE TABLE IF NOT EXISTS contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  schedule text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  instagram_url text NOT NULL DEFAULT '',
  facebook_url text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title text NOT NULL DEFAULT '',
  hero_subtitle text NOT NULL DEFAULT '',
  cta_primary_text text NOT NULL DEFAULT '',
  cta_secondary_text text NOT NULL DEFAULT '',
  company_description text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Create site_stats table
CREATE TABLE IF NOT EXISTS site_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value text NOT NULL,
  icon text NOT NULL DEFAULT 'Award',
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  sector text NOT NULL DEFAULT '',
  achievement text NOT NULL DEFAULT '',
  years_active text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon text NOT NULL DEFAULT 'Award',
  color text NOT NULL DEFAULT '#1e40af',
  description text NOT NULL DEFAULT '',
  expiry_date date,
  document_url text,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL DEFAULT 'General',
  question text NOT NULL,
  answer text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create email_settings table
CREATE TABLE IF NOT EXISTS email_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_email text NOT NULL DEFAULT '',
  reply_to_email text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

-- Create site_images table
CREATE TABLE IF NOT EXISTS site_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  url text NOT NULL,
  alt_text text DEFAULT '',
  description text DEFAULT '',
  category text DEFAULT 'general',
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create color_schemes table
CREATE TABLE IF NOT EXISTS color_schemes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  primary_color text NOT NULL DEFAULT '#1e40af',
  secondary_color text NOT NULL DEFAULT '#0f172a',
  accent_color text NOT NULL DEFAULT '#667eea',
  text_color text NOT NULL DEFAULT '#333333',
  text_light text NOT NULL DEFAULT '#666666',
  background_color text NOT NULL DEFAULT '#ffffff',
  card_background text NOT NULL DEFAULT '#ffffff',
  border_color text NOT NULL DEFAULT '#e1e5e9',
  hover_color text NOT NULL DEFAULT '#3b82f6',
  gradient_start text NOT NULL DEFAULT '#1e40af',
  gradient_end text NOT NULL DEFAULT '#0f172a',
  is_active boolean DEFAULT false,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  button_text_color text DEFAULT '#ffffff',
  section_bg_light text DEFAULT '#f9fafb',
  section_bg_dark text DEFAULT '#f3f4f6',
  success_color text DEFAULT '#10b981',
  warning_color text DEFAULT '#f59e0b',
  error_color text DEFAULT '#ef4444',
  overlay_color text DEFAULT 'rgba(0, 0, 0, 0.5)'
);

-- =====================================================
-- 2. CREATE FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_stats_updated_at
  BEFORE UPDATE ON site_stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at
  BEFORE UPDATE ON certifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faqs_updated_at
  BEFORE UPDATE ON faqs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_images_updated_at
  BEFORE UPDATE ON site_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_color_schemes_updated_at
  BEFORE UPDATE ON color_schemes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to ensure single active color scheme
CREATE OR REPLACE FUNCTION ensure_single_active_color_scheme()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_active = true THEN
    UPDATE color_schemes 
    SET is_active = false 
    WHERE id != NEW.id AND is_active = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_single_active_scheme
  BEFORE INSERT OR UPDATE ON color_schemes
  FOR EACH ROW
  WHEN (NEW.is_active = true)
  EXECUTE FUNCTION ensure_single_active_color_scheme();

-- =====================================================
-- 3. CREATE INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS services_display_order_idx ON services(display_order);
CREATE INDEX IF NOT EXISTS services_active_idx ON services(active);
CREATE INDEX IF NOT EXISTS projects_display_order_idx ON projects(display_order);
CREATE INDEX IF NOT EXISTS projects_active_idx ON projects(active);
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);
CREATE INDEX IF NOT EXISTS testimonials_display_order_idx ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS testimonials_active_idx ON testimonials(active);
CREATE INDEX IF NOT EXISTS idx_site_stats_order ON site_stats(order_index) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_clients_order ON clients(order_index) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_certifications_order ON certifications(order_index) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_faqs_category_order ON faqs(category, order_index) WHERE is_active = true;

-- =====================================================
-- 4. INSERT DATA FROM CSV EXPORTS
-- =====================================================

-- Insert services data
INSERT INTO services (id, title, description, icon, image_url, color, features, display_order, active, created_at, updated_at) VALUES
('112e5f44-1334-4d42-8cfa-d412efa98bfb', 'Servicios Eléctricos', 'Instalaciones certificadas y sistemas de automatización', 'Zap', 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#1e40af', '["Instalaciones domiciliarias certificadas","Electricidad semi-industrial","Sistemas de iluminación LED","Automatización y control","Mantenimiento preventivo","Certificaciones SEC"]', 1, true, '2025-12-20 15:57:38.674049+00', '2025-12-20 15:57:38.674049+00'),
('707b1d68-f7eb-4e3f-8f47-41daaf329e92', 'Obras Civiles', 'Construcción de alta resistencia y calidad certificada', 'Hammer', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#0f172a', '["Hormigón de alta resistencia","Enfierraduras especializadas","Fundaciones y cimientos","Estructuras de concreto","Pavimentación industrial","Control de calidad certificado"]', 2, true, '2025-12-20 15:57:38.674049+00', '2025-12-20 15:57:38.674049+00'),
('758f2f52-e20f-42c7-ab9c-3782f3c389f9', 'Carpintería Especializada', 'Soluciones arquitectónicas y mobiliario comercial', 'Wrench', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#dc2626', '["Carpintería en metalcom","Estructuras de aluminio","Mobiliario comercial","Soluciones arquitectónicas","Acabados de lujo","Diseño personalizado"]', 3, true, '2025-12-20 15:57:38.674049+00', '2025-12-20 15:57:38.674049+00'),
('da0b8a7f-9ed9-4341-8a5f-7bb961dfff07', 'Techumbres Industriales', 'Cubiertas metálicas y sistemas de protección', 'Home', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#ea580c', '["Cubiertas metálicas","Sistemas de drenaje","Aislación térmica","Impermeabilización","Mantenimiento especializado","Garantía extendida"]', 4, true, '2025-12-20 15:57:38.674049+00', '2025-12-20 15:57:38.674049+00'),
('5f9f68b8-cd21-4afa-a3e7-99000767455e', 'Acabados Premium', 'Pintura industrial y acabados especiales', 'Palette', 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#059669', '["Pintura industrial","Acabados especiales","Protección anticorrosiva","Sistemas de recubrimiento","Preparación de superficies","Control de calidad"]', 5, true, '2025-12-20 15:57:38.674049+00', '2025-12-20 15:57:38.674049+00'),
('b273f418-efbe-4f41-a420-de9a607aa795', 'Soldadura Certificada', 'Soldadura especializada con certificación AWS', 'Shield', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '#7c3aed', '["Soldadura especializada","Estructuras metálicas","Certificación AWS","Soldadura bajo agua","Reparaciones industriales","Control de calidad"]', 6, true, '2025-12-20 15:57:38.674049+00', '2025-12-20 15:57:38.674049+00');

-- Insert projects data
INSERT INTO projects (id, title, description, category, year, area, duration, location, image_url, services, highlights, display_order, active, created_at, updated_at) VALUES
('8445496b-57f0-4368-9bf5-cc1b24ec1c53', 'Construcción Bodega Construmart', 'Construcción de bodega industrial con estructuras de alta resistencia y sistemas especializados.', 'Industrial', '2023', '5,000 m²', '6 meses', 'Quilicura, Santiago', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '["Obras Civiles","Estructuras Metálicas","Techumbres"]', '["Fundaciones de alta resistencia","Estructuras metálicas certificadas","Sistema de techumbre industrial","Instalaciones eléctricas industriales"]', 2, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:02:00.927659+00'),
('f897835a-2d9e-4a1f-a8e3-fefe58a68548', 'Remodelación Integral Departamento Residencial', 'Proyecto de remodelación integral de departamento, incluyendo renovación de cocina y baños, cambio de revestimientos, actualización de instalaciones eléctricas y sanitarias, pintura completa y mejoras en distribución para optimizar espacios.', 'Logística', '2025', '80 m²', '8 meses', 'viña del mar, chile', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '["Obras Civiles","Automatización","Estructuras"]', '["Sistemas automatizados","Estructuras de gran envergadura","Pavimentación especializada","Instalaciones de alta tecnología"]', 2, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:02:28.469983+00'),
('0a26b714-a391-4ad6-90a0-07e1cef5d71b', 'Remodelación Jumbo Maipú', 'Remodelación integral de supermercado Jumbo incluyendo sistemas eléctricos, obras civiles y acabados premium.', 'Retail', '2024', '2,500 m²', '3 meses', 'Maipú, Santiago', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '["Servicios Eléctricos","Obras Civiles","Acabados Premium"]', '["Instalación de sistema LED completo","Renovación de pisos industriales","Modernización de sistemas eléctricos","Acabados de alta calidad"]', 1, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:02:49.900671+00'),
('52077761-6327-4499-a529-0b9326ecec0d', 'Modernización Easy Providencia', 'Modernización completa de tienda Easy con nuevos estándares de diseño y funcionalidad.', 'Retail', '2024', '3,200 m²', '4 meses', 'Providencia, Santiago', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '["Carpintería Especializada","Servicios Eléctricos","Acabados"]', '["Mobiliario comercial personalizado","Sistemas de iluminación LED","Carpintería en metalcom","Acabados arquitectónicos"]', 3, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:03:07.467663+00'),
('f90b3d16-6abf-43fd-85b7-6ea4bcacf6e3', 'Oficinas Corporativas', 'Oficinas corporativas modernas con diseño arquitectónico de vanguardia.', 'Corporativo', '2024', '1,800 m²', '5 meses', 'Las Condes, Santiago', 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', '["Carpintería","Acabados Premium","Servicios Eléctricos"]', '["Diseño arquitectónico moderno","Acabados de lujo","Sistemas inteligentes","Espacios colaborativos"]', 5, true, '2025-12-20 15:57:59.276996+00', '2025-12-30 13:03:21.922723+00');

-- Insert testimonials data
INSERT INTO testimonials (id, client_name, client_company, client_position, client_photo_url, content, rating, project_name, display_order, active, created_at, updated_at) VALUES
('138408bb-c48d-42ce-8cbd-c8140396f398', 'Juan Pérez', 'Jumbo Supermercados', 'Gerente de Operaciones', '', 'Excelente trabajo en la remodelación de nuestra tienda. El equipo fue muy profesional y cumplió con todos los plazos establecidos. La calidad del trabajo superó nuestras expectativas.', 5, 'Remodelación Jumbo Maipú', 1, true, '2025-12-20 15:58:08.338303+00', '2025-12-20 15:58:08.338303+00'),
('8f6d3e62-712d-4b4b-a673-58c547a755f4', 'María González', 'Construmart', 'Jefa de Proyectos', '', 'La construcción de nuestra nueva bodega fue impecable. Destacamos la atención al detalle y el compromiso con la seguridad en cada etapa del proyecto.', 5, 'Construcción Bodega Construmart', 2, true, '2025-12-20 15:58:08.338303+00', '2025-12-20 15:58:08.338303+00'),
('1882fdd9-4f0c-424d-892c-5163790b3381', 'Carlos Rodríguez', 'Easy', 'Director de Mantención', '', 'Muy satisfechos con la modernización de nuestras instalaciones. El equipo demostró gran expertise técnico y excelente capacidad de coordinación.', 5, 'Modernización Easy Providencia', 3, true, '2025-12-20 15:58:08.338303+00', '2025-12-20 15:58:08.338303+00');

-- Insert clients data
INSERT INTO clients (id, name, logo_url, sector, achievement, years_active, description, order_index, is_active, created_at, updated_at) VALUES
('20aa78b3-8aad-4f48-adc2-a95947bff2b6', 'Jumbo', '/images/logos/jumbo.png', 'Retail', '50+ Remodelaciones', '2019-2024', 'Socio estratégico en la modernización de supermercados a nivel nacional', 1, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('6c4c4d43-189e-4a7e-84e8-ed0ab9a652d5', 'Contrumart', '/images/logos/contrumart.png', 'Retail', '15 Bodegas', '2020-2024', 'Construcción de infraestructura logística y centros de distribución', 2, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('a49ac136-4faf-4763-b6a1-1c60ded20052', 'Santa Isabel', '/images/logos/Santa_Isabel.png', 'Retail', '8 Centros', '2021-2024', 'Desarrollo de centros logísticos de última generación', 3, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('48686789-f619-4db5-881b-caf79b4e2c75', 'Easy', '/images/logos/easy.png', 'Retail', '25+ Tiendas', '2018-2024', 'Modernización integral de tiendas y mejoramiento continuo', 4, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('bbf02319-fdbe-4b04-932c-10e334a28a61', 'Líder', '/images/logos/Lider.png', 'Retail', '12 Proyectos', '2022-2024', 'Expansión y renovación de infraestructura comercial', 5, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('73801168-658c-4987-a137-457cec4294e9', 'Homecenter Sodimac', '/images/logos/Homecenter_Sodimac.png', 'Retail', '30+ Instalaciones', '2019-2024', 'Sistemas eléctricos especializados y automatización', 6, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00');

-- Insert contact_info data
INSERT INTO contact_info (id, phone, email, address, schedule, whatsapp, instagram_url, facebook_url, updated_at) VALUES
('72c5dbb3-1bf9-44a2-8dab-c73d6e6e1047', '+56 9 8854 2926', 'contacto@imcsonline.online', 'Quillota 801, Viña del Mar, Chile', 'Lun-Vie: 8:00-18:00 | Emergencias 24/7', 'https://wa.me/56988542926', 'https://instagram.com/imcservicioschile', 'https://facebook.com/imcservicioschile', '2025-12-20 16:12:29.948869+00');

-- Insert site_settings data
INSERT INTO site_settings (id, hero_title, hero_subtitle, cta_primary_text, cta_secondary_text, company_description, updated_at) VALUES
('0f7deacc-3828-4e2f-a473-bfec122a3f4d', 'Líderes en Construcción y Servicios Especializados', 'Más de 15 años transformando espacios retail, industriales y comerciales con la más alta calidad y profesionalismo.', 'Cotizar Proyecto', 'Ver Servicios', 'En IMC Servicios Chile SpA, nos especializamos en brindar soluciones integrales de construcción y servicios especializados para los sectores retail, industrial y comercial. Con más de 15 años de experiencia, hemos consolidado nuestra posición como líderes en el mercado chileno.', '2025-12-20 16:12:29.948869+00');

-- Insert site_stats data
INSERT INTO site_stats (id, label, value, icon, order_index, is_active, created_at, updated_at) VALUES
('b365fb73-6ed4-4828-a44e-cf5804951617', 'Años de Experiencia', '15+', 'Award', 1, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('cfc91e79-519e-420a-b76e-0b14a770dcec', 'Proyectos Completados', '250+', 'Target', 2, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('c76ef8b4-d634-4e1d-b7bf-a9de4de35ca3', 'Clientes Satisfechos', '50+', 'Star', 3, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('1bf1f7d3-9d64-4470-8889-612adecf2612', 'Índice de Seguridad', '0% Accidentes', 'Shield', 4, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00');

-- Insert certifications data
INSERT INTO certifications (id, name, icon, color, description, expiry_date, document_url, order_index, is_active, created_at, updated_at) VALUES
('e32b69f9-f5f6-4214-803e-5cad18c7f521', 'ISO 9001:2015', 'Shield', '#1e40af', 'Certificación que garantiza nuestros altos estándares de calidad y seguridad', NULL, NULL, 1, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('78e606b1-b626-4439-9ebf-ad9cec0ca7d8', 'Certificación SEC', 'Award', '#059669', 'Certificación que garantiza nuestros altos estándares de calidad y seguridad', NULL, NULL, 2, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00'),
('82271301-d65f-4331-9b80-a265d4abdbef', 'Mutual de Seguridad', 'CheckCircle', '#7c3aed', 'Certificación que garantiza nuestros altos estándares de calidad y seguridad', NULL, NULL, 3, true, '2025-12-20 16:12:29.948869+00', '2025-12-20 16:12:29.948869+00');

-- Insert email_settings data
INSERT INTO email_settings (id, destination_email, reply_to_email, updated_at) VALUES
('2b7e96e1-902e-4824-a10b-c093ab92ae80', 'contacto@imcsonline.online', 'contacto@imcsonline.online', '2025-12-20 16:12:29.948869+00');

-- Insert site_images data
INSERT INTO site_images (id, key, url, alt_text, description, category, order_index, is_active, created_at, updated_at) VALUES
('f02d8da9-0a12-4c23-b305-3892460b3a04', 'hero_banner', 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg', 'Banner principal', 'Imagen principal del hero', 'banner', 1, true, '2025-12-20 16:05:33.425701+00', '2025-12-20 16:05:33.425701+00'),
('559f2f51-a6d1-4f38-83f0-2d1eabbc2ff9', 'about_image', 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg', 'Sobre nosotros', 'Imagen de la sección sobre nosotros', 'content', 1, true, '2025-12-20 16:05:33.425701+00', '2025-12-20 16:05:33.425701+00'),
('6eddefc0-17b8-4777-ac54-51881ed83504', 'parallax_1', 'https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg', 'Parallax 1', 'Primera imagen parallax', 'banner', 1, true, '2025-12-20 16:05:33.425701+00', '2025-12-20 16:05:33.425701+00'),
('49158bf0-d3a8-43b2-a12f-ff70ce3ddd79', 'parallax_2', 'https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg', 'Parallax 2', 'Segunda imagen parallax', 'banner', 2, true, '2025-12-20 16:05:33.425701+00', '2025-12-20 16:05:33.425701+00');

-- Insert color_schemes data
INSERT INTO color_schemes (id, name, description, primary_color, secondary_color, accent_color, text_color, text_light, background_color, card_background, border_color, hover_color, gradient_start, gradient_end, is_active, is_default, created_at, updated_at, button_text_color, section_bg_light, section_bg_dark, success_color, warning_color, error_color, overlay_color) VALUES
('0e670142-231f-4804-858b-95101438d3d0', 'Naranja Energético', 'Esquema de color naranja vibrante y energético', '#ea580c', '#9a3412', '#fb923c', '#292524', '#78716c', '#ffffff', '#ffffff', '#e7e5e4', '#f97316', '#ea580c', '#9a3412', false, false, '2025-12-20 16:25:43.027634+00', '2025-12-20 16:25:43.027634+00', '#ffffff', '#f9fafb', '#f3f4f6', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)'),
('3f17ae09-5063-47e0-9546-1291e98c52eb', 'Azul Cielo', 'Esquema de color azul claro y fresco', '#0284c7', '#0c4a6e', '#38bdf8', '#1e293b', '#64748b', '#ffffff', '#ffffff', '#e0f2fe', '#0ea5e9', '#0284c7', '#0c4a6e', false, false, '2025-12-20 16:25:43.027634+00', '2025-12-20 16:25:43.027634+00', '#ffffff', '#f9fafb', '#f3f4f6', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)'),
('88bc764e-a623-4c5f-8250-653df539a0af', 'Rojo Corporativo', 'Esquema de color rojo intenso y profesional', '#dc2626', '#7f1d1d', '#ef4444', '#18181b', '#52525b', '#ffffff', '#ffffff', '#e4e4e7', '#f87171', '#dc2626', '#7f1d1d', false, false, '2025-12-20 16:25:43.027634+00', '2025-12-20 16:25:43.027634+00', '#ffffff', '#f9fafb', '#f3f4f6', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)'),
('fc2f1c0c-e6af-498e-966b-de833f04faa7', 'Gris Elegante', 'Esquema de color gris moderno y elegante', '#475569', '#1e293b', '#64748b', '#0f172a', '#475569', '#ffffff', '#ffffff', '#e2e8f0', '#94a3b8', '#475569', '#1e293b', false, false, '2025-12-20 16:25:43.027634+00', '2025-12-20 16:30:39.137632+00', '#ffffff', '#f9fafb', '#f3f4f6', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)'),
('4c73a722-c4a2-4ea4-b905-52674e29f207', 'Verde Corporativo', 'Esquema de color verde para empresas de servicios', '#059669', '#047857', '#10b981', '#1f2937', '#6b7280', '#ffffff', '#ffffff', '#e5e7eb', '#34d399', '#059669', '#047857', false, false, '2025-12-20 16:25:43.027634+00', '2025-12-20 16:31:31.855929+00', '#ffffff', '#f9fafb', '#f3f4f6', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)'),
('e0101d70-cbf3-45d8-99fb-085eaea6b1ad', 'Azul Profesional', 'Esquema de color azul profesional y corporativo (actual)', '#1e40af', '#0f172a', '#667eea', '#333333', '#666666', '#ffffff', '#ffffff', '#e1e5e9', '#3b82f6', '#1e40af', '#0f172a', true, true, '2025-12-20 16:25:43.027634+00', '2025-12-20 16:31:31.855929+00', '#ffffff', '#f9fafb', '#f3f4f6', '#10b981', '#f59e0b', '#ef4444', 'rgba(0, 0, 0, 0.5)');

-- =====================================================
-- 5. VERIFICATION QUERIES
-- =====================================================

-- Verify data insertion
SELECT 'services' as table_name, count(*) as record_count FROM services
UNION ALL
SELECT 'projects', count(*) FROM projects
UNION ALL
SELECT 'testimonials', count(*) FROM testimonials
UNION ALL
SELECT 'clients', count(*) FROM clients
UNION ALL
SELECT 'contact_info', count(*) FROM contact_info
UNION ALL
SELECT 'site_settings', count(*) FROM site_settings
UNION ALL
SELECT 'site_stats', count(*) FROM site_stats
UNION ALL
SELECT 'certifications', count(*) FROM certifications
UNION ALL
SELECT 'email_settings', count(*) FROM email_settings
UNION ALL
SELECT 'site_images', count(*) FROM site_images
UNION ALL
SELECT 'color_schemes', count(*) FROM color_schemes;

-- =====================================================
-- MIGRATION COMPLETED SUCCESSFULLY
-- =====================================================