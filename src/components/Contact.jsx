import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Instagram, Facebook, MessageCircle } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 2000)
  }

  const services = [
    'Servicios Eléctricos',
    'Obras Civiles',
    'Carpintería Especializada',
    'Techumbres Industriales',
    'Acabados Premium',
    'Soldadura Certificada',
    'Otro'
  ]

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      info: '+56 9 8854 2926',
      link: 'tel:+56988542926',
      color: '#1e40af'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'contacto@imcs.cl',
      link: 'mailto:contacto@imcs.cl',
      color: '#0f172a'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      info: 'Región Metropolitana, Santiago, Chile',
      link: '#',
      color: '#dc2626'
    },
    {
      icon: Clock,
      title: 'Horarios',
      info: 'Lun-Vie: 8:00-18:00 | Emergencias 24/7',
      link: '#',
      color: '#ea580c'
    }
  ]

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-title">
          <h2>Contáctanos</h2>
          <p>Estamos listos para hacer realidad tu próximo proyecto. Contáctanos para una cotización personalizada</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'start'
        }} className="contact-grid">
          
          {/* Contact Information */}
          <div>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '30px',
              background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Información de Contacto
            </h3>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              marginBottom: '40px'
            }}>
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={index}
                    href={item.link}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '20px',
                      padding: '20px',
                      background: 'white',
                      borderRadius: '16px',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s ease',
                      border: '1px solid #f0f0f0'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}>
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        marginBottom: '5px',
                        color: '#333'
                      }}>
                        {item.title}
                      </h4>
                      <p style={{
                        color: '#666',
                        fontSize: '15px'
                      }}>
                        {item.info}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>

            {/* Social Media */}
            <div>
              <h4 style={{
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#333'
              }}>
                Síguenos en Redes Sociales
              </h4>
              
              <div style={{
                display: 'flex',
                gap: '15px'
              }}>
                <a
                  href="https://instagram.com/imcservicioschile"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #E4405F 0%, #C13584 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Instagram size={24} />
                </a>
                
                <a
                  href="https://facebook.com/imcservicioschile"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #1877F2 0%, #42A5F5 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Facebook size={24} />
                </a>
                
                <a
                  href="https://wa.me/56988542926"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <MessageCircle size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f0f0f0'
          }}>
            <h3 style={{
              fontSize: '1.8rem',
              fontWeight: '700',
              marginBottom: '30px',
              color: '#333'
            }}>
              Solicita tu Cotización
            </h3>

            {isSubmitted ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#22c55e'
              }}>
                <CheckCircle size={60} style={{ marginBottom: '20px' }} />
                <h4 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  marginBottom: '15px'
                }}>
                  ¡Mensaje Enviado!
                </h4>
                <p style={{ color: '#666' }}>
                  Gracias por contactarnos. Te responderemos en las próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
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
                  <label>Servicio de Interés *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Mensaje *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Cuéntanos sobre tu proyecto..."
                    rows="5"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: isSubmitting 
                      ? '#ccc' 
                      : 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid #fff',
                        borderTop: '2px solid transparent',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }} />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact