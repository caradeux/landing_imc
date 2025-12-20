import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Plus, Edit2, Trash2, Save, X, AlertCircle, HelpCircle, ArrowUp, ArrowDown } from 'lucide-react'

const FAQManager = () => {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({
    category: 'General',
    question: '',
    answer: ''
  })
  const [isAdding, setIsAdding] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const categoryOptions = ['General', 'Servicios', 'Proyectos', 'Cotizaciones', 'Garantías', 'Pagos']

  useEffect(() => {
    loadFaqs()
  }, [])

  const loadFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('category', { ascending: true })
        .order('order_index', { ascending: true })

      if (error) throw error
      setFaqs(data || [])
    } catch (error) {
      console.error('Error loading FAQs:', error)
      setMessage({ type: 'error', text: 'Error al cargar las preguntas frecuentes' })
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!editForm.question || !editForm.answer) return

    try {
      const sameCategoryFaqs = faqs.filter(f => f.category === editForm.category)
      const maxOrder = Math.max(...sameCategoryFaqs.map(f => f.order_index), 0)
      const { error } = await supabase
        .from('faqs')
        .insert([{
          ...editForm,
          order_index: maxOrder + 1,
          is_active: true
        }])

      if (error) throw error

      setMessage({ type: 'success', text: 'Pregunta agregada correctamente' })
      setIsAdding(false)
      setEditForm({ category: 'General', question: '', answer: '' })
      loadFaqs()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error adding FAQ:', error)
      setMessage({ type: 'error', text: 'Error al agregar la pregunta' })
    }
  }

  const handleUpdate = async (id) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ ...editForm, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Pregunta actualizada correctamente' })
      setEditingId(null)
      loadFaqs()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error updating FAQ:', error)
      setMessage({ type: 'error', text: 'Error al actualizar la pregunta' })
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta pregunta?')) return

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Pregunta eliminada correctamente' })
      loadFaqs()
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    } catch (error) {
      console.error('Error deleting FAQ:', error)
      setMessage({ type: 'error', text: 'Error al eliminar la pregunta' })
    }
  }

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('faqs')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) throw error
      loadFaqs()
    } catch (error) {
      console.error('Error toggling FAQ:', error)
    }
  }

  const handleReorder = async (id, direction) => {
    const faq = faqs.find(f => f.id === id)
    const sameCategoryFaqs = faqs.filter(f => f.category === faq.category)
    const index = sameCategoryFaqs.findIndex(f => f.id === id)

    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sameCategoryFaqs.length - 1)
    ) return

    const newIndex = direction === 'up' ? index - 1 : index + 1
    const newFaqs = [...sameCategoryFaqs]
    const temp = newFaqs[index]
    newFaqs[index] = newFaqs[newIndex]
    newFaqs[newIndex] = temp

    try {
      await Promise.all([
        supabase.from('faqs').update({ order_index: index + 1 }).eq('id', newFaqs[index].id),
        supabase.from('faqs').update({ order_index: newIndex + 1 }).eq('id', newFaqs[newIndex].id)
      ])
      loadFaqs()
    } catch (error) {
      console.error('Error reordering:', error)
    }
  }

  const startEdit = (faq) => {
    setEditingId(faq.id)
    setEditForm({
      category: faq.category,
      question: faq.question,
      answer: faq.answer
    })
  }

  const groupedFaqs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) acc[faq.category] = []
    acc[faq.category].push(faq)
    return acc
  }, {})

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
              Preguntas Frecuentes (FAQ)
            </h2>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Gestiona las preguntas y respuestas frecuentes organizadas por categoría
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
            Agregar Pregunta
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
              Nueva Pregunta Frecuente
            </h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              <select
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Pregunta"
                value={editForm.question}
                onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px' }}
              />
              <textarea
                placeholder="Respuesta"
                value={editForm.answer}
                onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                rows="4"
                style={{ padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '14px', fontFamily: 'inherit' }}
              />
            </div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setIsAdding(false)
                  setEditForm({ category: 'General', question: '', answer: '' })
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

        {Object.keys(groupedFaqs).length > 0 ? (
          Object.entries(groupedFaqs).map(([category, categoryFaqs]) => (
            <div key={category} style={{ marginBottom: '30px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                marginBottom: '15px',
                color: '#1e40af',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <HelpCircle size={20} />
                {category}
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {categoryFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    style={{
                      background: faq.is_active ? 'white' : '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '15px',
                      opacity: faq.is_active ? 1 : 0.6
                    }}
                  >
                    {editingId === faq.id ? (
                      <div>
                        <div style={{ display: 'grid', gap: '10px', marginBottom: '10px' }}>
                          <select
                            value={editForm.category}
                            onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                          >
                            {categoryOptions.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={editForm.question}
                            onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                            style={{ padding: '8px', border: '1px solid #e5e7eb', borderRadius: '6px' }}
                          />
                          <textarea
                            value={editForm.answer}
                            onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                            rows="3"
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
                            onClick={() => handleUpdate(faq.id)}
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
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '8px', color: '#1e40af' }}>
                              {faq.question}
                            </div>
                            <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
                              {faq.answer}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '8px', marginLeft: '15px' }}>
                            <button
                              onClick={() => handleReorder(faq.id, 'up')}
                              style={{ padding: '6px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              <ArrowUp size={16} />
                            </button>
                            <button
                              onClick={() => handleReorder(faq.id, 'down')}
                              style={{ padding: '6px', background: '#f3f4f6', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                            >
                              <ArrowDown size={16} />
                            </button>
                            <button
                              onClick={() => handleToggleActive(faq.id, faq.is_active)}
                              style={{
                                padding: '6px 12px',
                                background: faq.is_active ? '#fef3c7' : '#d1fae5',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600'
                              }}
                            >
                              {faq.is_active ? 'Ocultar' : 'Mostrar'}
                            </button>
                            <button
                              onClick={() => startEdit(faq)}
                              style={{ padding: '6px', background: '#dbeafe', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(faq.id)}
                              style={{ padding: '6px', background: '#fee2e2', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          !isAdding && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
              No hay preguntas frecuentes. Agrega la primera pregunta.
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default FAQManager
