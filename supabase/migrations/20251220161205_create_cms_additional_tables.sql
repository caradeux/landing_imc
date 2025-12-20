/*
  # Create Additional CMS Tables

  ## New Tables
  
  ### 1. contact_info
  Main contact information for the site
  - `id` (uuid, primary key)
  - `phone` (text) - Main phone number
  - `email` (text) - Main email
  - `address` (text) - Physical address
  - `schedule` (text) - Business hours
  - `whatsapp` (text) - WhatsApp number
  - `instagram_url` (text) - Instagram profile URL
  - `facebook_url` (text) - Facebook profile URL
  - `updated_at` (timestamp)
  
  ### 2. site_settings
  General site configuration and hero section
  - `id` (uuid, primary key)
  - `hero_title` (text) - Main hero title
  - `hero_subtitle` (text) - Hero subtitle/description
  - `cta_primary_text` (text) - Primary CTA button text
  - `cta_secondary_text` (text) - Secondary CTA button text
  - `company_description` (text) - About company text
  - `updated_at` (timestamp)
  
  ### 3. site_stats
  Key numbers and statistics displayed on site
  - `id` (uuid, primary key)
  - `label` (text) - Stat label
  - `value` (text) - Stat value
  - `icon` (text) - Icon name
  - `order_index` (integer) - Display order
  - `is_active` (boolean)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
  
  ### 4. clients
  Client logos and information
  - `id` (uuid, primary key)
  - `name` (text) - Client name
  - `logo_url` (text) - Logo image URL
  - `sector` (text) - Business sector
  - `achievement` (text) - Achievement/milestone
  - `years_active` (text) - Years of collaboration
  - `description` (text) - Brief description
  - `order_index` (integer) - Display order
  - `is_active` (boolean)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
  
  ### 5. certifications
  Company certifications and accreditations
  - `id` (uuid, primary key)
  - `name` (text) - Certification name
  - `icon` (text) - Icon name
  - `color` (text) - Display color
  - `description` (text) - Description
  - `expiry_date` (date) - Expiration date (optional)
  - `document_url` (text) - Certificate document URL (optional)
  - `order_index` (integer) - Display order
  - `is_active` (boolean)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
  
  ### 6. faqs
  Frequently Asked Questions
  - `id` (uuid, primary key)
  - `category` (text) - FAQ category
  - `question` (text) - Question text
  - `answer` (text) - Answer text
  - `order_index` (integer) - Display order
  - `is_active` (boolean)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
  
  ### 7. email_settings
  Email configuration for forms
  - `id` (uuid, primary key)
  - `destination_email` (text) - Email to receive quotes
  - `reply_to_email` (text) - Email for automatic replies
  - `updated_at` (timestamp)

  ## Security
  
  All tables have RLS enabled with appropriate policies:
  - Public SELECT access for active content
  - Authenticated users (admins) can INSERT, UPDATE, DELETE
*/

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

ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view contact info"
  ON contact_info FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update contact info"
  ON contact_info FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert contact info"
  ON contact_info FOR INSERT
  TO authenticated
  WITH CHECK (true);

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

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

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

ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active stats"
  ON site_stats FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage stats"
  ON site_stats FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

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

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active clients"
  ON clients FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage clients"
  ON clients FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

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

ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active certifications"
  ON certifications FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage certifications"
  ON certifications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

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

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active faqs"
  ON faqs FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage faqs"
  ON faqs FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create email_settings table
CREATE TABLE IF NOT EXISTS email_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  destination_email text NOT NULL DEFAULT '',
  reply_to_email text NOT NULL DEFAULT '',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE email_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view email settings"
  ON email_settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update email settings"
  ON email_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert email settings"
  ON email_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_stats_order ON site_stats(order_index) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_clients_order ON clients(order_index) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_certifications_order ON certifications(order_index) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_faqs_category_order ON faqs(category, order_index) WHERE is_active = true;