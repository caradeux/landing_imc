import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Palette, Plus, Edit2, Trash2, Check, X } from 'lucide-react'

const ColorSchemesManager = () => {
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingScheme, setEditingScheme] = useState(null)
  const [isAdding, setIsAdding] = useState(false)

  const defaultScheme = {
    name: '',
    description: '',
    primary_color: '#1e40af',
    secondary_color: '#0f172a',
    accent_color: '#667eea',
    text_color: '#333333',
    text_light: '#666666',
    background_color: '#ffffff',
    card_background: '#ffffff',
    border_color: '#e1e5e9',
    hover_color: '#3b82f6',
    gradient_start: '#1e40af',
    gradient_end: '#0f172a'
  }

  useEffect(() => {
    loadSchemes()
  }, [])

  const loadSchemes = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('color_schemes')
        .select('*')
        .order('is_default', { ascending: false })
        .order('name', { ascending: true })

      if (error) throw error
      setSchemes(data || [])
    } catch (error) {
      console.error('Error loading color schemes:', error)
      alert('Error al cargar los esquemas de color')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (scheme) => {
    try {
      if (scheme.id) {
        const { error } = await supabase
          .from('color_schemes')
          .update(scheme)
          .eq('id', scheme.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('color_schemes')
          .insert([scheme])

        if (error) throw error
      }

      await loadSchemes()
      setEditingScheme(null)
      setIsAdding(false)
      alert('Esquema guardado correctamente')
    } catch (error) {
      console.error('Error saving scheme:', error)
      alert('Error al guardar el esquema')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este esquema de color?')) return

    try {
      const { error } = await supabase
        .from('color_schemes')
        .delete()
        .eq('id', id)

      if (error) throw error

      await loadSchemes()
      alert('Esquema eliminado correctamente')
    } catch (error) {
      console.error('Error deleting scheme:', error)
      alert('Error al eliminar el esquema')
    }
  }

  const handleActivate = async (id) => {
    try {
      const { error } = await supabase
        .from('color_schemes')
        .update({ is_active: true })
        .eq('id', id)

      if (error) throw error

      await loadSchemes()
      alert('Esquema activado. Recarga la página para ver los cambios.')
    } catch (error) {
      console.error('Error activating scheme:', error)
      alert('Error al activar el esquema')
    }
  }

  const ColorInput = ({ label, value, onChange }) => (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600' }}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: '60px', height: '40px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '2px solid #e1e5e9',
            borderRadius: '6px',
            fontFamily: 'monospace'
          }}
        />
      </div>
    </div>
  )

  const SchemeEditor = ({ scheme, onSave, onCancel }) => {
    const [editedScheme, setEditedScheme] = useState(scheme)

    return (
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600' }}>
            Nombre del Esquema
          </label>
          <input
            type="text"
            value={editedScheme.name}
            onChange={(e) => setEditedScheme({ ...editedScheme, name: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #e1e5e9',
              borderRadius: '6px',
              fontSize: '16px'
            }}
            placeholder="Ej: Azul Profesional"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '600' }}>
            Descripción
          </label>
          <input
            type="text"
            value={editedScheme.description || ''}
            onChange={(e) => setEditedScheme({ ...editedScheme, description: e.target.value })}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '2px solid #e1e5e9',
              borderRadius: '6px',
              fontSize: '14px'
            }}
            placeholder="Descripción del esquema"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          <div>
            <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '16px' }}>Colores Principales</h4>
            <ColorInput
              label="Color Primario"
              value={editedScheme.primary_color}
              onChange={(val) => setEditedScheme({ ...editedScheme, primary_color: val })}
            />
            <ColorInput
              label="Color Secundario"
              value={editedScheme.secondary_color}
              onChange={(val) => setEditedScheme({ ...editedScheme, secondary_color: val })}
            />
            <ColorInput
              label="Color de Acento"
              value={editedScheme.accent_color}
              onChange={(val) => setEditedScheme({ ...editedScheme, accent_color: val })}
            />
            <ColorInput
              label="Color Hover"
              value={editedScheme.hover_color}
              onChange={(val) => setEditedScheme({ ...editedScheme, hover_color: val })}
            />
          </div>

          <div>
            <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '16px' }}>Colores de Texto</h4>
            <ColorInput
              label="Texto Principal"
              value={editedScheme.text_color}
              onChange={(val) => setEditedScheme({ ...editedScheme, text_color: val })}
            />
            <ColorInput
              label="Texto Claro"
              value={editedScheme.text_light}
              onChange={(val) => setEditedScheme({ ...editedScheme, text_light: val })}
            />
          </div>

          <div>
            <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '16px' }}>Fondos y Bordes</h4>
            <ColorInput
              label="Fondo Principal"
              value={editedScheme.background_color}
              onChange={(val) => setEditedScheme({ ...editedScheme, background_color: val })}
            />
            <ColorInput
              label="Fondo de Tarjetas"
              value={editedScheme.card_background}
              onChange={(val) => setEditedScheme({ ...editedScheme, card_background: val })}
            />
            <ColorInput
              label="Color de Bordes"
              value={editedScheme.border_color}
              onChange={(val) => setEditedScheme({ ...editedScheme, border_color: val })}
            />
          </div>

          <div>
            <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '16px' }}>Gradientes</h4>
            <ColorInput
              label="Inicio del Gradiente"
              value={editedScheme.gradient_start}
              onChange={(val) => setEditedScheme({ ...editedScheme, gradient_start: val })}
            />
            <ColorInput
              label="Fin del Gradiente"
              value={editedScheme.gradient_end}
              onChange={(val) => setEditedScheme({ ...editedScheme, gradient_end: val })}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              border: '2px solid #e1e5e9',
              borderRadius: '6px',
              background: 'white',
              color: '#666',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <X size={18} /> Cancelar
          </button>
          <button
            onClick={() => onSave(editedScheme)}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Check size={18} /> Guardar
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando esquemas de color...</div>
  }

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Palette size={32} /> Esquemas de Color
          </h2>
          <p style={{ color: '#666', fontSize: '16px' }}>
            Gestiona las combinaciones de colores del sitio web
          </p>
        </div>
        {!isAdding && !editingScheme && (
          <button
            onClick={() => setIsAdding(true)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={20} /> Nuevo Esquema
          </button>
        )}
      </div>

      {isAdding && (
        <SchemeEditor
          scheme={defaultScheme}
          onSave={handleSave}
          onCancel={() => setIsAdding(false)}
        />
      )}

      <div style={{ display: 'grid', gap: '20px' }}>
        {schemes.map((scheme) => (
          editingScheme?.id === scheme.id ? (
            <SchemeEditor
              key={scheme.id}
              scheme={editingScheme}
              onSave={handleSave}
              onCancel={() => setEditingScheme(null)}
            />
          ) : (
            <div
              key={scheme.id}
              style={{
                background: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: scheme.is_active ? '3px solid #10b981' : '1px solid #e1e5e9'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#333' }}>
                      {scheme.name}
                    </h3>
                    {scheme.is_active && (
                      <span style={{
                        padding: '4px 12px',
                        background: '#10b981',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        ACTIVO
                      </span>
                    )}
                    {scheme.is_default && (
                      <span style={{
                        padding: '4px 12px',
                        background: '#3b82f6',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        DEFAULT
                      </span>
                    )}
                  </div>
                  {scheme.description && (
                    <p style={{ color: '#666', fontSize: '14px' }}>{scheme.description}</p>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {!scheme.is_active && (
                    <button
                      onClick={() => handleActivate(scheme.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Check size={16} /> Activar
                    </button>
                  )}
                  <button
                    onClick={() => setEditingScheme(scheme)}
                    style={{
                      padding: '8px 16px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Edit2 size={16} /> Editar
                  </button>
                  {!scheme.is_default && (
                    <button
                      onClick={() => handleDelete(scheme.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <Trash2 size={16} /> Eliminar
                    </button>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <ColorPreview label="Primario" color={scheme.primary_color} />
                <ColorPreview label="Secundario" color={scheme.secondary_color} />
                <ColorPreview label="Acento" color={scheme.accent_color} />
                <ColorPreview label="Texto" color={scheme.text_color} />
                <ColorPreview label="Hover" color={scheme.hover_color} />
                <ColorPreview label="Borde" color={scheme.border_color} />
              </div>

              <div style={{
                marginTop: '15px',
                padding: '15px',
                background: `linear-gradient(135deg, ${scheme.gradient_start} 0%, ${scheme.gradient_end} 100%)`,
                borderRadius: '8px',
                color: 'white',
                textAlign: 'center',
                fontWeight: '600'
              }}>
                Vista previa del gradiente
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

const ColorPreview = ({ label, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div style={{
      width: '40px',
      height: '40px',
      background: color,
      borderRadius: '6px',
      border: '2px solid #e1e5e9'
    }} />
    <div>
      <div style={{ fontSize: '12px', color: '#666', fontWeight: '600' }}>{label}</div>
      <div style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace' }}>{color}</div>
    </div>
  </div>
)

export default ColorSchemesManager
