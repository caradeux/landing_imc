import React from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, PenTool, Hammer, CheckCircle } from 'lucide-react'

const pasos = [
  {
    icon: MessageSquare,
    numero: '01',
    title: 'Cotización',
    description: 'Cuéntanos tu proyecto y te enviamos un presupuesto sin compromiso en 24 horas.',
    color: '#3498db'
  },
  {
    icon: PenTool,
    numero: '02',
    title: 'Diseño',
    description: 'Creamos el diseño personalizado según tus necesidades y espacio disponible.',
    color: '#9b59b6'
  },
  {
    icon: Hammer,
    numero: '03',
    title: 'Fabricación',
    description: 'Fabricamos con materiales de primera calidad en nuestro taller especializado.',
    color: '#e74c3c'
  },
  {
    icon: CheckCircle,
    numero: '04',
    title: 'Instalación',
    description: 'Instalamos en tu hogar con garantía incluida y limpieza del espacio.',
    color: '#27ae60'
  }
]

const ProcesoTrabajo = () => {
  return (
    <section style={{
      padding: '80px 0',
      background: '#f8fafc'
    }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <span style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            display: 'inline-block',
            marginBottom: '20px'
          }}>
            CÓMO TRABAJAMOS
          </span>
          <h2 style={{
            color: '#333',
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '15px'
          }}>
            Proceso Simple y Transparente
          </h2>
          <p style={{
            color: '#666',
            fontSize: '1.1rem',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            De la idea a la realidad en 4 simples pasos
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          position: 'relative'
        }}>
          {/* Connection Line (desktop) */}
          <div style={{
            position: 'absolute',
            top: '60px',
            left: '15%',
            right: '15%',
            height: '3px',
            background: 'linear-gradient(90deg, #3498db, #9b59b6, #e74c3c, #27ae60)',
            borderRadius: '2px',
            zIndex: 0,
            display: 'none'
          }} className="connection-line" />

          {pasos.map((paso, index) => {
            const IconComponent = paso.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                style={{
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                {/* Icon Circle */}
                <motion.div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px',
                    boxShadow: `0 10px 40px ${paso.color}30`,
                    border: `3px solid ${paso.color}`,
                    position: 'relative'
                  }}
                  whileHover={{ scale: 1.1, boxShadow: `0 15px 50px ${paso.color}40` }}
                >
                  <IconComponent size={40} style={{ color: paso.color }} />

                  {/* Number badge */}
                  <div style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    background: paso.color,
                    color: 'white',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: '800',
                    border: '3px solid white'
                  }}>
                    {paso.numero}
                  </div>
                </motion.div>

                {/* Content */}
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '10px',
                  color: '#333'
                }}>
                  {paso.title}
                </h3>
                <p style={{
                  color: '#666',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  maxWidth: '250px',
                  margin: '0 auto'
                }}>
                  {paso.description}
                </p>

                {/* Arrow (except last) */}
                {index < pasos.length - 1 && (
                  <div style={{
                    position: 'absolute',
                    right: '-20px',
                    top: '45px',
                    color: '#ddd',
                    fontSize: '24px',
                    display: 'none'
                  }} className="step-arrow">
                    →
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: '50px' }}
        >
          <motion.button
            onClick={() => {
              const encoded = encodeURIComponent('Hola, me interesa cotizar un proyecto. ¿Podrían darme más información?')
              window.open(`https://wa.me/56988542926?text=${encoded}`, '_blank')
            }}
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              padding: '16px 40px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)'
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(37, 211, 102, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            Comenzar Ahora - Cotiza Gratis
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .connection-line {
            display: block !important;
          }
          .step-arrow {
            display: block !important;
          }
        }
      `}</style>
    </section>
  )
}

export default ProcesoTrabajo
