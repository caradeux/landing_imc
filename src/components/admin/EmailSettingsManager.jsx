import React, { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import { Mail, Save, AlertCircle } from 'lucide-react'

const EmailSettingsManager = () => {
  const [settings, setSettings] = useState({
    smtp_host: '',
    smtp_port: 465,
    smtp_user: '',
    smtp_password: '',
    from_email: '',
    from_name: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const data = await api.getEmailSettings()
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
      await api.updateEmailSettings(settings)
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
                <span>Configuración SMTP</span>
              </div>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '600' }}>
                      Servidor SMTP
                    </label>
                    <input
                      type="text"
                      value={settings.smtp_host}
                      onChange={(e) => handleChange('smtp_host', e.target.value)}
                      placeholder="mail.empresa.cl"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '600' }}>
                      Puerto
                    </label>
                    <input
                      type="number"
                      value={settings.smtp_port}
                      onChange={(e) => handleChange('smtp_port', parseInt(e.target.value))}
                      placeholder="465"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      required
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '600' }}>
                      Usuario SMTP
                    </label>
                    <input
                      type="email"
                      value={settings.smtp_user}
                      onChange={(e) => handleChange('smtp_user', e.target.value)}
                      placeholder="contacto@empresa.cl"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '600' }}>
                      Contraseña SMTP
                    </label>
                    <input
                      type="password"
                      value={settings.smtp_password}
                      onChange={(e) => handleChange('smtp_password', e.target.value)}
                      placeholder="••••••••"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px'
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
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
                <span>Información del Remitente</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '600' }}>
                    Email del Remitente
                  </label>
                  <input
                    type="email"
                    value={settings.from_email}
                    onChange={(e) => handleChange('from_email', e.target.value)}
                    placeholder="contacto@empresa.cl"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '600' }}>
                    Nombre del Remitente
                  </label>
                  <input
                    type="text"
                    value={settings.from_name}
                    onChange={(e) => handleChange('from_name', e.target.value)}
                    placeholder="IMC Servicios Chile"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                    required
                  />
                </div>
              </div>
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
              <strong>Nota importante:</strong> Esta configuración se usa para enviar emails desde el formulario de contacto. Asegúrate de que los datos SMTP sean correctos y que el servidor de email esté configurado para permitir el envío.
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
