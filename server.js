import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Enviar el email usando Resend
    const data = await resend.emails.send({
      from: `IMC Servicios Chile <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: ['vtc.chile@gmail.com'],
      subject: `Nuevo mensaje de contacto - ${name} (${service})`,
      html: emailContent,
      replyTo: email
    });

    console.log('Email enviado exitosamente:', data);

    res.status(200).json({ 
      success: true, 
      message: 'Mensaje enviado correctamente',
      id: data.id 
    });

  } catch (error) {
    console.error('Error al enviar email:', error);
    
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
