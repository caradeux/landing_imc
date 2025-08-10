import React, { useState } from 'react'
import { X, ArrowRight, ArrowLeft, CheckCircle, Building, Zap, Hammer, Wrench, Home, Palette, Shield } from 'lucide-react'

const QuoteModal = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    projectType: '',
    services: [],
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    description: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const projectTypes = [
    { id: 'retail', name: 'Retail', icon: Building, description: 'Tiendas, supermercados, centros comerciales' },
    { id: 'industrial', name: 'Industrial', icon: Hammer, description: 'Plantas, bodegas, centros logísticos' },
    { id: 'commercial', name: 'Comercial', icon: Building, description: 'Oficinas, locales comerciales' },
    { id: 'residential', name: 'Residencial', icon: Home, description: 'Viviendas, condominios' }
  ]

  const services = [
    { id: 'electrical', name: 'Servicios Eléctricos', icon: Zap, color: '#1e40af' },
    { id: 'civil', name: 'Obras Civiles', icon: Hammer, color: '#0f172a' },
    { id: 'carpentry', name: 'Carpintería Especializada', icon: Wrench, color: '#dc2626' },
    { id: 'roofing', name: 'Techumbres Industriales', icon: Home, color: '#ea580c' },
    { id: 'finishes', name: 'Acabados Premium', icon: Palette, color: '#059669' },
    { id: 'welding', name: 'Soldadura Certificada', icon: Shield, color: '#7c3aed' }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Tipo de Proyecto y Servicios'
      case 2: return 'Información de Contacto y Proyecto'
      default: return ''
    }
  }

  if (isSubmitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
          
          <div style={{
            textAlign: 'center',
            padding: '60px 40px',
            color: '#22c55e'
          }}>
            <CheckCircle size={80} style={{ marginBottom: '30px' }} />
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#333'
            }}>
              ¡Cotización Enviada!
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              Gracias por confiar en IMC Servicios Chile. Nuestro equipo revisará tu proyecto 
              y te contactará en las próximas 24 horas para coordinar una reunión o enviarte 
              una cotización detallada.
            </p>
            <button 
              className="btn btn-primary"
              onClick={onClose}
              style={{ fontSize: '16px', padding: '12px 30px' }}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Header */}
        <div className="modal-header">
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: '#333',
            marginBottom: '10px'
          }}>
            Solicitar Cotización
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            {getStepTitle()}
          </p>
          
          {/* Progress Bar */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px'
          }}>
            {[1, 2].map((step) => (
              <div
                key={step}
                style={{
                  flex: 1,
                  height: '4px',
                  borderRadius: '2px',
                  background: step <= currentStep 
                    ? 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)'
                    : '#e5e7eb'
                }}
              />
            ))}
          </div>
        </div>

        <div className="modal-body">
          {/* Step 1: Project Type and Services */}
          {currentStep === 1 && (
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#333'
              }}>
                ¿Qué tipo de proyecto necesitas?
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '15px',
                marginBottom: '30px'
              }}>
                {projectTypes.map((type) => {
                  const IconComponent = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setFormData(prev => ({ ...prev, projectType: type.id }))}
                      style={{
                        padding: '20px',
                        border: formData.projectType === type.id 
                          ? '2px solid #1e40af' 
                          : '2px solid #e5e7eb',
                        borderRadius: '12px',
                        background: formData.projectType === type.id 
                          ? '#1e40af10' 
                          : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'center'
                      }}
                    >
                      <IconComponent 
                        size={32} 
                        style={{ 
                          color: formData.projectType === type.id ? '#1e40af' : '#666',
                          marginBottom: '10px'
                        }} 
                      />
                      <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        marginBottom: '5px',
                        color: formData.projectType === type.id ? '#1e40af' : '#333'
                      }}>
                        {type.name}
                      </h4>
                      <p style={{
                        fontSize: '12px',
                        color: '#666',
                        lineHeight: '1.4'
                      }}>
                        {type.description}
                      </p>
                    </button>
                  )
                })}
              </div>

              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#333'
              }}>
                ¿Qué servicios necesitas? (Opcional)
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
                marginBottom: '30px'
              }}>
                {services.map((service) => {
                  const IconComponent = service.icon
                  const isSelected = formData.services.includes(service.id)
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      style={{
                        padding: '15px',
                        border: isSelected ? `2px solid ${service.color}` : '2px solid #e5e7eb',
                        borderRadius: '10px',
                        background: isSelected ? `${service.color}10` : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        textAlign: 'left'
                      }}
                    >
                      <IconComponent 
                        size={24} 
                        style={{ color: isSelected ? service.color : '#666' }} 
                      />
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: isSelected ? service.color : '#333'
                      }}>
                        {service.name}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '30px'
              }}>
                <button
                  onClick={nextStep}
                  disabled={!formData.projectType}
                  className="btn btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: !formData.projectType ? 0.5 : 1,
                    cursor: !formData.projectType ? 'not-allowed' : 'pointer'
                  }}
                >
                  Siguiente <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information and Project Details */}
          {currentStep === 2 && (
            <div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#333'
              }}>
                Información de Contacto
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div className="form-group">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div className="form-group">
                  <label>Teléfono *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+56 9 XXXX XXXX"
                  />
                </div>
                
                <div className="form-group">
                  <label>Empresa</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Ubicación del Proyecto *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Ciudad, Comuna, Región"
                />
              </div>

              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '15px',
                marginTop: '30px',
                color: '#333'
              }}>
                Cuéntanos sobre tu Proyecto
              </h3>
              
              <p style={{
                color: '#666',
                fontSize: '14px',
                marginBottom: '15px',
                lineHeight: '1.5'
              }}>
                Describe tu proyecto con el mayor detalle posible. Esto nos ayudará a preparar una cotización más precisa y coordinar una reunión si es necesario.
              </p>

              <div className="form-group">
                <label>Descripción Detallada del Proyecto *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  placeholder="Por favor, describe tu proyecto incluyendo:
• Tipo de trabajo que necesitas
• Dimensiones aproximadas o área a trabajar
• Materiales específicos si los conoces
• Plazos que manejas
• Cualquier requerimiento especial
• Presupuesto aproximado (opcional)

Ejemplo: 'Necesito instalación eléctrica para una tienda de 200m² en Las Condes. Incluye iluminación LED, tableros eléctricos y certificación SEC. El local está en obra gruesa y necesitamos terminar en 3 semanas...'"
                  rows="8"
                  style={{
                    minHeight: '200px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '30px'
              }}>
                <button
                  onClick={prevStep}
                  className="btn btn-secondary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <ArrowLeft size={18} /> Anterior
                </button>
                
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.phone || !formData.location || !formData.description || isSubmitting}
                  className="btn btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.description) ? 0.5 : 1,
                    cursor: (!formData.name || !formData.email || !formData.phone || !formData.location || !formData.description) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid #fff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Cotización <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default QuoteModal