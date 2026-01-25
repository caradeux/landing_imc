import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

const productos = [
  {
    title: 'Muebles de Cocina',
    description: 'Diseño y fabricación de cocinas a medida con materiales premium.',
    image: '/images/projects/remodelacion-cocinas-lujo/cocina-lujo-isla-central-marmol.jpg',
    precio: 'Desde $1.500.000',
    features: ['Diseño personalizado', 'Materiales premium', 'Instalación incluida'],
    color: '#e74c3c',
    whatsapp: 'Hola, me interesa cotizar muebles de cocina. ¿Podrían darme más información?'
  },
  {
    title: 'Clósets a Medida',
    description: 'Clósets y walk-in closets diseñados para optimizar tu espacio.',
    image: '/images/projects/remodelacion-penthouse/cocina-gabinetes-blancos-encimera.jpg',
    precio: 'Desde $800.000',
    features: ['Medidas exactas', 'Máximo aprovechamiento', 'Variedad de acabados'],
    color: '#9b59b6',
    whatsapp: 'Hola, me interesa cotizar un clóset a medida. ¿Podrían darme más información?'
  },
  {
    title: 'Barandas de Vidrio',
    description: 'Barandas de vidrio templado para balcones, escaleras y terrazas.',
    image: '/images/projects/easy-vina-del-mar/separacion-vidrio-retail-01.jpg',
    precio: 'Desde $150.000/ml',
    features: ['Vidrio templado 10mm', 'Acero inoxidable', 'Certificación SEC'],
    color: '#3498db',
    whatsapp: 'Hola, me interesa cotizar barandas de vidrio. ¿Podrían darme más información?'
  },
  {
    title: 'Espejos y Cristales',
    description: 'Instalación de espejos decorativos y cristales para todo tipo de espacios.',
    image: '/images/projects/easy-vina-del-mar/separacion-vidrio-retail-02.jpg',
    precio: 'Desde $50.000/m²',
    features: ['Corte a medida', 'Instalación segura', 'Diseños modernos'],
    color: '#1abc9c',
    whatsapp: 'Hola, me interesa cotizar espejos o cristales. ¿Podrían darme más información?'
  }
]

const ProductosEstrella = () => {
  const openWhatsApp = (message) => {
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/56988542926?text=${encoded}`, '_blank')
  }

  return (
    <section style={{
      padding: '80px 0',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
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
            background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'inline-block',
            marginBottom: '20px'
          }}>
            PRODUCTOS DESTACADOS
          </span>
          <h2 style={{
            color: 'white',
            fontSize: '2.8rem',
            fontWeight: '800',
            marginBottom: '15px'
          }}>
            Nuestros Servicios Estrella
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.1rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Especialistas en fabricación e instalación con los mejores materiales y garantía
          </p>
        </motion.div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '25px'
        }}>
          {productos.map((producto, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
              }}
            >
              {/* Image */}
              <div style={{
                height: '180px',
                backgroundImage: `url(${producto.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: producto.color,
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '15px',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  {producto.precio}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '25px' }}>
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  color: '#333'
                }}>
                  {producto.title}
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: '14px',
                  marginBottom: '15px',
                  lineHeight: '1.5'
                }}>
                  {producto.description}
                </p>

                {/* Features */}
                <div style={{ marginBottom: '20px' }}>
                  {producto.features.map((feature, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '6px'
                    }}>
                      <Check size={16} style={{ color: producto.color }} />
                      <span style={{ fontSize: '13px', color: '#555' }}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => openWhatsApp(producto.whatsapp)}
                  style={{
                    width: '100%',
                    background: `linear-gradient(135deg, ${producto.color} 0%, ${producto.color}dd 100%)`,
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                  whileHover={{ scale: 1.02, boxShadow: `0 8px 25px ${producto.color}50` }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cotiza Gratis <ArrowRight size={18} />
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
