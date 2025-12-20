/*
  # Sistema de Esquemas de Color

  1. Nueva Tabla
    - `color_schemes`
      - `id` (uuid, primary key)
      - `name` (text) - Nombre del esquema
      - `primary_color` (text) - Color primario principal
      - `secondary_color` (text) - Color secundario
      - `accent_color` (text) - Color de acento
      - `text_color` (text) - Color de texto principal
      - `text_light` (text) - Color de texto claro
      - `background_color` (text) - Color de fondo
      - `card_background` (text) - Color de fondo de tarjetas
      - `border_color` (text) - Color de bordes
      - `hover_color` (text) - Color en hover
      - `is_active` (boolean) - Esquema activo
      - `is_default` (boolean) - Esquema por defecto
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Datos Iniciales
    - Esquema "Azul Profesional" (actual) como default
    - Esquema "Verde Corporativo"
    - Esquema "Naranja Energético"
    - Esquema "Gris Elegante"

  3. Seguridad
    - Enable RLS
    - Public read access
    - Authenticated users can manage
*/

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
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE color_schemes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view color schemes"
  ON color_schemes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert color schemes"
  ON color_schemes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update color schemes"
  ON color_schemes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete color schemes"
  ON color_schemes FOR DELETE
  TO authenticated
  USING (true);

-- Insertar esquemas de color predefinidos
INSERT INTO color_schemes (name, description, primary_color, secondary_color, accent_color, text_color, text_light, background_color, card_background, border_color, hover_color, gradient_start, gradient_end, is_active, is_default)
VALUES 
  (
    'Azul Profesional',
    'Esquema de color azul profesional y corporativo (actual)',
    '#1e40af',
    '#0f172a',
    '#667eea',
    '#333333',
    '#666666',
    '#ffffff',
    '#ffffff',
    '#e1e5e9',
    '#3b82f6',
    '#1e40af',
    '#0f172a',
    true,
    true
  ),
  (
    'Verde Corporativo',
    'Esquema de color verde para empresas de servicios',
    '#059669',
    '#047857',
    '#10b981',
    '#1f2937',
    '#6b7280',
    '#ffffff',
    '#ffffff',
    '#e5e7eb',
    '#34d399',
    '#059669',
    '#047857',
    false,
    false
  ),
  (
    'Naranja Energético',
    'Esquema de color naranja vibrante y energético',
    '#ea580c',
    '#9a3412',
    '#fb923c',
    '#292524',
    '#78716c',
    '#ffffff',
    '#ffffff',
    '#e7e5e4',
    '#f97316',
    '#ea580c',
    '#9a3412',
    false,
    false
  ),
  (
    'Gris Elegante',
    'Esquema de color gris moderno y elegante',
    '#475569',
    '#1e293b',
    '#64748b',
    '#0f172a',
    '#475569',
    '#ffffff',
    '#ffffff',
    '#e2e8f0',
    '#94a3b8',
    '#475569',
    '#1e293b',
    false,
    false
  ),
  (
    'Azul Cielo',
    'Esquema de color azul claro y fresco',
    '#0284c7',
    '#0c4a6e',
    '#38bdf8',
    '#1e293b',
    '#64748b',
    '#ffffff',
    '#ffffff',
    '#e0f2fe',
    '#0ea5e9',
    '#0284c7',
    '#0c4a6e',
    false,
    false
  ),
  (
    'Rojo Corporativo',
    'Esquema de color rojo intenso y profesional',
    '#dc2626',
    '#7f1d1d',
    '#ef4444',
    '#18181b',
    '#52525b',
    '#ffffff',
    '#ffffff',
    '#e4e4e7',
    '#f87171',
    '#dc2626',
    '#7f1d1d',
    false,
    false
  );

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_color_schemes_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER color_schemes_updated_at
  BEFORE UPDATE ON color_schemes
  FOR EACH ROW
  EXECUTE FUNCTION update_color_schemes_updated_at();

-- Trigger para asegurar que solo un esquema esté activo
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