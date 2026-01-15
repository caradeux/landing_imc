import React, { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import { Plus, Edit2, Trash2, Save, X, AlertCircle } from 'lucide-react'

const ServicesManager = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Zap',
    image_url: '',
    color: '#1e40af',
    features: [],
    display_order: 0,
    active: true
  })
  const [featureInput, setFeatureInput] = useState('')
  const [error, setError] = useState('')

  const iconOptions = ['Zap', 'Hammer', 'Wrench', 'Home', 'Palette', 'Shield']

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const services = await api.getServices()
      setServices(services || [])
    } catch (err) {
      setError('Error al cargar servicios: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        await api.updateService(editingId, formData)
      } else {
        await api.createService(formData)
      }

      await fetchServices()
      resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (service) => {
    setEditingId(service.id)
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      image_url: service.image_url,
      color: service.color,
      features: service.features || [],
      display_order: service.display_order,
      active: service.active
    })
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return

    try {
      await api.deleteService(id)
      await fetchServices()
    } catch (err) {
      setError('Error al eliminar: ' + err.message)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      icon: 'Zap',
      image_url: '',
      color: '#1e40af',
      features: [],
      display_order: 0,
      active: true
    })
    setFeatureInput('')
  }

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      })
      setFeatureInput('')
    }
  }

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    })
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Cargando...</div>

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: '#333', margin: 0 }}>
          Gestión de Servicios
        </h2>
      </div>

      {error && (
        <div style={{
          background: '#fee',
          border: '1px solid #fcc',
          borderRadius: '10px',
          padding: '12px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <AlertCircle size={20} style={{ color: '#c00' }} />
          <span style={{ color: '#c00' }}>{error}</span>
        </div>
      )}

      <div style={{
        background: '#f9fafb',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '30px'
      }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#333' }}>
          {editingId ? 'Editar Servicio' : 'Nuevo Servicio'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                Ícono
              </label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
              Descripción
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows="3"
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '1rem',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                URL de Imagen
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                Color
              </label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  height: '44px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                Orden
              </label>
              <input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
              Características
            </label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                placeholder="Agregar característica"
                style={{
                  flex: 1,
                  padding: '10px',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
              <button
                type="button"
                onClick={addFeature}
                style={{
                  padding: '10px 20px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Agregar
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {formData.features.map((feature, index) => (
                <div key={index} style={{
                  background: '#e0e7ff',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '0.9rem' }}>{feature}</span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontWeight: '600', color: '#555' }}>Activo</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Save size={18} />
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: '12px 24px',
                  background: '#e0e0e0',
                  color: '#555',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {services.map((service) => (
          <div key={service.id} style={{
            background: 'white',
            border: '2px solid #e0e0e0',
            borderRadius: '12px',
            padding: '20px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              display: 'flex',
              gap: '8px'
            }}>
              <button
                onClick={() => handleEdit(service)}
                style={{
                  padding: '8px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex'
                }}
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                style={{
                  padding: '8px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex'
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: service.color,
              marginBottom: '15px'
            }} />

            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px', color: '#333' }}>
              {service.title}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>
              {service.description}
            </p>

            <div style={{ marginBottom: '10px' }}>
              <strong style={{ fontSize: '0.85rem', color: '#555' }}>Características:</strong>
              <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} style={{ fontSize: '0.85rem', color: '#666', marginBottom: '4px' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#999' }}>
              <span>Orden: {service.display_order}</span>
              <span style={{ color: service.active ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                {service.active ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesManager
