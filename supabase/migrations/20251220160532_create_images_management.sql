/*
  # Images Management System

  1. New Tables
    - `site_images`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Identificador único de la imagen (ej: 'hero_banner', 'logo', 'about_image')
      - `url` (text) - URL de la imagen
      - `alt_text` (text) - Texto alternativo para SEO
      - `description` (text) - Descripción de la imagen
      - `category` (text) - Categoría (banner, logo, content, etc)
      - `order_index` (integer) - Orden de visualización
      - `is_active` (boolean) - Si la imagen está activa
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `site_images` table
    - Add policy for public read access
    - Add policy for authenticated users to manage images
*/

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

ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active images"
  ON site_images
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all images"
  ON site_images
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert images"
  ON site_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update images"
  ON site_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete images"
  ON site_images
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_images_updated_at
  BEFORE UPDATE ON site_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default images
INSERT INTO site_images (key, url, alt_text, description, category, order_index) VALUES
  ('hero_banner', 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg', 'Banner principal', 'Imagen principal del hero', 'banner', 1),
  ('about_image', 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg', 'Sobre nosotros', 'Imagen de la sección sobre nosotros', 'content', 1),
  ('parallax_1', 'https://images.pexels.com/photos/1170686/pexels-photo-1170686.jpeg', 'Parallax 1', 'Primera imagen parallax', 'banner', 1),
  ('parallax_2', 'https://images.pexels.com/photos/159358/construction-site-build-construction-work-159358.jpeg', 'Parallax 2', 'Segunda imagen parallax', 'banner', 2)
ON CONFLICT (key) DO NOTHING;