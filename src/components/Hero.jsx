import React, { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParallaxSection from './ParallaxSection'
import { api } from '../lib/api'

// Imágenes reales de proyectos para el Hero
const heroImages = [
  {
    image: "/images/projects/remodelacion-cocinas-lujo/cocina-lujo-isla-central-marmol.jpg",
    title: "Remodelación de Cocinas Premium",
    subtitle: "Transformamos espacios con acabados de lujo"
  },
  {
    image: "/images/projects/edificio-greco-restauracion/vista-panoramica-edificio-greco.jpg",
    title: "Restauración de Edificios",
    subtitle: "Especialistas en trabajos de altura y restauración"
  },
  {
    image: "/images/projects/easy-vina-del-mar/separacion-vidrio-retail-01.jpg",
    title: "Obras Civiles Retail",
    subtitle: "Proyectos comerciales de alta calidad"
  },
  {
    image: "/images/projects/construccion-muros/muro-estucado-terminado.jpg",
    title: "Construcción y Albañilería",
    subtitle: "Muros y estructuras con garantía"
  },
  {
    image: "/images/projects/remodelacion-cocinas-lujo/cocina-premium-madera-marmol-negro.jpg",
    title: "Diseño de Interiores",
    subtitle: "Cocinas y espacios de alta gama"
  },
  {
    image: "/images/projects/edificio-greco-restauracion/baranda-pintada-despues-restauracion.jpg",
    title: "Pintura y Restauración",
    subtitle: "Acabados profesionales certificados"
  }
]

const Hero = ({ onQuoteClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState(heroImages)
  const [siteSettings, setSiteSettings] = useState({
    hero_title: "Líderes en Construcción y Servicios Especializados",
    hero_subtitle: "Más de 15 años transformando espacios retail, industriales y comerciales con la más alta calidad y profesionalismo.",
    cta_primary_text: "Cotizar Proyecto",
    cta_secondary_text: "Ver Servicios"
  })
  const { scrollYProgress } = useScroll()

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.8, 0])

  useEffect(() => {
    loadSiteSettings()
  }, [])

  const loadSiteSettings = async () => {
    try {
      const data = await api.getSiteSettings()
      if (data) {
        setSiteSettings(data)
      }
    } catch (error) {
      console.error('Error loading site settings:', error)
    }
  }

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [slides.length])

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
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          y: backgroundY,
          willChange: 'transform'
        }}
      >
        {slides.map((slide, index) => (
          <motion.div
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
              transition: 'opacity 1s ease-in-out',
              transform: currentSlide === index ? 'scale(1.05)' : 'scale(1)',
            }}
            initial={{ scale: 1.1 }}
            animate={{
              scale: currentSlide === index ? 1.05 : 1,
              opacity: currentSlide === index ? 1 : 0
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ))}

        {/* Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.75) 0%, rgba(15, 23, 42, 0.85) 100%)',
          zIndex: 2
        }} />
      </motion.div>

      {/* Content */}
      <motion.div
        className="container"
        style={{
          position: 'relative',
          zIndex: 3,
          y: contentY,
          opacity: contentOpacity,
          willChange: 'transform'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '500px',
          textAlign: 'center'
        }} className="hero-content">

          {/* Main Content */}
          <motion.div
            style={{
              color: 'white',
              maxWidth: '800px',
              margin: '0 auto'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Dynamic slide title */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                marginBottom: '20px',
                padding: '10px 25px',
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '30px',
                display: 'inline-block',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span style={{ fontSize: '1rem', fontWeight: '600' }}>
                {slides[currentSlide]?.subtitle}
              </span>
            </motion.div>

            <motion.h1
              itemProp="name"
              style={{
                fontSize: '4rem',
                fontWeight: '900',
                lineHeight: '1.1',
                marginBottom: '30px',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {siteSettings.hero_title}
            </motion.h1>

            <motion.p
              itemProp="description"
              style={{
                fontSize: '1.4rem',
                marginBottom: '50px',
                opacity: 0.95,
                lineHeight: '1.6',
                maxWidth: '700px',
                margin: '0 auto 50px'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.95, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              {siteSettings.hero_subtitle}
            </motion.p>

            <motion.div
              style={{
                display: 'flex',
                gap: '25px',
                marginBottom: '60px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <motion.button
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
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {siteSettings.cta_primary_text} <ArrowRight size={22} />
              </motion.button>

              <motion.button
                className="btn btn-secondary"
                onClick={() => document.querySelector('#services').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  borderColor: 'white',
                  color: 'white',
                  fontSize: '18px',
                  padding: '18px 36px',
                  fontWeight: '600'
                }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {siteSettings.cta_secondary_text}
              </motion.button>
            </motion.div>

            {/* Slide Indicators with thumbnails */}
            <motion.div
              style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                maxWidth: '500px',
                margin: '0 auto'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              {slides.map((slide, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: currentSlide === index ? '50px' : '14px',
                    height: '14px',
                    borderRadius: currentSlide === index ? '7px' : '50%',
                    border: 'none',
                    background: currentSlide === index ? 'white' : 'rgba(255, 255, 255, 0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: currentSlide === index ? '0 4px 15px rgba(255, 255, 255, 0.3)' : 'none'
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

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
