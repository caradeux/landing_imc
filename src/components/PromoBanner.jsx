import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, ArrowRight } from 'lucide-react'

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })

  // Countdown to end of month
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)
      const difference = endOfMonth - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 60000)
    return () => clearInterval(timer)
  }, [])

  const openWhatsApp = () => {
    const message = encodeURIComponent('Hola, vi la promoción del mes en su sitio web y me interesa cotizar. ¿Podrían darme más información?')
    window.open(`https://wa.me/56988542926?text=${message}`, '_blank')
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
          color: 'white',
          padding: '14px 20px',
          position: 'relative',
          zIndex: 100
        }}
      >
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            {/* Promo Text */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#1e40af',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '800',
                textTransform: 'uppercase',
                boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)',
                letterSpacing: '0.5px'
              }}>
                Promo Enero
              </span>

              <span style={{ fontSize: '15px', fontWeight: '600' }}>
                Instalacion GRATIS en Muebles de Cocina
              </span>

              {/* Countdown */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255,255,255,0.15)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600'
              }}>
                <Clock size={14} />
                <span>Termina en {timeLeft.days}d {timeLeft.hours}h</span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={openWhatsApp}
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                color: '#1e40af',
                border: 'none',
                borderRadius: '25px',
                padding: '10px 24px',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(251, 191, 36, 0.4)'
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 6px 25px rgba(251, 191, 36, 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              Quiero mi Promo <ArrowRight size={16} />
            </motion.button>

            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                opacity: 0.7,
                padding: '5px'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default PromoBanner
