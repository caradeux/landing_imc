import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

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

app.listen(port, () => {
  console.log(`Servidor API ejecutándose en http://localhost:${port}`);
});
