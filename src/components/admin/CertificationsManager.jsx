import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit2, Trash2, Save, X, AlertCircle, Award, ArrowUp, ArrowDown } from 'lucide-react'

const CertificationsManager = () => {
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    icon: 'Award',
    color: '#1e40af',
    description: '',
    expiry_date: '',
    document_url: ''
  })
  const [isAdding, setIsAdding] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const iconOptions = ['Award', 'Shield', 'CheckCircle', 'Star', 'Medal']
  const colorOptions = [
    { name: 'Azul', value: '#1e40af' },
    { name: 'Verde', value: '#059669' },
    { name: 'Morado', value: '#7c3aed' },
    { name: 'Rojo', value: '#dc2626' },
    { name: 'Naranja', value: '#ea580c' }
  ]

  useEffect(() => {
    loadCertifications()
  }, [])

  const loadCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setCertifications(data || [])
    } catch (error) {
      console.error('Error loading certifications:', error)
      setMessage({ type: 'error', text: 'Error al cargar las certificaciones' })
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!editForm.name) return

    try {
      const maxOrder = Math.max(...certifications.map(c => c.order_index), 0)
      const { error } = await supabase
        .from('certifications')
        .insert([{
          ...editForm,
          expiry_date: editForm.expiry_date || null,
          document_url: editForm.document_url || null,
          order_index: maxOrder + 1,
          is_active: true
        }])

      if (error) throw error

      setMessage({ type: 'success', text: 'Certificación agregada correctamente' })
      setIsAdding(false)
      setEditForm({ name: '', icon: 'Award', color: '#1e40af', description: '', expiry_date: '', document_url: '' })
      loadCertifications()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error adding certification:', error)
      setMessage({ type: 'error', text: 'Error al agregar la certificación' })
    }
  }

  const handleUpdate = async (id) => {
    try {
      const { error } = await supabase
        .from('certifications')
        .update({
          ...editForm,
          expiry_date: editForm.expiry_date || null,
          document_url: editForm.document_url || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Certificación actualizada correctamente' })
      setEditingId(null)
      loadCertifications()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error updating certification:', error)
      setMessage({ type: 'error', text: 'Error al actualizar la certificación' })
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta certificación?')) return

    try {
      const { error } = await supabase
        .from('certifications')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Certificación eliminada correctamente' })
      loadCertifications()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error deleting certification:', error)
      setMessage({ type: 'error', text: 'Error al eliminar la certificación' })
    }
  }

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('certifications')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error
      loadCertifications()
    } catch (error) {
      console.error('Error toggling certification:', error)
    }
  }

  const handleReorder = async (id, direction) => {
    const index = certifications.findIndex(c => c.id === id)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === certifications.length - 1)
    ) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newCerts = [...certifications]
    const temp = newCerts[index]
    newCerts[index] = newCerts[newIndex]
    newCerts[newIndex] = temp

    try {
      await Promise.all([
        supabase.from('certifications').update({ order_index: index + 1 }).eq('id', newCerts[index].id),
        supabase.from('certifications').update({ order_index: newIndex + 1 }).eq('id', newCerts[newIndex].id)
      ])
      loadCertifications()
    } catch (error) {
      console.error('Error reordering:', error)
    }
  }

  const startEdit = (cert) => {
    setEditingId(cert.id)
    setEditForm({
      name: cert.name,
      icon: cert.icon,
      color: cert.color,
      description: cert.description,
      expiry_date: cert.expiry_date || '',
      document_url: cert.document_url || ''
    })
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', color: '#1e40af' }}>
              Certificaciones
            </h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Gestiona las certificaciones y acreditaciones de la empresa
            </p>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <Plus size={18} />
            Agregar Certificación
          </button>
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

        {isAdding && (
          <div style={{
            background: '#f9fafb',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '2px solid #1e40af'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px' }}>
              Nueva Certificación
            </h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              <input
                type="text"
                placeholder="Nombre de la certificación"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <select
                  value={editForm.icon}
                  onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                >
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <select
                  value={editForm.color}
                  onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>{color.name}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Descripción"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows="2"
                style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input
                  type="date"
                  placeholder="Fecha de expiración (opcional)"
                  value={editForm.expiry_date}
                  onChange={(e) => setEditForm({ ...editForm, expiry_date: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="url"
                  placeholder="URL del documento (opcional)"
                  value={editForm.document_url}
                  onChange={(e) => setEditForm({ ...editForm, document_url: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                />
              </div>
            </div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setEditForm({ name: '', icon: 'Award', color: '#1e40af', description: '', expiry_date: '', document_url: '' })
                }}
                style={{ padding: '8px 16px', background: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Cancelar
              </button>
              <button
                onClick={handleAdd}
                style={{
                  padding: '8px 16px',
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'grid', gap: '12px' }}>
          {certifications.map((cert) => (
            <div
              key={cert.id}
              style={{
                background: cert.is_active ? 'white' : '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '15px',
                opacity: cert.is_active ? 1 : 0.6
              }}
            >
              {editingId === cert.id ? (
                <div>
                  <div style={{ display: 'grid', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <select
                        value={editForm.icon}
                        onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                        style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                      >
                        {iconOptions.map(icon => (
                          <option key={icon} value={icon}>{icon}</option>
                        ))}
                      </select>
                      <select
                        value={editForm.color}
                        onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                        style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                      >
                        {colorOptions.map(color => (
                          <option key={color.value} value={color.value}>{color.name}</option>
                        ))}
                      </select>
                    </div>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows="2"
                      style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'inherit' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input
                        type="date"
                        value={editForm.expiry_date}
                        onChange={(e) => setEditForm({ ...editForm, expiry_date: e.target.value })}
                        style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                      />
                      <input
                        type="url"
                        value={editForm.document_url}
                        onChange={(e) => setEditForm({ ...editForm, document_url: e.target.value })}
                        style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setEditingId(null)}
                      style={{
                        padding: '6px 12px',
                        background: '#e5e7eb',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                    >
                      <X size={16} />
                    </button>
                    <button
                      onClick={() => handleUpdate(cert.id)}
                      style={{
                        padding: '6px 12px',
                        background: '#1e40af',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '13px'
                      }}
                    >
                      <Save size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '10px',
                      background: cert.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <Award size={24} />
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{cert.name}</div>
                      <div style={{ fontSize: '13px', color: '#666' }}>
                        {cert.description}
                        {cert.expiry_date && ` | Vigencia: ${new Date(cert.expiry_date).toLocaleDateString()}`}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => handleReorder(cert.id, 'up')}
                      style={{ padding: '6px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => handleReorder(cert.id, 'down')}
                      style={{ padding: '6px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button
                      onClick={() => handleToggleActive(cert.id, cert.is_active)}
                      style={{
                        padding: '6px 12px',
                        background: cert.is_active ? '#fef3c7' : '#d1fae5',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      {cert.is_active ? 'Ocultar' : 'Mostrar'}
                    </button>
                    <button
                      onClick={() => startEdit(cert)}
                      style={{ padding: '6px', background: '#dbeafe', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id)}
                      style={{ padding: '6px', background: '#fee2e2', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {certifications.length === 0 && !isAdding && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            No hay certificaciones. Agrega la primera certificación.
          </div>
        )}
      </div>
    </div>
  )
}

export default CertificationsManager
