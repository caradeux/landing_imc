import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Carlos Mendoza",
      position: "Gerente de Operaciones",
      company: "Jumbo",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      text: "IMC Servicios Chile ha sido nuestro socio estratégico en más de 50 remodelaciones. Su profesionalismo, cumplimiento de plazos y calidad excepcional los convierte en nuestra primera opción para proyectos críticos.",
      rating: 5,
      project: "50+ Remodelaciones Jumbo"
    },
    {
      name: "María González",
      position: "Directora de Infraestructura",
      company: "Construmart",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      text: "La expertise técnica de IMC Servicios Chile en instalaciones eléctricas industriales es incomparable. Han ejecutado proyectos complejos con una precisión y seguridad que supera nuestras expectativas.",
      rating: 5,
      project: "Construcción Bodega Industrial"
    },
    {
      name: "Roberto Silva",
      position: "Jefe de Proyectos",
      company: "Easy",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      text: "Su capacidad de adaptación y solución de problemas complejos es extraordinaria. IMC Servicios Chile no solo ejecuta, sino que propone mejoras que optimizan nuestros procesos y reducen costos.",
      rating: 5,
      project: "Modernización Easy Providencia"
    },
    {
      name: "Ana Martínez",
      position: "Gerente de Operaciones",
      company: "Santa Isabel",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      text: "La calidad de sus acabados y la atención al detalle es impresionante. Cada proyecto que realizan supera nuestras expectativas y se entrega en los tiempos acordados.",
      rating: 5,
      project: "Centro Logístico Santa Isabel"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const getCompanyColor = (company) => {
    const colors = {
      'Jumbo': '#1e40af',
      'Construmart': '#0f172a',
      'Easy': '#dc2626',
      'Santa Isabel': '#ea580c'
    }
    return colors[company] || '#1e40af'
  }

  return (
    <section id="testimonials" className="section" style={{
      background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-title">
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '8px 20px',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '700',
            marginBottom: '20px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            💬 TESTIMONIOS
          </div>

          <h2 style={{
            color: 'white',
            textShadow: '0 0 20px rgba(0, 0, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.6)',
            fontSize: '3rem',
            fontWeight: '900',
            marginBottom: '20px',
            lineHeight: '1.1',
            filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))'
          }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.95)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 20px rgba(255, 255, 255, 0.8)'
            }}>
              Lo que Dicen Nuestros
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 15px rgba(251, 191, 36, 0.6)'
            }}>
              Clientes
            </span>
          </h2>
          <p style={{
            color: 'white',
            fontSize: '1.3rem',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
            fontWeight: '500',
            opacity: 0.95
          }}>
            La confianza de nuestros clientes es nuestro mayor logro
          </p>
        </div>

        {/* Main Testimonial */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '50px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '40px',
          position: 'relative'
        }}>
          {/* Quote Icon */}
          <Quote
            size={60}
            style={{
              position: 'absolute',
              top: '20px',
              right: '30px',
              opacity: 0.3
            }}
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
            gap: '40px',
            alignItems: 'center'
          }} className="testimonial-grid">

            {/* Client Photo */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundImage: `url(${testimonials[currentTestimonial].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              flexShrink: 0
            }} />

            {/* Testimonial Content */}
            <div>
              <div style={{
                display: 'flex',
                gap: '4px',
                marginBottom: '20px'
              }}>
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" style={{ color: '#ffd700' }} />
                ))}
              </div>

              <p style={{
                fontSize: '1.3rem',
                lineHeight: '1.7',
                marginBottom: '25px',
                fontStyle: 'italic',
                opacity: 0.95
              }}>
                "{testimonials[currentTestimonial].text}"
              </p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'end',
                flexWrap: 'wrap',
                gap: '20px'
              }}>
                <div>
                  <h4 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    marginBottom: '5px'
                  }}>
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p style={{
                    opacity: 0.9,
                    marginBottom: '5px'
                  }}>
                    {testimonials[currentTestimonial].position}
                  </p>
                  <div style={{
                    background: getCompanyColor(testimonials[currentTestimonial].company),
                    padding: '6px 12px',
                    borderRadius: '15px',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>

                <div style={{
                  textAlign: 'right',
                  opacity: 0.8
                }}>
                  <p style={{ fontSize: '14px', marginBottom: '5px' }}>
                    Proyecto:
                  </p>
                  <p style={{ fontWeight: '600' }}>
                    {testimonials[currentTestimonial].project}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextTestimonial}
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '40px'
        }}>
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 15px',
                background: currentTestimonial === index
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '20px',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px'
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundImage: `url(${testimonial.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <span style={{ fontWeight: '600' }}>
                {testimonial.company}
              </span>
            </button>
          ))}
        </div>

        {/* Call to Action */}
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{
            color: 'white',
            fontSize: '1.8rem',
            fontWeight: '700',
            marginBottom: '15px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}>
            ¿Quieres ser nuestro próximo cliente satisfecho?
          </h3>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '1.1rem',
            marginBottom: '25px'
          }}>
            Únete a las empresas líderes que confían en nuestra experiencia y profesionalismo
          </p>
          <button
            style={{
              background: 'white',
              color: '#1e40af',
              border: 'none',
              padding: '15px 35px',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 12px 35px rgba(255, 255, 255, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.2)'
            }}
            onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
          >
            Solicitar Cotización
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .testimonial-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 30px !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Testimonials