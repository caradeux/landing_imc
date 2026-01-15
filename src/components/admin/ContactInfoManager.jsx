import React, { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle, Save, AlertCircle } from 'lucide-react'

const ContactInfoManager = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    address: '',
    schedule: '',
    whatsapp: '',
    instagram_url: '',
    facebook_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadContactInfo()
  }, [])

  const loadContactInfo = async () => {
    try {
      const data = await api.getContactInfo()
      if (data) {
        setContactInfo(data)
      }
    } catch (error) {
      console.error('Error loading contact info:', error)
      setMessage({ type: 'error', text: 'Error al cargar la información de contacto' })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      await api.updateContactInfo(contactInfo)
      setMessage({ type: 'success', text: 'Información de contacto actualizada correctamente' })
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error saving contact info:', error)
      setMessage({ type: 'error', text: 'Error al guardar la información' })
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }))
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
            Información de Contacto
          </h2>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Gestiona los datos de contacto que se muestran en el sitio web
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
                <Phone size={18} />
                Teléfono Principal
              </label>
              <input
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+56 9 XXXX XXXX"
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
                <Mail size={18} />
                Email Principal
              </label>
              <input
                type="email"
                value={contactInfo.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contacto@empresa.cl"
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
                <MapPin size={18} />
                Dirección
              </label>
              <input
                type="text"
                value={contactInfo.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Calle, Número, Ciudad, Chile"
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
                <Clock size={18} />
                Horarios de Atención
              </label>
              <input
                type="text"
                value={contactInfo.schedule}
                onChange={(e) => handleChange('schedule', e.target.value)}
                placeholder="Lun-Vie: 8:00-18:00"
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

            <div style={{
              borderTop: '1px solid #e5e7eb',
              paddingTop: '20px',
              marginTop: '10px'
            }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
                Redes Sociales
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
                    <MessageCircle size={18} />
                    WhatsApp (URL Completa)
                  </label>
                  <input
                    type="url"
                    value={contactInfo.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    placeholder="https://wa.me/56912345678"
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
                    <Instagram size={18} />
                    Instagram (URL Completa)
                  </label>
                  <input
                    type="url"
                    value={contactInfo.instagram_url}
                    onChange={(e) => handleChange('instagram_url', e.target.value)}
                    placeholder="https://instagram.com/usuario"
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
                    <Facebook size={18} />
                    Facebook (URL Completa)
                  </label>
                  <input
                    type="url"
                    value={contactInfo.facebook_url}
                    onChange={(e) => handleChange('facebook_url', e.target.value)}
                    placeholder="https://facebook.com/usuario"
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

export default ContactInfoManager
