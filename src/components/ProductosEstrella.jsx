import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Zap, Hammer, Wrench, Home, Palette, Shield } from 'lucide-react'
import { api } from '../lib/api'

const iconMap = {
  Zap,
  Hammer,
  Wrench,
  Home,
  Palette,
  Shield
}

const ProductosEstrella = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedServices()
  }, [])

  const fetchFeaturedServices = async () => {
    try {
      const services = await api.getFeaturedServices()

      // Parse features if they are strings and add icons
      const servicesWithData = (services || []).map(service => ({
        ...service,
        icon: iconMap[service.icon] || Zap,
        features: typeof service.features === 'string'
          ? JSON.parse(service.features)
          : service.features || [],
        whatsapp: `Hola, me interesa cotizar ${service.title}. ¿Podrían darme más información?`
      }))

      setProductos(servicesWithData)
    } catch (error) {
      console.error('Error al cargar productos destacados:', error)
    } finally {
      setLoading(false)
    }
  }

  const openWhatsApp = (message) => {
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/56988542926?text=${encoded}`, '_blank')
  }

  if (loading) {
    return (
      <section id="destacados" style={{
        padding: '80px 0',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ color: 'white' }}>Cargando productos destacados...</div>
        </div>
      </section>
    )
  }

  if (productos.length === 0) {
    return null // No mostrar sección si no hay productos destacados
  }

  return (
    <section id="destacados" style={{
      padding: '80px 0',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '50px' }}
        >
          <span style={{
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            color: '#1e40af',
            padding: '8px 24px',
            borderRadius: '25px',
            fontSize: '13px',
            fontWeight: '800',
            display: 'inline-block',
            marginBottom: '20px',
            letterSpacing: '1px',
            boxShadow: '0 4px 20px rgba(251, 191, 36, 0.3)'
          }}>
            LO MAS SOLICITADO
          </span>
          <h2 style={{
            color: 'white',
            fontSize: '2.8rem',
            fontWeight: '800',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            Lo Mas Solicitado
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Especialistas en muebles a medida, vidrios y cristales para tu hogar
          </p>
        </motion.div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1300px',
          margin: '0 auto'
        }}>
          {productos.map((producto, index) => (
            <motion.div
              key={producto.id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{
                background: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 60px rgba(0,0,0,0.25)'
              }}
            >
              {/* Image */}
              <div style={{
                height: '220px',
                backgroundImage: `url(${producto.image_url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)`
                }} />
              </div>

              {/* Content */}
              <div style={{ padding: '28px' }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  marginBottom: '12px',
                  color: '#1e293b'
                }}>
                  {producto.title}
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '15px',
                  marginBottom: '20px',
                  lineHeight: '1.6'
                }}>
                  {producto.description}
                </p>

                {/* Features */}
                <div style={{ marginBottom: '24px' }}>
                  {producto.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '8px'
                    }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: `${producto.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Check size={12} style={{ color: producto.color }} />
                      </div>
                      <span style={{ fontSize: '14px', color: '#475569', fontWeight: '500' }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => openWhatsApp(producto.whatsapp)}
                  style={{
                    width: '100%',
                    background: `linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 8px 25px rgba(245, 158, 11, 0.35)'
                  }}
                  whileHover={{ scale: 1.02, boxShadow: '0 12px 30px rgba(245, 158, 11, 0.45)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cotiza Gratis <ArrowRight size={20} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductosEstrella
