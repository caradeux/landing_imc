import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Settings, Save, AlertCircle, Type, FileText } from 'lucide-react'

const SiteSettingsManager = () => {
  const [settings, setSettings] = useState({
    hero_title: '',
    hero_subtitle: '',
    cta_primary_text: '',
    cta_secondary_text: '',
    company_description: ''
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
        .from('site_settings')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (error) throw error

      if (data) {
        setSettings(data)
      }
    } catch (error) {
      console.error('Error loading settings:', error)
      setMessage({ type: 'error', text: 'Error al cargar la configuración' })
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
        .from('site_settings')
        .select('id')
        .limit(1)
        .maybeSingle()

      if (existing) {
        const { error } = await supabase
          .from('site_settings')
          .update({ ...settings, updated_at: new Date().toISOString() })
          .eq('id', existing.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert([settings])

        if (error) throw error
      }

      setMessage({ type: 'success', text: 'Configuración actualizada correctamente' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
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
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#1e40af' }}>
            Configuración del Sitio
          </h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Gestiona los textos principales y mensajes del sitio web
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
              background: '#f9fafb',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#1e40af' }}>
                Sección Hero (Banner Principal)
              </h3>

              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    <Type size={18} />
                    Título Principal
                  </label>
                  <input
                    type="text"
                    value={settings.hero_title}
                    onChange={(e) => handleChange('hero_title', e.target.value)}
                    placeholder="Título del banner principal"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    <FileText size={18} />
                    Subtítulo / Descripción
                  </label>
                  <textarea
                    value={settings.hero_subtitle}
                    onChange={(e) => handleChange('hero_subtitle', e.target.value)}
                    placeholder="Descripción breve que aparece bajo el título"
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={{
              background: '#f9fafb',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#1e40af' }}>
                Botones de Acción (CTAs)
              </h3>

              <div style={{ display: 'grid', gap: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Texto Botón Primario
                  </label>
                  <input
                    type="text"
                    value={settings.cta_primary_text}
                    onChange={(e) => handleChange('cta_primary_text', e.target.value)}
                    placeholder="Ej: Cotizar Proyecto"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    required
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#333'
                  }}>
                    Texto Botón Secundario
                  </label>
                  <input
                    type="text"
                    value={settings.cta_secondary_text}
                    onChange={(e) => handleChange('cta_secondary_text', e.target.value)}
                    placeholder="Ej: Ver Servicios"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#333'
              }}>
                Descripción de la Empresa
              </label>
              <textarea
                value={settings.company_description}
                onChange={(e) => handleChange('company_description', e.target.value)}
                placeholder="Descripción general de la empresa que aparece en la sección 'Sobre Nosotros'"
                rows="5"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
                required
              />
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
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SiteSettingsManager
