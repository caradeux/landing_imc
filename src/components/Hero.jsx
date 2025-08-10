import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

const Hero = ({ onQuoteClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "Líderes en Construcción y Servicios Especializados",
      subtitle: "Más de 15 años transformando espacios retail, industriales y comerciales con la más alta calidad y profesionalismo.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Servicios Eléctricos Certificados",
      subtitle: "Instalaciones domiciliarias, electricidad semi-industrial y sistemas de automatización con certificación SEC.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
    },
    {
      title: "Obras Civiles de Alta Resistencia",
      subtitle: "Hormigón especializado, fundaciones y estructuras de concreto con control de calidad certificado.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])



  return (
    <main>
    <section id="hero" itemScope itemType="https://schema.org/Organization" style={{
      position: 'relative',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#000'
    }}>
      {/* Background Slider */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            }}
          />
        ))}
        
        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.85) 0%, rgba(15, 23, 42, 0.85) 100%)',
          zIndex: 2
        }} />
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '500px',
          textAlign: 'center'
        }} className="hero-content">
          
          {/* Main Content */}
          <div style={{ 
            color: 'white',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h1 itemProp="name" style={{
              fontSize: '4rem',
              fontWeight: '900',
              lineHeight: '1.1',
              marginBottom: '30px',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}>
              {slides[currentSlide].title}
            </h1>
            
            <p itemProp="description" style={{
              fontSize: '1.4rem',
              marginBottom: '50px',
              opacity: 0.95,
              lineHeight: '1.6',
              maxWidth: '700px',
              margin: '0 auto 50px'
            }}>
              {slides[currentSlide].subtitle}
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '25px', 
              marginBottom: '60px', 
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <button 
                className="btn btn-primary"
                onClick={onQuoteClick}
                style={{
                  background: 'white',
                  color: '#1e40af',
                  fontSize: '18px',
                  padding: '18px 36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontWeight: '700'
                }}
              >
                Cotizar Proyecto <ArrowRight size={22} />
              </button>
              
              <button 
                className="btn btn-secondary"
                onClick={() => document.querySelector('#services').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  borderColor: 'white',
                  color: 'white',
                  fontSize: '18px',
                  padding: '18px 36px',
                  fontWeight: '600'
                }}
              >
                Ver Servicios
              </button>
            </div>

            {/* Slide Indicators */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    border: 'none',
                    background: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: currentSlide === index ? '0 4px 15px rgba(255, 255, 255, 0.3)' : 'none'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.8rem !important;
          }
          
          .hero-content p {
            font-size: 1.2rem !important;
          }
          
          .hero-content > div {
            padding: 0 20px;
          }
        }
        
        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 2.2rem !important;
          }
          
          .hero-content p {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </section>
    </main>
  )
}

export default Hero