import pkg from 'pg';
const { Pool } = pkg;

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'cs48k4wskco0swgwwsg4s8sk',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'sitio_imc_production',
  user: process.env.DB_USER || 'sitio_imc_user',
  password: process.env.DB_PASSWORD || 'SitioIMC_DB_P@ssw0rd_2026_Secure!',
  ssl: false, // Internal Docker network doesn't need SSL
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Create connection pool
const pool = new Pool(dbConfig);

// Test connection on startup
pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL connection error:', err);
});

// Database query helper functions
export const db = {
  // Execute a query
  async query(text, params) {
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  },

  // Get all services
  async getServices() {
    const result = await this.query(
      'SELECT * FROM services WHERE active = true ORDER BY display_order ASC'
    );
    return result.rows;
  },

  // Get all projects
  async getProjects() {
    const result = await this.query(
      'SELECT * FROM projects WHERE active = true ORDER BY display_order ASC'
    );
    return result.rows;
  },

  // Get projects by category
  async getProjectsByCategory(category) {
    const result = await this.query(
      'SELECT * FROM projects WHERE active = true AND category = $1 ORDER BY display_order ASC',
      [category]
    );
    return result.rows;
  },

  // Get all testimonials
  async getTestimonials() {
    const result = await this.query(
      'SELECT * FROM testimonials WHERE active = true ORDER BY display_order ASC'
    );
    return result.rows;
  },

  // Get all clients
  async getClients() {
    const result = await this.query(
      'SELECT * FROM clients WHERE is_active = true ORDER BY order_index ASC'
    );
    return result.rows;
  },

  // Get contact info
  async getContactInfo() {
    const result = await this.query('SELECT * FROM contact_info LIMIT 1');
    return result.rows[0];
  },

  // Get site settings
  async getSiteSettings() {
    const result = await this.query('SELECT * FROM site_settings LIMIT 1');
    return result.rows[0];
  },

  // Get site stats
  async getSiteStats() {
    const result = await this.query(
      'SELECT * FROM site_stats WHERE is_active = true ORDER BY order_index ASC'
    );
    return result.rows;
  },

  // Get certifications
  async getCertifications() {
    const result = await this.query(
      'SELECT * FROM certifications WHERE is_active = true ORDER BY order_index ASC'
    );
    return result.rows;
  },

  // Get email settings
  async getEmailSettings() {
    const result = await this.query('SELECT * FROM email_settings LIMIT 1');
    return result.rows[0];
  },

  // Get site images
  async getSiteImages() {
    const result = await this.query(
      'SELECT * FROM site_images WHERE is_active = true ORDER BY order_index ASC'
    );
    return result.rows;
  },

  // Get site image by key
  async getSiteImageByKey(key) {
    const result = await this.query(
      'SELECT * FROM site_images WHERE key = $1 AND is_active = true LIMIT 1',
      [key]
    );
    return result.rows[0];
  },

  // Get active color scheme
  async getActiveColorScheme() {
    const result = await this.query(
      'SELECT * FROM color_schemes WHERE is_active = true LIMIT 1'
    );
    return result.rows[0];
  },

  // Get all color schemes
  async getColorSchemes() {
    const result = await this.query(
      'SELECT * FROM color_schemes ORDER BY created_at ASC'
    );
    return result.rows;
  },

  // Admin functions (for authenticated users)
  
  // Create service
  async createService(serviceData) {
    const { title, description, icon, image_url, color, features, display_order } = serviceData;
    const result = await this.query(
      `INSERT INTO services (title, description, icon, image_url, color, features, display_order) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, icon, image_url, color, JSON.stringify(features), display_order]
    );
    return result.rows[0];
  },

  // Update service
  async updateService(id, serviceData) {
    const { title, description, icon, image_url, color, features, display_order, active } = serviceData;
    const result = await this.query(
      `UPDATE services 
       SET title = $2, description = $3, icon = $4, image_url = $5, color = $6, 
           features = $7, display_order = $8, active = $9, updated_at = now()
       WHERE id = $1 RETURNING *`,
      [id, title, description, icon, image_url, color, JSON.stringify(features), display_order, active]
    );
    return result.rows[0];
  },

  // Delete service
  async deleteService(id) {
    const result = await this.query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  // Create project
  async createProject(projectData) {
    const { title, description, category, year, area, duration, location, image_url, services, highlights, display_order } = projectData;
    const result = await this.query(
      `INSERT INTO projects (title, description, category, year, area, duration, location, image_url, services, highlights, display_order) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [title, description, category, year, area, duration, location, image_url, JSON.stringify(services), JSON.stringify(highlights), display_order]
    );
    return result.rows[0];
  },

  // Update project
  async updateProject(id, projectData) {
    const { title, description, category, year, area, duration, location, image_url, services, highlights, display_order, active } = projectData;
    const result = await this.query(
      `UPDATE projects 
       SET title = $2, description = $3, category = $4, year = $5, area = $6, duration = $7, 
           location = $8, image_url = $9, services = $10, highlights = $11, display_order = $12, 
           active = $13, updated_at = now()
       WHERE id = $1 RETURNING *`,
      [id, title, description, category, year, area, duration, location, image_url, JSON.stringify(services), JSON.stringify(highlights), display_order, active]
    );
    return result.rows[0];
  },

  // Delete project
  async deleteProject(id) {
    const result = await this.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  // Update site settings
  async updateSiteSettings(settingsData) {
    const { hero_title, hero_subtitle, cta_primary_text, cta_secondary_text, company_description } = settingsData;
    const result = await this.query(
      `UPDATE site_settings 
       SET hero_title = $1, hero_subtitle = $2, cta_primary_text = $3, 
           cta_secondary_text = $4, company_description = $5, updated_at = now()
       WHERE id = (SELECT id FROM site_settings LIMIT 1) RETURNING *`,
      [hero_title, hero_subtitle, cta_primary_text, cta_secondary_text, company_description]
    );
    return result.rows[0];
  },

  // Update contact info
  async updateContactInfo(contactData) {
    const { phone, email, address, schedule, whatsapp, instagram_url, facebook_url } = contactData;
    const result = await this.query(
      `UPDATE contact_info 
       SET phone = $1, email = $2, address = $3, schedule = $4, 
           whatsapp = $5, instagram_url = $6, facebook_url = $7, updated_at = now()
       WHERE id = (SELECT id FROM contact_info LIMIT 1) RETURNING *`,
      [phone, email, address, schedule, whatsapp, instagram_url, facebook_url]
    );
    return result.rows[0];
  },

  // Update email settings
  async updateEmailSettings(settingsData) {
    const { smtp_host, smtp_port, smtp_user, smtp_password, from_email, from_name } = settingsData;
    const result = await this.query(
      `UPDATE email_settings 
       SET smtp_host = $1, smtp_port = $2, smtp_user = $3, smtp_password = $4, 
           from_email = $5, from_name = $6, updated_at = now()
       WHERE id = (SELECT id FROM email_settings LIMIT 1) RETURNING *`,
      [smtp_host, smtp_port, smtp_user, smtp_password, from_email, from_name]
    );
    return result.rows[0];
  },

  // Set active color scheme
  async setActiveColorScheme(schemeId) {
    // First deactivate all schemes
    await this.query('UPDATE color_schemes SET is_active = false');
    // Then activate the selected one
    const result = await this.query(
      'UPDATE color_schemes SET is_active = true WHERE id = $1 RETURNING *',
      [schemeId]
    );
    return result.rows[0];
  },

  // Create testimonial
  async createTestimonial(testimonialData) {
    const { client_name, client_company, client_position, client_photo_url, content, rating, project_name, display_order } = testimonialData;
    const result = await this.query(
      `INSERT INTO testimonials (client_name, client_company, client_position, client_photo_url, testimonial_text, rating, project_name, display_order) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [client_name, client_company, client_position, client_photo_url, content, rating, project_name, display_order]
    );
    return result.rows[0];
  },

  // Update testimonial
  async updateTestimonial(id, testimonialData) {
    const { client_name, client_company, client_position, client_photo_url, content, rating, project_name, display_order, active } = testimonialData;
    const result = await this.query(
      `UPDATE testimonials 
       SET client_name = $2, client_company = $3, client_position = $4, client_photo_url = $5, 
           testimonial_text = $6, rating = $7, project_name = $8, display_order = $9, 
           active = $10, updated_at = now()
       WHERE id = $1 RETURNING *`,
      [id, client_name, client_company, client_position, client_photo_url, content, rating, project_name, display_order, active]
    );
    return result.rows[0];
  },

  // Delete testimonial
  async deleteTestimonial(id) {
    const result = await this.query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  // Create site stat
  async createSiteStat(statData) {
    const { label, value, icon, order_index } = statData;
    const result = await this.query(
      `INSERT INTO site_stats (label, value, icon, order_index, is_active) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [label, value, icon, order_index, true]
    );
    return result.rows[0];
  },

  // Update site stat
  async updateSiteStat(id, statData) {
    const { label, value, icon, order_index, is_active } = statData;
    const result = await this.query(
      `UPDATE site_stats 
       SET label = $2, value = $3, icon = $4, order_index = $5, is_active = $6, updated_at = now()
       WHERE id = $1 RETURNING *`,
      [id, label, value, icon, order_index, is_active]
    );
    return result.rows[0];
  },

  // Delete site stat
  async deleteSiteStat(id) {
    const result = await this.query('DELETE FROM site_stats WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  },

  // Create certification
  async createCertification(certData) {
    const { name, issuer, logo_url, order_index } = certData;
    const result = await this.query(
      `INSERT INTO certifications (name, issuer, logo_url, order_index, is_active) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, issuer, logo_url, order_index, true]
    );
    return result.rows[0];
  },

  // Update certification
  async updateCertification(id, certData) {
    const { name, issuer, logo_url, order_index, is_active } = certData;
    const result = await this.query(
      `UPDATE certifications 
       SET name = $2, issuer = $3, logo_url = $4, order_index = $5, is_active = $6, updated_at = now()
       WHERE id = $1 RETURNING *`,
      [id, name, issuer, logo_url, order_index, is_active]
    );
    return result.rows[0];
  },

  // Delete certification
  async deleteCertification(id) {
    const result = await this.query('DELETE FROM certifications WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

// Test database connection on module load
(async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('🟢 Database connection pool initialized successfully');
console.log('📊 Server endpoints loaded successfully');
  } catch (error) {
    console.error('🔴 Failed to initialize database connection:', error.message);
  }
})();

export default db;