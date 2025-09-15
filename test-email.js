// Script de prueba para el endpoint de email
import fetch from 'node-fetch';

const testEmail = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test Usuario',
        email: 'test@example.com',
        phone: '+56 9 1234 5678',
        company: 'Empresa Test',
        service: 'Servicios Eléctricos',
        message: 'Este es un mensaje de prueba para verificar que el sistema de correos funciona correctamente.'
      })
    });

    const result = await response.json();
    console.log('Respuesta del servidor:', result);
    
    if (response.ok) {
      console.log('✅ Email enviado exitosamente');
    } else {
      console.log('❌ Error al enviar email:', result.error);
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
  }
};

// Ejecutar la prueba
testEmail();
