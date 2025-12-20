import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit2, Trash2, Save, Star, AlertCircle } from 'lucide-react'

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    client_name: '',
    client_company: '',
    client_position: '',
    client_photo_url: '',
    content: '',
    rating: 5,
    project_name: '',
    display_order: 0,
    active: true
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (err) {
      setError('Error al cargar testimonios: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editingId) {
        const { error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([formData])

        if (error) throw error
      }

      await fetchTestimonials()
      resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id)
    setFormData({
      client_name: testimonial.client_name,
      client_company: testimonial.client_company,
      client_position: testimonial.client_position,
      client_photo_url: testimonial.client_photo_url,
      content: testimonial.content,
      rating: testimonial.rating,
      project_name: testimonial.project_name,
      display_order: testimonial.display_order,
      active: testimonial.active
    })
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este testimonio?')) return

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchTestimonials()
    } catch (err) {
      setError('Error al eliminar: ' + err.message)
    }
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      client_name: '',
      client_company: '',
      client_position: '',
      client_photo_url: '',
      content: '',
      rating: 5,
      project_name: '',
      display_order: 0,
      active: true
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
          Gestión de Testimonios
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
          {editingId ? 'Editar Testimonio' : 'Nuevo Testimonio'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                Nombre del Cliente
              </label>
              <input
                type="text"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
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
                Empresa
              </label>
              <input
                type="text"
                value={formData.client_company}
                onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
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
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                Cargo
              </label>
              <input
                type="text"
                value={formData.client_position}
                onChange={(e) => setFormData({ ...formData, client_position: e.target.value })}
                placeholder="ej: Gerente de Operaciones"
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
                URL de Foto
              </label>
              <input
                type="url"
                value={formData.client_photo_url}
                onChange={(e) => setFormData({ ...formData, client_photo_url: e.target.value })}
                placeholder="https://..."
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
              Testimonio
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows="4"
              placeholder="Escribe el testimonio del cliente..."
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
                Calificación
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <Star
                      size={28}
                      style={{
                        fill: star <= formData.rating ? '#fbbf24' : 'none',
                        stroke: star <= formData.rating ? '#fbbf24' : '#e0e0e0'
                      }}
                    />
                  </button>
                ))}
                <span style={{ marginLeft: '10px', fontWeight: '600', color: '#555' }}>
                  {formData.rating}/5
                </span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#555' }}>
                Proyecto Relacionado (Opcional)
              </label>
              <input
                type="text"
                value={formData.project_name}
                onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                placeholder="ej: Remodelación Jumbo Maipú"
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} style={{
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
                onClick={() => handleEdit(testimonial)}
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
                onClick={() => handleDelete(testimonial.id)}
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

            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
              {testimonial.client_photo_url ? (
                <img
                  src={testimonial.client_photo_url}
                  alt={testimonial.client_name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#e0e7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#667eea'
                }}>
                  {testimonial.client_name.charAt(0)}
                </div>
              )}

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '5px', color: '#333' }}>
                  {testimonial.client_name}
                </h3>
                <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '5px' }}>
                  {testimonial.client_position}
                </p>
                <p style={{ color: '#999', fontSize: '0.85rem' }}>
                  {testimonial.client_company}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '4px', marginBottom: '15px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  style={{
                    fill: star <= testimonial.rating ? '#fbbf24' : 'none',
                    stroke: star <= testimonial.rating ? '#fbbf24' : '#e0e0e0'
                  }}
                />
              ))}
            </div>

            <p style={{
              color: '#666',
              fontSize: '0.95rem',
              lineHeight: '1.6',
              marginBottom: '15px',
              fontStyle: 'italic'
            }}>
              "{testimonial.content}"
            </p>

            {testimonial.project_name && (
              <div style={{
                background: '#f9fafb',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: '#666',
                marginBottom: '10px'
              }}>
                Proyecto: {testimonial.project_name}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#999' }}>
              <span>Orden: {testimonial.display_order}</span>
              <span style={{ color: testimonial.active ? '#10b981' : '#ef4444', fontWeight: '600' }}>
                {testimonial.active ? 'Activo' : 'Inactivo'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialsManager
