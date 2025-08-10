import React, { useState } from 'react'
import { Zap, Hammer, Wrench, Home, Palette, Shield, ArrowRight } from 'lucide-react'

const Services = () => {
  const [activeService, setActiveService] = useState(0)

  const services = [
    {
      icon: Zap,
      title: "Servicios Eléctricos",
      description: "Instalaciones certificadas y sistemas de automatización",
      features: [
        "Instalaciones domiciliarias certificadas",
        "Electricidad semi-industrial",
        "Sistemas de iluminación LED",
        "Automatización y control",
        "Mantenimiento preventivo",
        "Certificaciones SEC"
      ],
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "#1e40af"
    },
    {
      icon: Hammer,
      title: "Obras Civiles",
      description: "Construcción de alta resistencia y calidad certificada",
      features: [
        "Hormigón de alta resistencia",
        "Enfierraduras especializadas",
        "Fundaciones y cimientos",
        "Estructuras de concreto",
        "Pavimentación industrial",
        "Control de calidad certificado"
      ],
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "#0f172a"
    },
    {
      icon: Wrench,
      title: "Carpintería Especializada",
      description: "Soluciones arquitectónicas y mobiliario comercial",
      features: [
        "Carpintería en metalcom",
        "Estructuras de aluminio",
        "Mobiliario comercial",
        "Soluciones arquitectónicas",
        "Acabados de lujo",
        "Diseño personalizado"
      ],
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "#dc2626"
    },
    {
      icon: Home,
      title: "Techumbres Industriales",
      description: "Cubiertas metálicas y sistemas de protección",
      features: [
        "Cubiertas metálicas",
        "Sistemas de drenaje",
        "Aislación térmica",
        "Impermeabilización",
        "Mantenimiento especializado",
        "Garantía extendida"
      ],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "#ea580c"
    },
    {
      icon: Palette,
      title: "Acabados Premium",
      description: "Pintura industrial y acabados especiales",
      features: [
        "Pintura industrial",
        "Acabados especiales",
        "Protección anticorrosiva",
        "Sistemas de recubrimiento",
        "Preparación de superficies",
        "Control de calidad"
      ],
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "#059669"
    },
    {
      icon: Shield,
      title: "Soldadura Certificada",
      description: "Soldadura especializada con certificación AWS",
      features: [
        "Soldadura especializada",
        "Estructuras metálicas",
        "Certificación AWS",
        "Soldadura bajo agua",
        "Reparaciones industriales",
        "Control de calidad"
      ],
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      color: "#7c3aed"
    }
  ]

  return (
    <section id="services" className="section" style={{ background: '#f8fafc' }}>
      <div className="container">
        <div className="section-title">
          <h2>Nuestros Servicios Especializados</h2>
          <p>Ofrecemos soluciones integrales para proyectos retail, industriales y comerciales con la más alta calidad y certificaciones</p>
        </div>

        {/* Service Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  border: 'none',
                  borderRadius: '25px',
                  background: activeService === index 
                    ? `linear-gradient(135deg, ${service.color} 0%, ${service.color}aa 100%)`
                    : 'white',
                  color: activeService === index ? 'white' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: activeService === index 
                    ? `0 4px 15px ${service.color}40`
                    : '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              >
                <IconComponent size={18} />
                {service.title}
              </button>
            )
          })}
        </div>

        {/* Active Service Content */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid #f0f0f0'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            minHeight: '500px'
          }} className="service-content">
            
            {/* Left - Content */}
            <div style={{ padding: '50px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}>
                {React.createElement(services[activeService].icon, {
                  size: 40,
                  style: { color: services[activeService].color }
                })}
                <h3 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#333'
                }}>
                  {services[activeService].title}
                </h3>
              </div>

              <p style={{
                fontSize: '1.2rem',
                color: '#666',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>
                {services[activeService].description}
              </p>

              <div style={{ marginBottom: '40px' }}>
                <h4 style={{
                  fontSize: '1.3rem',
                  fontWeight: '600',
                  marginBottom: '20px',
                  color: '#333'
                }}>
                  Servicios Incluidos:
                </h4>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px'
                }}>
                  {services[activeService].features.map((feature, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 0'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: services[activeService].color
                      }} />
                      <span style={{
                        fontSize: '15px',
                        color: '#555'
                      }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="btn btn-primary"
                style={{
                  background: `linear-gradient(135deg, ${services[activeService].color} 0%, ${services[activeService].color}cc 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                Solicitar Cotización <ArrowRight size={18} />
              </button>
            </div>

            {/* Right - Image */}
            <div style={{
              backgroundImage: `url(${services[activeService].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${services[activeService].color}20 0%, ${services[activeService].color}40 100%)`
              }} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .service-content {
            grid-template-columns: 1fr !important;
          }
          
          .service-content > div:first-child {
            padding: 30px 20px !important;
          }
          
          .service-content > div:last-child {
            min-height: 300px;
          }
        }
      `}</style>
    </section>
  )
}

export default Services