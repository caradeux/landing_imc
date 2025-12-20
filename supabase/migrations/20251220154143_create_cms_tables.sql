/*
  # Sistema de Administración de Contenido (CMS)

  ## Tablas Nuevas
  
  ### `services` - Servicios ofrecidos
    - `id` (uuid, primary key): Identificador único del servicio
    - `title` (text): Título del servicio (ej: "Servicios Eléctricos")
    - `description` (text): Descripción breve del servicio
    - `icon` (text): Nombre del ícono (ej: "Zap", "Hammer")
    - `image_url` (text): URL de la imagen del servicio
    - `color` (text): Color del servicio en hexadecimal (ej: "#1e40af")
    - `features` (jsonb): Array de características del servicio
    - `display_order` (integer): Orden de visualización
    - `active` (boolean): Si el servicio está activo o no
    - `created_at` (timestamptz): Fecha de creación
    - `updated_at` (timestamptz): Fecha de última actualización
  
  ### `projects` - Proyectos/Galería
    - `id` (uuid, primary key): Identificador único del proyecto
    - `title` (text): Título del proyecto (ej: "Remodelación Jumbo Maipú")
    - `description` (text): Descripción del proyecto
    - `category` (text): Categoría (Retail, Industrial, Logística, Corporativo)
    - `year` (text): Año de realización
    - `area` (text): Área del proyecto (ej: "2,500 m²")
    - `duration` (text): Duración del proyecto (ej: "3 meses")
    - `location` (text): Ubicación del proyecto
    - `image_url` (text): URL de la imagen principal
    - `services` (jsonb): Array de servicios realizados
    - `highlights` (jsonb): Array de aspectos destacados
    - `display_order` (integer): Orden de visualización
    - `active` (boolean): Si el proyecto está activo o no
    - `created_at` (timestamptz): Fecha de creación
    - `updated_at` (timestamptz): Fecha de última actualización
  
  ### `testimonials` - Testimonios de clientes
    - `id` (uuid, primary key): Identificador único del testimonio
    - `client_name` (text): Nombre del cliente
    - `client_company` (text): Empresa del cliente
    - `client_position` (text): Cargo del cliente
    - `client_photo_url` (text): URL de la foto del cliente
    - `content` (text): Contenido del testimonio
    - `rating` (integer): Calificación de 1 a 5
    - `project_name` (text): Nombre del proyecto relacionado (opcional)
    - `display_order` (integer): Orden de visualización
    - `active` (boolean): Si el testimonio está activo o no
    - `created_at` (timestamptz): Fecha de creación
    - `updated_at` (timestamptz): Fecha de última actualización

  ## Seguridad
  
  1. Se habilita RLS en todas las tablas
  2. Políticas de acceso:
     - Lectura pública para datos activos (para el sitio web público)
     - Escritura solo para usuarios autenticados (administradores)
  
  ## Notas Importantes
  
  - Todas las tablas incluyen campos `active` para ocultar contenido sin eliminarlo
  - Los campos `display_order` permiten ordenar el contenido manualmente
  - Se usan tipos JSONB para arrays dinámicos (features, services, highlights)
  - Las actualizaciones de `updated_at` se manejan automáticamente con triggers
*/

-- Crear tabla de servicios
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

-- Crear tabla de proyectos
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

-- Crear tabla de testimonios
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

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear triggers para updated_at
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

-- Crear índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS services_display_order_idx ON services(display_order);
CREATE INDEX IF NOT EXISTS services_active_idx ON services(active);
CREATE INDEX IF NOT EXISTS projects_display_order_idx ON projects(display_order);
CREATE INDEX IF NOT EXISTS projects_active_idx ON projects(active);
CREATE INDEX IF NOT EXISTS projects_category_idx ON projects(category);
CREATE INDEX IF NOT EXISTS testimonials_display_order_idx ON testimonials(display_order);
CREATE INDEX IF NOT EXISTS testimonials_active_idx ON testimonials(active);

-- Habilitar RLS en todas las tablas
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Políticas para services
CREATE POLICY "Permitir lectura pública de servicios activos"
  ON services FOR SELECT
  USING (active = true);

CREATE POLICY "Permitir lectura completa para usuarios autenticados"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Permitir inserción para usuarios autenticados"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Permitir actualización para usuarios autenticados"
  ON services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir eliminación para usuarios autenticados"
  ON services FOR DELETE
  TO authenticated
  USING (true);

-- Políticas para projects
CREATE POLICY "Permitir lectura pública de proyectos activos"
  ON projects FOR SELECT
  USING (active = true);

CREATE POLICY "Permitir lectura completa para usuarios autenticados"
  ON projects FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Permitir inserción para usuarios autenticados"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Permitir actualización para usuarios autenticados"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir eliminación para usuarios autenticados"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- Políticas para testimonials
CREATE POLICY "Permitir lectura pública de testimonios activos"
  ON testimonials FOR SELECT
  USING (active = true);

CREATE POLICY "Permitir lectura completa para usuarios autenticados"
  ON testimonials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Permitir inserción para usuarios autenticados"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Permitir actualización para usuarios autenticados"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Permitir eliminación para usuarios autenticados"
  ON testimonials FOR DELETE
  TO authenticated
  USING (true);