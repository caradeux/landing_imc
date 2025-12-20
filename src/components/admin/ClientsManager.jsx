import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit2, Trash2, Save, X, AlertCircle, Building2, ArrowUp, ArrowDown } from 'lucide-react'

const ClientsManager = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    logo_url: '',
    sector: '',
    achievement: '',
    years_active: '',
    description: ''
  })
  const [isAdding, setIsAdding] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setClients(data || [])
    } catch (error) {
      console.error('Error loading clients:', error)
      setMessage({ type: 'error', text: 'Error al cargar los clientes' })
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!editForm.name || !editForm.logo_url) return

    try {
      const maxOrder = Math.max(...clients.map(c => c.order_index), 0)
      const { error } = await supabase
        .from('clients')
        .insert([{
          ...editForm,
          order_index: maxOrder + 1,
          is_active: true
        }])

      if (error) throw error

      setMessage({ type: 'success', text: 'Cliente agregado correctamente' })
      setIsAdding(false)
      setEditForm({ name: '', logo_url: '', sector: '', achievement: '', years_active: '', description: '' })
      loadClients()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error adding client:', error)
      setMessage({ type: 'error', text: 'Error al agregar el cliente' })
    }
  }

  const handleUpdate = async (id) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({ ...editForm, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Cliente actualizado correctamente' })
      setEditingId(null)
      loadClients()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error updating client:', error)
      setMessage({ type: 'error', text: 'Error al actualizar el cliente' })
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este cliente?')) return

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Cliente eliminado correctamente' })
      loadClients()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error deleting client:', error)
      setMessage({ type: 'error', text: 'Error al eliminar el cliente' })
    }
  }

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('clients')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error
      loadClients()
    } catch (error) {
      console.error('Error toggling client:', error)
    }
  }

  const handleReorder = async (id, direction) => {
    const index = clients.findIndex(c => c.id === id)
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === clients.length - 1)
    ) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newClients = [...clients]
    const temp = newClients[index]
    newClients[index] = newClients[newIndex]
    newClients[newIndex] = temp

    try {
      await Promise.all([
        supabase.from('clients').update({ order_index: index + 1 }).eq('id', newClients[index].id),
        supabase.from('clients').update({ order_index: newIndex + 1 }).eq('id', newClients[newIndex].id)
      ])
      loadClients()
    } catch (error) {
      console.error('Error reordering:', error)
    }
  }

  const startEdit = (client) => {
    setEditingId(client.id)
    setEditForm({
      name: client.name,
      logo_url: client.logo_url,
      sector: client.sector,
      achievement: client.achievement,
      years_active: client.years_active,
      description: client.description
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
              Clientes / Logos
            </h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Gestiona los logos de clientes que aparecen en el sitio
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
            Agregar Cliente
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
              Nuevo Cliente
            </h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Nombre del cliente"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="Sector (ej: Retail)"
                  value={editForm.sector}
                  onChange={(e) => setEditForm({ ...editForm, sector: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                />
              </div>
              <input
                type="text"
                placeholder="URL del logo (ej: /images/logos/cliente.png)"
                value={editForm.logo_url}
                onChange={(e) => setEditForm({ ...editForm, logo_url: e.target.value })}
                style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input
                  type="text"
                  placeholder="Logro (ej: 50+ Proyectos)"
                  value={editForm.achievement}
                  onChange={(e) => setEditForm({ ...editForm, achievement: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                />
                <input
                  type="text"
                  placeholder="Años (ej: 2019-2024)"
                  value={editForm.years_active}
                  onChange={(e) => setEditForm({ ...editForm, years_active: e.target.value })}
                  style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
                />
              </div>
              <textarea
                placeholder="Descripción breve"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows="2"
                style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setEditForm({ name: '', logo_url: '', sector: '', achievement: '', years_active: '', description: '' })
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
          {clients.map((client) => (
            <div
              key={client.id}
              style={{
                background: client.is_active ? 'white' : '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '15px',
                opacity: client.is_active ? 1 : 0.6
              }}
            >
              {editingId === client.id ? (
                <div>
                  <div style={{ display: 'grid', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                      />
                      <input
                        type="text"
                        value={editForm.sector}
                        onChange={(e) => setEditForm({ ...editForm, sector: e.target.value })}
                        style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                      />
                    </div>
                    <input
                      type="text"
                      value={editForm.logo_url}
                      onChange={(e) => setEditForm({ ...editForm, logo_url: e.target.value })}
                      style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input
                        type="text"
                        value={editForm.achievement}
                        onChange={(e) => setEditForm({ ...editForm, achievement: e.target.value })}
                        style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                      />
                      <input
                        type="text"
                        value={editForm.years_active}
                        onChange={(e) => setEditForm({ ...editForm, years_active: e.target.value })}
                        style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                      />
                    </div>
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows="2"
                      style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', fontFamily: 'inherit' }}
                    />
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
                      onClick={() => handleUpdate(client.id)}
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
                    {client.logo_url ? (
                      <img
                        src={client.logo_url}
                        alt={client.name}
                        style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                      />
                    ) : (
                      <Building2 size={60} style={{ color: '#1e40af' }} />
                    )}
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}>{client.name}</div>
                      <div style={{ fontSize: '13px', color: '#666' }}>
                        {client.sector} | {client.achievement} | {client.years_active}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={() => handleReorder(client.id, 'up')}
                      style={{ padding: '6px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <ArrowUp size={16} />
                    </button>
                    <button
                      onClick={() => handleReorder(client.id, 'down')}
                      style={{ padding: '6px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      <ArrowDown size={16} />
                    </button>
                    <button
                      onClick={() => handleToggleActive(client.id, client.is_active)}
                      style={{
                        padding: '6px 12px',
                        background: client.is_active ? '#fef3c7' : '#d1fae5',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      {client.is_active ? 'Ocultar' : 'Mostrar'}
                    </button>
                    <button
                      onClick={() => startEdit(client)}
                      style={{ padding: '6px', background: '#dbeafe', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
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

        {clients.length === 0 && !isAdding && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
            No hay clientes. Agrega el primer cliente.
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientsManager
