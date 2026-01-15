// API client to replace Supabase calls with PostgreSQL API endpoints

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // GET requests
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  // POST requests
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: data,
    });
  }

  // PUT requests
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data,
    });
  }

  // DELETE requests
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  // =====================================================
  // PUBLIC API METHODS (equivalent to Supabase queries)
  // =====================================================

  // Services
  async getServices() {
    return this.get('/services');
  }

  // Projects
  async getProjects() {
    return this.get('/projects');
  }

  async getProjectsByCategory(category) {
    return this.get(`/projects/category/${category}`);
  }

  // Testimonials
  async getTestimonials() {
    return this.get('/testimonials');
  }

  // Clients
  async getClients() {
    return this.get('/clients');
  }

  // Contact Info
  async getContactInfo() {
    return this.get('/contact-info');
  }

  // Site Settings
  async getSiteSettings() {
    return this.get('/site-settings');
  }

  // Site Stats
  async getSiteStats() {
    return this.get('/site-stats');
  }

  // Certifications
  async getCertifications() {
    return this.get('/certifications');
  }

  // Email Settings
  async getEmailSettings() {
    return this.get('/email-settings');
  }

  // Site Images
  async getSiteImages() {
    return this.get('/site-images');
  }

  async getSiteImageByKey(key) {
    return this.get(`/site-images/${key}`);
  }

  // Color Schemes
  async getColorSchemes() {
    return this.get('/color-schemes');
  }

  async getActiveColorScheme() {
    return this.get('/color-schemes/active');
  }

  // =====================================================
  // ADMIN API METHODS (for CMS functionality)
  // =====================================================

  // Services Admin
  async createService(serviceData) {
    return this.post('/admin/services', serviceData);
  }

  async updateService(id, serviceData) {
    return this.put(`/admin/services/${id}`, serviceData);
  }

  async deleteService(id) {
    return this.delete(`/admin/services/${id}`);
  }

  // Projects Admin
  async createProject(projectData) {
    return this.post('/admin/projects', projectData);
  }

  async updateProject(id, projectData) {
    return this.put(`/admin/projects/${id}`, projectData);
  }

  async deleteProject(id) {
    return this.delete(`/admin/projects/${id}`);
  }

  // Site Settings Admin
  async updateSiteSettings(settingsData) {
    return this.put('/admin/site-settings', settingsData);
  }

  // Contact Info Admin
  async updateContactInfo(contactData) {
    return this.put('/admin/contact-info', contactData);
  }

  // Color Schemes Admin
  async activateColorScheme(id) {
    return this.put(`/admin/color-schemes/${id}/activate`);
  }

  // Testimonials Admin
  async createTestimonial(testimonialData) {
    return this.post('/admin/testimonials', testimonialData);
  }

  async updateTestimonial(id, testimonialData) {
    return this.put(`/admin/testimonials/${id}`, testimonialData);
  }

  async deleteTestimonial(id) {
    return this.delete(`/admin/testimonials/${id}`);
  }

  // =====================================================
  // SUPABASE COMPATIBILITY LAYER
  // =====================================================
  
  // This provides a Supabase-like interface for easier migration
  from(table) {
    return {
      select: (columns = '*') => ({
        eq: (column, value) => this.getFilteredData(table, { [column]: value }),
        order: (column, options = {}) => this.getOrderedData(table, column, options),
        limit: (count) => this.getLimitedData(table, count),
        single: () => this.getSingleRecord(table),
      }),
      insert: (data) => this.insertData(table, data),
      update: (data) => ({
        eq: (column, value) => this.updateData(table, data, { [column]: value }),
      }),
      delete: () => ({
        eq: (column, value) => this.deleteData(table, { [column]: value }),
      }),
    };
  }

  // Helper methods for Supabase compatibility
  async getFilteredData(table, filters) {
    const endpoint = this.getTableEndpoint(table);
    const data = await this.get(endpoint);
    
    // Apply filters client-side (for simple cases)
    return data.filter(item => {
      return Object.entries(filters).every(([key, value]) => item[key] === value);
    });
  }

  async getOrderedData(table, column, options = {}) {
    const endpoint = this.getTableEndpoint(table);
    const data = await this.get(endpoint);
    
    // Apply ordering client-side
    return data.sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];
      
      if (options.ascending === false) {
        return bVal > aVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });
  }

  async getLimitedData(table, count) {
    const endpoint = this.getTableEndpoint(table);
    const data = await this.get(endpoint);
    return data.slice(0, count);
  }

  async getSingleRecord(table) {
    const endpoint = this.getTableEndpoint(table);
    const data = await this.get(endpoint);
    return data[0] || null;
  }

  async insertData(table, data) {
    const endpoint = this.getAdminTableEndpoint(table);
    return this.post(endpoint, data);
  }

  async updateData(table, data, filters) {
    // This is a simplified implementation
    // In a real scenario, you'd need to identify the record first
    console.warn('Update with filters not fully implemented in compatibility layer');
    return { data, error: null };
  }

  async deleteData(table, filters) {
    // This is a simplified implementation
    console.warn('Delete with filters not fully implemented in compatibility layer');
    return { data: null, error: null };
  }

  getTableEndpoint(table) {
    const endpoints = {
      services: '/services',
      projects: '/projects',
      testimonials: '/testimonials',
      clients: '/clients',
      contact_info: '/contact-info',
      site_settings: '/site-settings',
      site_stats: '/site-stats',
      certifications: '/certifications',
      email_settings: '/email-settings',
      site_images: '/site-images',
      color_schemes: '/color-schemes',
    };
    
    return endpoints[table] || `/${table}`;
  }

  getAdminTableEndpoint(table) {
    const endpoints = {
      services: '/admin/services',
      projects: '/admin/projects',
      testimonials: '/admin/testimonials',
      clients: '/admin/clients',
      contact_info: '/admin/contact-info',
      site_settings: '/admin/site-settings',
      site_stats: '/admin/site-stats',
      certifications: '/admin/certifications',
      email_settings: '/admin/email-settings',
      site_images: '/admin/site-images',
      color_schemes: '/admin/color-schemes',
    };
    
    return endpoints[table] || `/admin/${table}`;
  }
}

// Create and export a singleton instance
export const api = new ApiClient();

// Export individual methods for convenience
export const {
  getServices,
  getProjects,
  getProjectsByCategory,
  getTestimonials,
  getClients,
  getContactInfo,
  getSiteSettings,
  getSiteStats,
  getCertifications,
  getEmailSettings,
  getSiteImages,
  getSiteImageByKey,
  getColorSchemes,
  getActiveColorScheme,
  createService,
  updateService,
  deleteService,
  createProject,
  updateProject,
  deleteProject,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updateSiteSettings,
  updateContactInfo,
  activateColorScheme,
} = api;

// Export the from method for Supabase compatibility
export const supabase = {
  from: (table) => api.from(table),
};

export default api;