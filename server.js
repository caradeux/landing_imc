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
    
    // Read the migration SQL file
    const fs = await import('fs');
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const migrationPath = path.join(__dirname, 'migrate-simple.sql');
    
    if (!fs.existsSync(migrationPath)) {
      return res.status(404).json({ error: 'Migration file not found' });
    }
    
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Execute the migration
    console.log('📊 Executing migration script...');
    await db.query(migrationSQL);
    
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

app.listen(port, () => {
  console.log(`Servidor API ejecutándose en http://localhost:${port}`);
});
