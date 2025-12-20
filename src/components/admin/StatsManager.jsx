import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit2, Trash2, Save, X, AlertCircle, Award, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react'

const StatsManager = () => {
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ label: '', value: '', icon: 'Award' })
  const [isAdding, setIsAdding] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const iconOptions = ['Award', 'Target', 'Star', 'Shield', 'TrendingUp', 'Users']

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from('site_stats')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setStats(data || [])
    } catch (error) {
      console.error('Error loading stats:', error)
      setMessage({ type: 'error', text: 'Error al cargar las estadísticas' })
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!editForm.label || !editForm.value) return

    try {
      const maxOrder = Math.max(...stats.map(s => s.order_index), 0)
      const { error } = await supabase
        .from('site_stats')
        .insert([{
          ...editForm,
          order_index: maxOrder + 1,
          is_active: true
        }])

      if (error) throw error

      setMessage({ type: 'success', text: 'Estadística agregada correctamente' })
      setIsAdding(false)
      setEditForm({ label: '', value: '', icon: 'Award' })
      loadStats()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error adding stat:', error)
      setMessage({ type: 'error', text: 'Error al agregar la estadística' })
    }
  }

  const handleUpdate = async (id) => {
    try {
      const { error } = await supabase
        .from('site_stats')
        .update({ ...editForm, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Estadística actualizada correctamente' })
      setEditingId(null)
      loadStats()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error updating stat:', error)
      setMessage({ type: 'error', text: 'Error al actualizar la estadística' })
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta estadística?')) return

    try {
      const { error } = await supabase
        .from('site_stats')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Estadística eliminada correctamente' })
      loadStats()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error deleting stat:', error)
      setMessage({ type: 'error', text: 'Error al eliminar la estadística' })
    }
  }

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('site_stats')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error
      loadStats()
    } catch (error) {
      console.error('Error toggling stat:', error)
    }
  }

  const handleReorder = async (id, direction) => {
    const index = stats.findIndex(s => s.id === id)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === stats.length - 1)
    ) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newStats = [...stats]
    const temp = newStats[index]
    newStats[index] = newStats[newIndex]
    newStats[newIndex] = temp

    try {
      await Promise.all([
        supabase.from('site_stats').update({ order_index: index + 1 }).eq('id', newStats[index].id),
        supabase.from('site_stats').update({ order_index: newIndex + 1 }).eq('id', newStats[newIndex].id)
      ])
      loadStats()
    } catch (error) {
      console.error('Error reordering:', error)
    }
  }

  const startEdit = (stat) => {
    setEditingId(stat.id)
    setEditForm({ label: stat.label, value: stat.value, icon: stat.icon })
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
              Estadísticas / Números
            </h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Gestiona los números destacados que aparecen en el sitio
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
            Agregar Estadística
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
              Nueva Estadística
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
              <input
                type="text"
                placeholder="Etiqueta (ej: Años de Experiencia)"
                value={editForm.label}
                onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <input
                type="text"
                placeholder="Valor (ej: 15+)"
                value={editForm.value}
                onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
              <select
                value={editForm.icon}
                onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                style={{
                  padding: '10px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => { setIsAdding(false); setEditForm({ label: '', value: '', icon: 'Award' }) }}
                style={{
                  padding: '8px 16px',
                  background: '#e5e7eb',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
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
          {stats.map((stat) => (
            <div
              key={stat.id}
              style={{
                background: stat.is_active ? 'white' : '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '15px',
                opacity: stat.is_active ? 1 : 0.6
              }}
            >
              {editingId === stat.id ? (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={editForm.label}
                      onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                      style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                    <input
                      type="text"
                      value={editForm.value}
                      onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                      style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                    <select
                      value={editForm.icon}
                      onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                      style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    >
                      {iconOptions.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
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
                      onClick={() => handleUpdate(stat.id)}
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
                    <Award size={20} style={{ color: '#1e40af' }} />
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px' }}>{stat.label}</div>
                      <div style={{ color: '#1e40af', fontWeight: '700', fontSize: '18px' }}>{stat.value}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => handleReorder(stat.id, 'up')}
                      style={{
                        padding: '6px',
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => handleReorder(stat.id, 'down')}
                      style={{
                        padding: '6px',
                        background: '#f3f4f6',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button
                      onClick={() => handleToggleActive(stat.id, stat.is_active)}
                      style={{
                        padding: '6px 12px',
                        background: stat.is_active ? '#fef3c7' : '#d1fae5',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      {stat.is_active ? 'Ocultar' : 'Mostrar'}
                    </button>
                    <button
                      onClick={() => startEdit(stat)}
                      style={{
                        padding: '6px',
                        background: '#dbeafe',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(stat.id)}
                      style={{
                        padding: '6px',
                        background: '#fee2e2',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {stats.length === 0 && !isAdding && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            No hay estadísticas. Agrega la primera estadística.
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsManager
