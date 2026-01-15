import React from 'react'
import { HelpCircle, AlertCircle } from 'lucide-react'

const FAQManager = () => {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#1e40af' }}>
            Preguntas Frecuentes (FAQ)
          </h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Gestiona las preguntas y respuestas frecuentes organizadas por categoría
          </p>
        </div>

        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#f9fafb',
          borderRadius: '8px',
          border: '2px dashed #e5e7eb'
        }}>
          <HelpCircle size={48} style={{ color: '#9ca3af', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
            Sección en Desarrollo
          </h3>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
            La funcionalidad de preguntas frecuentes estará disponible en una próxima actualización.
          </p>
          
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: '#fef3c7',
            color: '#92400e',
            border: '1px solid #fcd34d'
          }}>
            <AlertCircle size={20} />
            <span style={{ fontSize: '14px' }}>
              Funcionalidad pendiente de implementación
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQManager
