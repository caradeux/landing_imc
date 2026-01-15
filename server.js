import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { db } from './src/lib/database.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configurar transporter de nodemailer
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: 'mail.imcsonline.online',
    port: 465,
    secure: true,
    auth: {
      user: 'contacto@imcsonline.online',
      pass: 'Marcelo2025..'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Endpoint para enviar emails
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    // Validar campos requeridos
    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos' 
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Formato de email inválido' 
      });
    }

    // Crear el contenido del email
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
          Nuevo Mensaje de Contacto - IMC Servicios Chile
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Información del Cliente:</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
          <p><strong>Servicio de Interés:</strong> ${service}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Mensaje:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 0; color: #1976d2; font-size: 14px;">
            <strong>Fecha:</strong> ${new Date().toLocaleString('es-CL', { 
              timeZone: 'America/Santiago',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          Este mensaje fue enviado desde el formulario de contacto de IMC Servicios Chile SpA
        </p>
      </div>
    `;

    // Crear transporter
    const transporter = createTransporter();

    // Configurar opciones del email
    const mailOptions = {
      from: '"IMC Servicios Chile" <contacto@imcsonline.online>',
      to: 'contacto@imcsonline.online',
      subject: `Nuevo mensaje de contacto - ${name} (${service})`,
      html: emailContent,
      replyTo: email
    };

    // Enviar el email usando nodemailer
    const info = await transporter.sendMail(mailOptions);

    console.log('Email enviado exitosamente:', info.messageId);

    res.status(200).json({ 
      success: true, 
      message: 'Mensaje enviado correctamente',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Error al enviar email:', error);
    
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Endpoint para enviar cotizaciones desde el modal
app.post('/api/send-quote', async (req, res) => {
  try {
    const { 
      projectType, 
      services, 
      name, 
      email, 
      phone, 
      company, 
      location, 
      description 
    } = req.body;

    // Validar campos requeridos
    if (!name || !email || !phone || !location || !description || !projectType) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos' 
      });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Formato de email inválido' 
      });
    }

    // Crear el contenido del email para cotización
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
          Nueva Solicitud de Cotización - IMC Servicios Chile
        </h2>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Información del Cliente:</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
          <p><strong>Ubicación del Proyecto:</strong> ${location}</p>
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #dc2626; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Detalles del Proyecto:</h3>
          <p><strong>Tipo de Proyecto:</strong> ${projectType}</p>
          ${services && services.length > 0 ? `<p><strong>Servicios Solicitados:</strong> ${services.join(', ')}</p>` : ''}
        </div>
        
        <div style="background: #fff; padding: 20px; border-left: 4px solid #059669; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Descripción Detallada:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${description}</p>
        </div>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 0; color: #1976d2; font-size: 14px;">
            <strong>Fecha:</strong> ${new Date().toLocaleString('es-CL', { 
              timeZone: 'America/Santiago',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          Esta solicitud fue enviada desde el modal de cotización de IMC Servicios Chile SpA
        </p>
      </div>
    `;

    // Crear transporter
    const transporter = createTransporter();

    // Configurar opciones del email
    const mailOptions = {
      from: '"IMC Servicios Chile" <contacto@imcsonline.online>',
      to: 'contacto@imcsonline.online',
      subject: `Nueva solicitud de cotización - ${name} (${projectType})`,
      html: emailContent,
      replyTo: email
    };

    // Enviar el email usando nodemailer
    const info = await transporter.sendMail(mailOptions);

    console.log('Cotización enviada exitosamente:', info.messageId);

    res.status(200).json({ 
      success: true, 
      message: 'Solicitud de cotización enviada correctamente',
      messageId: info.messageId 
    });

  } catch (error) {
    console.error('Error al enviar cotización:', error);
    
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// =====================================================
// DATABASE API ENDPOINTS
// =====================================================

// Get all services
app.get('/api/services', async (req, res) => {
  try {
    const services = await db.getServices();
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Error fetching services' });
  }
});

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// Get projects by category
app.get('/api/projects/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const projects = await db.getProjectsByCategory(category);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    res.status(500).json({ error: 'Error fetching projects by category' });
  }
});

// Get all testimonials
app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await db.getTestimonials();
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Error fetching testimonials' });
  }
});

// Get all clients
app.get('/api/clients', async (req, res) => {
  try {
    const clients = await db.getClients();
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Error fetching clients' });
  }
});

// Get contact info
app.get('/api/contact-info', async (req, res) => {
  try {
    const contactInfo = await db.getContactInfo();
    res.json(contactInfo);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({ error: 'Error fetching contact info' });
  }
});

// Get site settings
app.get('/api/site-settings', async (req, res) => {
  try {
    const siteSettings = await db.getSiteSettings();
    res.json(siteSettings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    res.status(500).json({ error: 'Error fetching site settings' });
  }
});

// Get site stats
app.get('/api/site-stats', async (req, res) => {
  try {
    const siteStats = await db.getSiteStats();
    res.json(siteStats);
  } catch (error) {
    console.error('Error fetching site stats:', error);
    res.status(500).json({ error: 'Error fetching site stats' });
  }
});

// Get certifications
app.get('/api/certifications', async (req, res) => {
  try {
    const certifications = await db.getCertifications();
    res.json(certifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ error: 'Error fetching certifications' });
  }
});

// Get email settings
app.get('/api/email-settings', async (req, res) => {
  try {
    const emailSettings = await db.getEmailSettings();
    res.json(emailSettings);
  } catch (error) {
    console.error('Error fetching email settings:', error);
    res.status(500).json({ error: 'Error fetching email settings' });
  }
});

// Get site images
app.get('/api/site-images', async (req, res) => {
  try {
    const siteImages = await db.getSiteImages();
    res.json(siteImages);
  } catch (error) {
    console.error('Error fetching site images:', error);
    res.status(500).json({ error: 'Error fetching site images' });
  }
});

// Get site image by key
app.get('/api/site-images/:key', async (req, res) => {
  try {
    const { key } = req.params;
    const image = await db.getSiteImageByKey(key);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    console.error('Error fetching site image:', error);
    res.status(500).json({ error: 'Error fetching site image' });
  }
});

// Get active color scheme
app.get('/api/color-schemes/active', async (req, res) => {
  try {
    const colorScheme = await db.getActiveColorScheme();
    res.json(colorScheme);
  } catch (error) {
    console.error('Error fetching active color scheme:', error);
    res.status(500).json({ error: 'Error fetching active color scheme' });
  }
});

// Get all color schemes
app.get('/api/color-schemes', async (req, res) => {
  try {
    const colorSchemes = await db.getColorSchemes();
    res.json(colorSchemes);
  } catch (error) {
    console.error('Error fetching color schemes:', error);
    res.status(500).json({ error: 'Error fetching color schemes' });
  }
});

// =====================================================
// ADMIN API ENDPOINTS (for CMS functionality)
// =====================================================

// Create service
app.post('/api/admin/services', async (req, res) => {
  try {
    const service = await db.createService(req.body);
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Error creating service' });
  }
});

// Update service
app.put('/api/admin/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await db.updateService(id, req.body);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Error updating service' });
  }
});

// Delete service
app.delete('/api/admin/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = await db.deleteService(id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Error deleting service' });
  }
});

// Create project
app.post('/api/admin/projects', async (req, res) => {
  try {
    const project = await db.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Error creating project' });
  }
});

// Update project
app.put('/api/admin/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await db.updateProject(id, req.body);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Error updating project' });
  }
});

// Delete project
app.delete('/api/admin/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await db.deleteProject(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Error deleting project' });
  }
});

// Update site settings
app.put('/api/admin/site-settings', async (req, res) => {
  try {
    const settings = await db.updateSiteSettings(req.body);
    res.json(settings);
  } catch (error) {
    console.error('Error updating site settings:', error);
    res.status(500).json({ error: 'Error updating site settings' });
  }
});

// Update contact info
app.put('/api/admin/contact-info', async (req, res) => {
  try {
    const contactInfo = await db.updateContactInfo(req.body);
    res.json(contactInfo);
  } catch (error) {
    console.error('Error updating contact info:', error);
    res.status(500).json({ error: 'Error updating contact info' });
  }
});

// Set active color scheme
app.put('/api/admin/color-schemes/:id/activate', async (req, res) => {
  try {
    const { id } = req.params;
    const colorScheme = await db.setActiveColorScheme(id);
    if (!colorScheme) {
      return res.status(404).json({ error: 'Color scheme not found' });
    }
    res.json(colorScheme);
  } catch (error) {
    console.error('Error activating color scheme:', error);
    res.status(500).json({ error: 'Error activating color scheme' });
  }
});

// =====================================================
// DATABASE MIGRATION ENDPOINT
// =====================================================

app.post('/api/admin/migrate', async (req, res) => {
  try {
    console.log('🚀 Starting database migration...');
    
    // Execute migration step by step to avoid syntax issues
    const migrationSteps = [
      // Create extensions
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
      'CREATE EXTENSION IF NOT EXISTS "pgcrypto";',
      
      // Create services table
      `CREATE TABLE IF NOT EXISTS services (
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
      );`,
      
      // Create projects table
      `CREATE TABLE IF NOT EXISTS projects (
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
      );`,
      
      // Create testimonials table
      `CREATE TABLE IF NOT EXISTS testimonials (
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
      );`,
      
      // Create clients table
      `CREATE TABLE IF NOT EXISTS clients (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        logo_url text NOT NULL,
        website_url text,
        order_index integer NOT NULL DEFAULT 0,
        is_active boolean NOT NULL DEFAULT true,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );`,
      
      // Create contact_info table
      `CREATE TABLE IF NOT EXISTS contact_info (
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
      );`,
      
      // Create site_settings table
      `CREATE TABLE IF NOT EXISTS site_settings (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        hero_title text NOT NULL,
        hero_subtitle text NOT NULL,
        cta_primary_text text NOT NULL,
        cta_secondary_text text NOT NULL,
        company_description text NOT NULL,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );`,
      
      // Create site_stats table
      `CREATE TABLE IF NOT EXISTS site_stats (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        label text NOT NULL,
        value text NOT NULL,
        icon text NOT NULL,
        order_index integer NOT NULL DEFAULT 0,
        is_active boolean NOT NULL DEFAULT true,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );`,
      
      // Create certifications table
      `CREATE TABLE IF NOT EXISTS certifications (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        issuer text NOT NULL,
        logo_url text NOT NULL,
        order_index integer NOT NULL DEFAULT 0,
        is_active boolean NOT NULL DEFAULT true,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );`,
      
      // Create email_settings table
      `CREATE TABLE IF NOT EXISTS email_settings (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        smtp_host text NOT NULL,
        smtp_port integer NOT NULL,
        smtp_user text NOT NULL,
        smtp_password text NOT NULL,
        from_email text NOT NULL,
        from_name text NOT NULL,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );`,
      
      // Create site_images table
      `CREATE TABLE IF NOT EXISTS site_images (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        key text NOT NULL UNIQUE,
        url text NOT NULL,
        alt_text text,
        order_index integer NOT NULL DEFAULT 0,
        is_active boolean NOT NULL DEFAULT true,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      );`,
      
      // Create color_schemes table
      `CREATE TABLE IF NOT EXISTS color_schemes (
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
      );`
    ];
    
    // Execute each step
    for (let i = 0; i < migrationSteps.length; i++) {
      console.log(`📊 Executing step ${i + 1}/${migrationSteps.length}...`);
      await db.query(migrationSteps[i]);
    }
    
    console.log('✅ Tables created successfully!');
    
    // Now insert the data (we'll do this in a separate step)
    console.log('📊 Inserting data...');
    
    // Clear existing data first
    const clearQueries = [
      'DELETE FROM services;',
      'DELETE FROM projects;',
      'DELETE FROM testimonials;',
      'DELETE FROM clients;',
      'DELETE FROM contact_info;',
      'DELETE FROM site_settings;',
      'DELETE FROM site_stats;',
      'DELETE FROM certifications;',
      'DELETE FROM email_settings;',
      'DELETE FROM site_images;',
      'DELETE FROM color_schemes;'
    ];
    
    for (const query of clearQueries) {
      await db.query(query);
    }
    
    console.log('🗑️ Existing data cleared');
    
    // Insert services data
    const servicesData = [
      {
        title: 'Servicios Eléctricos',
        description: 'Instalaciones eléctricas industriales y comerciales con certificación SEC. Especialistas en sistemas de alta y baja tensión.',
        icon: 'Zap',
        image_url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        color: '#1e40af',
        features: JSON.stringify(["Instalaciones eléctricas industriales","Sistemas de iluminación LED","Tableros eléctricos certificados","Mantención preventiva","Certificación SEC","Sistemas de emergencia"]),
        display_order: 1
      },
      {
        title: 'Obras Civiles',
        description: 'Construcción y remodelación de espacios comerciales e industriales. Especialistas en retail y centros logísticos.',
        icon: 'Hammer',
        image_url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        color: '#059669',
        features: JSON.stringify(["Construcción de bodegas industriales","Remodelación de tiendas retail","Fundaciones especializadas","Pavimentación industrial","Estructuras de hormigón","Obras de ampliación"]),
        display_order: 2
      },
      {
        title: 'Carpintería Especializada',
        description: 'Carpintería en metalcom y madera para proyectos comerciales. Mobiliario y estructuras personalizadas.',
        icon: 'Wrench',
        image_url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        color: '#dc2626',
        features: JSON.stringify(["Carpintería en metalcom","Mobiliario comercial","Estructuras de madera","Divisiones modulares","Muebles a medida","Instalación de estanterías"]),
        display_order: 3
      },
      {
        title: 'Estructuras Metálicas',
        description: 'Diseño, fabricación e instalación de estructuras metálicas para uso industrial y comercial.',
        icon: 'Home',
        image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        color: '#ea580c',
        features: JSON.stringify(["Estructuras industriales","Techumbres metálicas","Escaleras y pasarelas","Galpones industriales","Estructuras antisísmicas","Soldadura certificada"]),
        display_order: 4
      },
      {
        title: 'Acabados Premium',
        description: 'Acabados de alta calidad para espacios comerciales y corporativos. Pintura, revestimientos y detalles arquitectónicos.',
        icon: 'Palette',
        image_url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        color: '#7c3aed',
        features: JSON.stringify(["Pintura industrial y decorativa","Revestimientos especializados","Cielos falsos","Pisos industriales","Señalética corporativa","Acabados arquitectónicos"]),
        display_order: 5
      },
      {
        title: 'Automatización',
        description: 'Sistemas de automatización y control para procesos industriales y comerciales.',
        icon: 'Shield',
        image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        color: '#0284c7',
        features: JSON.stringify(["Sistemas de control automatizado","Sensores industriales","Programación PLC","Monitoreo remoto","Integración de sistemas","Mantenimiento predictivo"]),
        display_order: 6
      }
    ];
    
    for (const service of servicesData) {
      await db.query(
        `INSERT INTO services (title, description, icon, image_url, color, features, display_order, active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, true, now(), now())`,
        [service.title, service.description, service.icon, service.image_url, service.color, service.features, service.display_order]
      );
    }
    
    console.log('✅ Sample data inserted successfully!');
    
    // Insert additional data
    console.log('📊 Inserting additional data...');
    
    // Insert site settings
    await db.query(
      `INSERT INTO site_settings (hero_title, hero_subtitle, cta_primary_text, cta_secondary_text, company_description, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, now(), now())`,
      [
        'Líderes en Construcción y Servicios Especializados',
        'Más de 15 años transformando espacios retail, industriales y comerciales con la más alta calidad y profesionalismo.',
        'Cotizar Proyecto',
        'Ver Servicios',
        'En IMC Servicios Chile SpA, nos especializamos en brindar soluciones integrales de construcción y servicios especializados para los sectores retail, industrial y comercial. Con más de 15 años de experiencia, hemos consolidado nuestra posición como líderes en el mercado chileno.'
      ]
    );
    
    // Insert contact info
    await db.query(
      `INSERT INTO contact_info (phone, email, address, schedule, whatsapp, instagram_url, facebook_url, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now())`,
      [
        '+56 9 8854 2926',
        'contacto@imcsonline.online',
        'Quillota 801, Viña del Mar, Chile',
        'Lun-Vie: 8:00-18:00 | Emergencias 24/7',
        'https://wa.me/56988542926',
        'https://instagram.com/imcservicioschile',
        'https://facebook.com/imcservicioschile'
      ]
    );
    
    // Insert active color scheme
    await db.query(
      `INSERT INTO color_schemes (name, is_active, primary_color, secondary_color, accent_color, background_color, text_color, text_light_color, border_color, success_color, warning_color, error_color, overlay_color, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, now(), now())`,
      [
        'Azul Profesional',
        true,
        '#1e40af',
        '#3b82f6',
        '#667eea',
        '#ffffff',
        '#333333',
        '#666666',
        '#e1e5e9',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        'rgba(0, 0, 0, 0.5)'
      ]
    );
    
    console.log('✅ Additional data inserted successfully!');
    
    // Verify the migration
    const verificationQuery = `
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
    `;
    
    const verification = await db.query(verificationQuery);
    
    console.log('✅ Migration completed successfully!');
    console.log('📋 Migration results:', verification.rows);
    
    res.json({
      success: true,
      message: 'Database migration completed successfully',
      results: verification.rows
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    res.status(500).json({ 
      error: 'Migration failed', 
      details: error.message 
    });
  }
});

// Test endpoint to check migration file content
app.get('/api/admin/test-migration', async (req, res) => {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const migrationPath = path.join(__dirname, 'migrate-simple.sql');
    
    if (!fs.existsSync(migrationPath)) {
      return res.status(404).json({ error: 'Migration file not found', path: migrationPath });
    }
    
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    const preview = migrationSQL.substring(0, 500) + '...';
    
    res.json({
      success: true,
      path: migrationPath,
      fileExists: true,
      fileSize: migrationSQL.length,
      preview: preview
    });
    
  } catch (error) {
    res.status(500).json({ 
      error: 'Test failed', 
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor API ejecutándose en http://localhost:${port}`);
});
