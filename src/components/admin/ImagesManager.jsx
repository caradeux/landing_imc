import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Image, Upload, Trash2, Save, X, Eye, EyeOff } from 'lucide-react'

const ImagesManager = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingImage, setEditingImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('site_images')
        .select('*')
        .order('category', { ascending: true })
        .order('order_index', { ascending: true })

      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error('Error loading images:', error)
      setMessage({ type: 'error', text: 'Error al cargar las imágenes' })
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e, imageId) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Por favor selecciona una imagen válida' })
      return
    }

    setUploading(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('site-images')
        .getPublicUrl(filePath)

      if (imageId) {
        const { error: updateError } = await supabase
          .from('site_images')
          .update({ url: publicUrl })
          .eq('id', imageId)

        if (updateError) throw updateError
      }

      setMessage({ type: 'success', text: 'Imagen subida exitosamente' })
      loadImages()
    } catch (error) {
      console.error('Error uploading image:', error)
      setMessage({ type: 'error', text: 'Error al subir la imagen' })
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (image) => {
    try {
      if (image.id) {
        const { error } = await supabase
          .from('site_images')
          .update({
            key: image.key,
            url: image.url,
            alt_text: image.alt_text,
            description: image.description,
            category: image.category,
            order_index: image.order_index,
            is_active: image.is_active
          })
          .eq('id', image.id)

        if (error) throw error
        setMessage({ type: 'success', text: 'Imagen actualizada' })
      } else {
        const { error } = await supabase
          .from('site_images')
          .insert([image])

        if (error) throw error
        setMessage({ type: 'success', text: 'Imagen creada' })
      }

      setEditingImage(null)
      loadImages()
    } catch (error) {
      console.error('Error saving image:', error)
      setMessage({ type: 'error', text: error.message || 'Error al guardar' })
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta imagen?')) return

    try {
      const { error } = await supabase
        .from('site_images')
        .delete()
        .eq('id', id)

      if (error) throw error
      setMessage({ type: 'success', text: 'Imagen eliminada' })
      loadImages()
    } catch (error) {
      console.error('Error deleting image:', error)
      setMessage({ type: 'error', text: 'Error al eliminar' })
    }
  }

  const toggleActive = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('site_images')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error
      loadImages()
    } catch (error) {
      console.error('Error toggling active:', error)
      setMessage({ type: 'error', text: 'Error al cambiar estado' })
    }
  }

  const getCategoryLabel = (category) => {
    const labels = {
      banner: 'Banner',
      logo: 'Logo',
      content: 'Contenido',
      general: 'General'
    }
    return labels[category] || category
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div>Cargando imágenes...</div>
      </div>
    )
  }

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
          Gestión de Imágenes
        </h2>
        <button
          onClick={() => setEditingImage({
            key: '',
            url: '',
            alt_text: '',
            description: '',
            category: 'general',
            order_index: 0,
            is_active: true
          })}
          style={{
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Upload size={18} />
          Nueva Imagen
        </button>
      </div>

      {message.text && (
        <div style={{
          padding: '12px',
          marginBottom: '20px',
          borderRadius: '5px',
          background: message.type === 'error' ? '#ffebee' : '#e8f5e9',
          color: message.type === 'error' ? '#c62828' : '#2e7d32'
        }}>
          {message.text}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {images.map((image) => (
          <div
            key={image.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '15px',
              background: image.is_active ? 'white' : '#f5f5f5'
            }}
          >
            <div style={{
              width: '100%',
              height: '200px',
              background: `url(${image.url}) center/cover`,
              borderRadius: '5px',
              marginBottom: '10px'
            }} />

            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                {image.key}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '3px' }}>
                {getCategoryLabel(image.category)} - Orden: {image.order_index}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666' }}>
                {image.alt_text}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => toggleActive(image.id, image.is_active)}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: image.is_active ? '#ff9800' : '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px'
                }}
              >
                {image.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
                {image.is_active ? 'Ocultar' : 'Mostrar'}
              </button>
              <button
                onClick={() => setEditingImage(image)}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(image.id)}
                style={{
                  padding: '8px 12px',
                  background: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingImage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '30px',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ margin: 0 }}>
                {editingImage.id ? 'Editar Imagen' : 'Nueva Imagen'}
              </h3>
              <button
                onClick={() => setEditingImage(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                <X size={24} />
              </button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: '600'
              }}>
                Identificador (key)
              </label>
              <input
                type="text"
                value={editingImage.key}
                onChange={(e) => setEditingImage({
                  ...editingImage,
                  key: e.target.value
                })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
                placeholder="hero_banner, logo, etc"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: '600'
              }}>
                URL de la imagen
              </label>
              <input
                type="text"
                value={editingImage.url}
                onChange={(e) => setEditingImage({
                  ...editingImage,
                  url: e.target.value
                })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  marginBottom: '10px'
                }}
                placeholder="https://..."
              />
              <div style={{ marginTop: '10px' }}>
                <label style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  background: '#4CAF50',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: uploading ? 'not-allowed' : 'pointer'
                }}>
                  <Upload size={16} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  {uploading ? 'Subiendo...' : 'Subir nueva imagen'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, editingImage.id)}
                    disabled={uploading}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: '600'
              }}>
                Texto alternativo (SEO)
              </label>
              <input
                type="text"
                value={editingImage.alt_text}
                onChange={(e) => setEditingImage({
                  ...editingImage,
                  alt_text: e.target.value
                })}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
                placeholder="Descripción breve para SEO"
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '5px',
                fontWeight: '600'
              }}>
                Descripción
              </label>
              <textarea
                value={editingImage.description}
                onChange={(e) => setEditingImage({
                  ...editingImage,
                  description: e.target.value
                })}
                rows="3"
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
                placeholder="Descripción detallada"
              />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginBottom: '15px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600'
                }}>
                  Categoría
                </label>
                <select
                  value={editingImage.category}
                  onChange={(e) => setEditingImage({
                    ...editingImage,
                    category: e.target.value
                  })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                >
                  <option value="general">General</option>
                  <option value="banner">Banner</option>
                  <option value="logo">Logo</option>
                  <option value="content">Contenido</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: '600'
                }}>
                  Orden
                </label>
                <input
                  type="number"
                  value={editingImage.order_index}
                  onChange={(e) => setEditingImage({
                    ...editingImage,
                    order_index: parseInt(e.target.value) || 0
                  })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={editingImage.is_active}
                  onChange={(e) => setEditingImage({
                    ...editingImage,
                    is_active: e.target.checked
                  })}
                />
                <span style={{ fontWeight: '600' }}>Imagen activa</span>
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleSave(editingImage)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Save size={18} />
                Guardar
              </button>
              <button
                onClick={() => setEditingImage(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#999',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImagesManager
