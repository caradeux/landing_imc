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
          background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
          color: 'white',
          padding: '12px 20px',
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
                background: 'rgba(255,255,255,0.2)',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '12px',
                fontWeight: '700',
                textTransform: 'uppercase'
              }}>
                Oferta del Mes
              </span>

              <span style={{ fontSize: '15px', fontWeight: '600' }}>
                15% OFF en Muebles de Cocina
              </span>

              {/* Countdown */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(0,0,0,0.2)',
                padding: '4px 12px',
                borderRadius: '15px',
                fontSize: '13px'
              }}>
                <Clock size={14} />
                <span>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={openWhatsApp}
              style={{
                background: 'white',
                color: '#e74c3c',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 20px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Cotiza Ahora <ArrowRight size={16} />
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
