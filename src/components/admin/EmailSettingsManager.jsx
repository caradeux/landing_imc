import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Mail, Save, AlertCircle } from 'lucide-react'

const EmailSettingsManager = () => {
  const [settings, setSettings] = useState({
    destination_email: '',
    reply_to_email: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('email_settings')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (error) throw error

      if (data) {
        setSettings(data)
      }
    } catch (error) {
      console.error('Error loading email settings:', error)
      setMessage({ type: 'error', text: 'Error al cargar la configuración de email' })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const { data: existing } = await supabase
        .from('email_settings')
        .select('id')
        .limit(1)
        .maybeSingle()

      if (existing) {
        const { error } = await supabase
          .from('email_settings')
          .update({ ...settings, updated_at: new Date().toISOString() })
          .eq('id', existing.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('email_settings')
          .insert([settings])

        if (error) throw error
      }

      setMessage({ type: 'success', text: 'Configuración de email actualizada correctamente' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error saving email settings:', error)
      setMessage({ type: 'error', text: 'Error al guardar la configuración' })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #1e40af',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }} />
      </div>
    )
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '800px'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#1e40af' }}>
            Configuración de Email
          </h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Gestiona los emails para el formulario de contacto y cotizaciones
          </p>
        </div>

        {message.text && (
          <div style={{
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: message.type === 'success' ? '#dcfce7' : '#fee2e2',
            color: message.type === 'success' ? '#166534' : '#991b1b',
            border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`
          }}>
            <AlertCircle size={20} />
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: '25px' }}>
            <div style={{
              background: '#f0f9ff',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #bfdbfe'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '15px',
                color: '#1e40af',
                fontWeight: '600'
              }}>
                <Mail size={20} />
                <span>Email de Destino para Cotizaciones</span>
              </div>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px', lineHeight: '1.6' }}>
                Este es el email donde se recibirán todas las solicitudes de cotización y mensajes del formulario de contacto del sitio web.
              </p>
              <input
                type="email"
                value={settings.destination_email}
                onChange={(e) => handleChange('destination_email', e.target.value)}
                placeholder="cotizaciones@empresa.cl"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'white'
                }}
                required
              />
            </div>

            <div style={{
              background: '#f0fdf4',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #bbf7d0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '15px',
                color: '#059669',
                fontWeight: '600'
              }}>
                <Mail size={20} />
                <span>Email de Respuesta Automática</span>
              </div>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px', lineHeight: '1.6' }}>
                Este email aparecerá como remitente en las respuestas automáticas a los clientes que envían el formulario. Asegúrate de que sea un email válido y monitoreado.
              </p>
              <input
                type="email"
                value={settings.reply_to_email}
                onChange={(e) => handleChange('reply_to_email', e.target.value)}
                placeholder="no-reply@empresa.cl"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: 'white'
                }}
                required
              />
            </div>

            <div style={{
              background: '#fef3c7',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #fbbf24',
              fontSize: '13px',
              color: '#92400e',
              lineHeight: '1.6'
            }}>
              <strong>Nota importante:</strong> Los emails configurados aquí deben ser válidos y estar activos. Asegúrate de revisar regularmente la bandeja de entrada del email de destino para no perder solicitudes de clientes.
            </div>
          </div>

          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: saving ? '#9ca3af' : 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Save size={18} />
              {saving ? 'Guardando...' : 'Guardar Configuración'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailSettingsManager
