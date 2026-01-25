import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = '56988542926'

  const quickMessages = [
    { label: 'Cotizar Proyecto', message: 'Hola, me interesa cotizar un proyecto. ¿Podrían darme más información?' },
    { label: 'Muebles de Cocina', message: 'Hola, me interesa cotizar muebles de cocina. ¿Podrían darme más información?' },
    { label: 'Clósets a Medida', message: 'Hola, me interesa cotizar un clóset a medida. ¿Podrían darme más información?' },
    { label: 'Barandas de Vidrio', message: 'Hola, me interesa cotizar barandas de vidrio. ¿Podrían darme más información?' },
    { label: 'Espejos y Cristales', message: 'Hola, me interesa cotizar espejos o cristales. ¿Podrían darme más información?' },
    { label: 'Remodelación', message: 'Hola, me interesa cotizar una remodelación. ¿Podrían darme más información?' },
    { label: 'Obras Civiles', message: 'Hola, me interesa cotizar obras civiles. ¿Podrían darme más información?' },
    { label: 'Pintura', message: 'Hola, me interesa cotizar trabajos de pintura. ¿Podrían darme más información?' }
  ]

  const openWhatsApp = (message) => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank')
    setIsOpen(false)
  }

  return (
    <>
      {/* Quick Message Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '25px',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
              padding: '20px',
              zIndex: 9998,
              width: '300px',
              maxWidth: 'calc(100vw - 50px)'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '15px',
              paddingBottom: '15px',
              borderBottom: '1px solid #eee'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#333', fontSize: '15px' }}>
                    IMC Servicios
                  </div>
                  <div style={{ fontSize: '12px', color: '#25D366', fontWeight: '600' }}>
                    En línea
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: '#f5f5f5',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} color="#666" />
              </button>
            </div>

            {/* Welcome Message */}
            <div style={{
              background: '#e8f5e9',
              padding: '12px 15px',
              borderRadius: '10px',
              marginBottom: '12px',
              fontSize: '14px',
              color: '#2e7d32',
              lineHeight: '1.4'
            }}>
              ¿En qué podemos ayudarte?
            </div>

            {/* Quick Message Buttons - Simple List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {quickMessages.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => openWhatsApp(item.message)}
                  style={{
                    background: 'white',
                    color: '#333',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    padding: '11px 14px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                  whileHover={{
                    background: '#25D366',
                    color: 'white',
                    borderColor: '#25D366'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '25px',
          right: '25px',
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 25px rgba(37, 211, 102, 0.5)',
          zIndex: 9999
        }}
        whileHover={{ scale: 1.1, boxShadow: '0 8px 30px rgba(37, 211, 102, 0.6)' }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: isOpen ? 1 : [1, 1.1, 1],
        }}
        transition={{
          scale: { repeat: isOpen ? 0 : Infinity, repeatDelay: 3, duration: 0.5 }
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} color="white" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse Animation Ring */}
      {!isOpen && (
        <motion.div
          style={{
            position: 'fixed',
            bottom: '25px',
            right: '25px',
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            border: '3px solid #25D366',
            zIndex: 9998,
            pointerEvents: 'none'
          }}
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.7, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      )}
    </>
  )
}

export default WhatsAppButton
