import React, { useState } from 'react'
import { Zap, Hammer, Wrench, Home, Palette, Shield, ArrowRight } from 'lucide-react'

const Services = () => {

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
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
    <section id="services" className="section" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      position: 'relative',
      overflow: 'hidden',
      width: '100vw',
      marginLeft: 'calc(-50vw + 50%)'
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-200px',
        right: '-200px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 1
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(251, 191, 36, 0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 1
      }} />

      <div style={{ 
        position: 'relative', 
        zIndex: 2,
        maxWidth: 'none',
        width: '100%',
        padding: '100px 40px'
      }}>
        <div className="section-title" style={{ textAlign: 'center', marginBottom: '100px' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 24px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(96, 165, 250, 0.1) 100%)',
            borderRadius: '25px',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            marginBottom: '30px',
            backdropFilter: 'blur(10px)'
          }}>
            <span style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#3b82f6',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              ✨ Servicios Profesionales
            </span>
        </div>

          <h2 style={{ 
            fontSize: '3.5rem', 
            fontWeight: '900', 
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 30%, #60a5fa 60%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '30px',
            lineHeight: '1.2',
            textShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
          }}>
            Nuestros Servicios Especializados
          </h2>
          
          <p style={{ 
            fontSize: '1.4rem', 
            color: '#64748b', 
            maxWidth: '950px', 
            margin: '0 auto',
            lineHeight: '1.8',
            fontWeight: '400'
          }}>
            Ofrecemos soluciones integrales para proyectos retail, industriales y comerciales con la más alta calidad y certificaciones profesionales
          </p>
          
        <div style={{
            marginTop: '40px',
          display: 'flex',
          justifyContent: 'center',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)'
            }} />
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
            }} />
            <div style={{
              width: '60px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)'
            }} />
          </div>
        </div>

        {/* All Services Grid */}
        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '20px',
          maxWidth: 'none',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className="service-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: '28px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 70px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(25px)',
                  position: 'relative',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  transform: 'translateY(0)',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
                  e.currentTarget.style.boxShadow = `0 40px 100px rgba(0, 0, 0, 0.2), 0 0 0 1px ${service.color}20`
                  e.currentTarget.style.borderColor = `${service.color}40`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 25px 70px rgba(0, 0, 0, 0.15)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                }}
              >
                {/* Decorative Elements */}
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '120px',
                  height: '120px',
                  background: `radial-gradient(circle, ${service.color}15 0%, transparent 70%)`,
                  borderRadius: '50%',
                  zIndex: 1
                }} />
                
        <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-20px',
                  width: '80px',
                  height: '80px',
                  background: `radial-gradient(circle, ${service.color}10 0%, transparent 70%)`,
                  borderRadius: '50%',
                  zIndex: 1
                }} />

                {/* Service Image */}
                <div className="service-image" style={{
                  height: '220px',
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  borderRadius: '28px 28px 0 0',
                  overflow: 'hidden'
        }}>
          <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(135deg, ${service.color}15 0%, ${service.color}25 50%, transparent 100%)`,
                    transition: 'all 0.3s ease'
                  }} />
                  
                  {/* Shimmer Effect */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                    transition: 'left 0.6s ease',
                    opacity: 0
                  }} className="shimmer-effect" />
                  
                  {/* Floating Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    background: 'rgba(255, 255, 255, 0.98)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: service.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      ✓ Certificado
                    </span>
                  </div>

                  {/* Service Icon */}
              <div style={{
                    position: 'absolute',
                    bottom: '18px',
                    left: '18px',
                    width: '45px',
                    height: '45px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)`,
                display: 'flex',
                alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 10px 30px ${service.color}50`,
                    transform: 'translateY(0)',
                    transition: 'all 0.3s ease'
                  }}>
                    <IconComponent size={22} style={{ color: 'white' }} />
                  </div>
                </div>

                {/* Service Content */}
                <div className="service-content" style={{ 
                  padding: '25px',
                  position: 'relative',
                  zIndex: 2
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '900',
                    color: '#1e293b',
                    marginBottom: '15px',
                    marginTop: 0,
                    lineHeight: '1.3',
                    background: `linear-gradient(135deg, #1e293b 0%, ${service.color} 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    {service.title}
                </h3>

              <p style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    marginBottom: '25px',
                    lineHeight: '1.6',
                    fontWeight: '400'
                  }}>
                    {service.description}
                  </p>

                  <div style={{ marginBottom: '30px' }}>
                <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '800',
                      marginBottom: '15px',
                      color: '#1e293b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '4px',
                        height: '16px',
                        background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)`,
                        borderRadius: '2px',
                        boxShadow: `0 2px 8px ${service.color}40`
                      }} />
                      Servicios:
                </h4>
                
                <div style={{
                  display: 'grid',
                      gridTemplateColumns: '1fr',
                      gap: '8px'
                }}>
                      {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                          padding: '8px 12px',
                          background: 'rgba(248, 250, 252, 0.9)',
                          borderRadius: '10px',
                          border: '1px solid rgba(226, 232, 240, 0.6)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = `rgba(${parseInt(service.color.slice(1, 3), 16)}, ${parseInt(service.color.slice(3, 5), 16)}, ${parseInt(service.color.slice(5, 7), 16)}, 0.08)`
                          e.currentTarget.style.borderColor = `${service.color}40`
                          e.currentTarget.style.transform = 'translateX(4px)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(248, 250, 252, 0.9)'
                          e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.6)'
                          e.currentTarget.style.transform = 'translateX(0)'
                        }}
                        >
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                            background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)`,
                            boxShadow: `0 2px 8px ${service.color}50`
                      }} />
                      <span style={{
                            fontSize: '13px',
                            color: '#475569',
                            fontWeight: '600'
                      }}>
                        {feature}
                      </span>
                    </div>
                  ))}
                      {service.features.length > 3 && (
                        <div style={{
                          fontSize: '12px',
                          color: service.color,
                          fontWeight: '700',
                          textAlign: 'center',
                          padding: '8px',
                          background: `rgba(${parseInt(service.color.slice(1, 3), 16)}, ${parseInt(service.color.slice(3, 5), 16)}, ${parseInt(service.color.slice(5, 7), 16)}, 0.12)`,
                          borderRadius: '10px',
                          border: `1px solid ${service.color}40`,
                          boxShadow: `0 2px 8px ${service.color}30`
                        }}>
                          +{service.features.length - 3} servicios más
                        </div>
                      )}
                </div>
              </div>

              <button 
                className="btn btn-primary"
                style={{
                      background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '16px 20px',
                      fontSize: '14px',
                      fontWeight: '700',
                      borderRadius: '14px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: `0 10px 30px ${service.color}50`,
                      width: '100%',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'
                      e.currentTarget.style.boxShadow = `0 15px 40px ${service.color}60`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)'
                      e.currentTarget.style.boxShadow = `0 10px 30px ${service.color}50`
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 2 }}>
                      Solicitar Cotización
                    </span>
                    <ArrowRight size={16} style={{ position: 'relative', zIndex: 2 }} />
                    
                    {/* Button Shimmer */}
              <div style={{
                position: 'absolute',
                top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                      transition: 'left 0.6s ease',
                      opacity: 0
                    }} className="button-shimmer" />
                  </button>
            </div>
          </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .service-card:hover .shimmer-effect {
          opacity: 1;
          left: 100%;
        }
        
        .service-card:hover .button-shimmer {
          opacity: 1;
          left: 100%;
        }
        
        .service-card:hover .service-image > div:last-child {
          transform: translateY(-5px);
        }
        
        .service-card:hover .service-image > div:nth-child(2) {
          transform: translateY(-3px);
        }
        
        @media (max-width: 1400px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 25px !important;
          }
        }
        
        @media (max-width: 1000px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            padding: 0 10px !important;
          }
          
          .service-card h3 {
            font-size: 1.6rem !important;
          }
          
          .service-card p {
            font-size: 1rem !important;
          }
          
          .service-image {
            height: 220px !important;
          }
          
          .service-content {
            padding: 25px !important;
          }
        }
        
        @media (max-width: 480px) {
          .service-card h3 {
            font-size: 1.4rem !important;
          }
          
          .service-image {
            height: 200px !important;
          }
          
          .service-content {
            padding: 20px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Services