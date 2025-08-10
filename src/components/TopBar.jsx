import React from 'react'
import { Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'

const TopBar = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
      color: 'white',
      padding: '8px 0',
      fontSize: '14px'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={14} />
              <span>+56 9 8854 2926</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} />
              <span>contacto@imcs.cl</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} />
              <span>Lun-Vie: 8:00-18:00 | Emergencias 24/7</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', opacity: 0.9 }}>Síguenos:</span>
            <a 
              href="https://instagram.com/imcservicioschile" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'white', transition: 'opacity 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.opacity = '0.7'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              <Instagram size={16} />
            </a>
            <a 
              href="https://facebook.com/imcservicioschile" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'white', transition: 'opacity 0.3s ease' }}
              onMouseEnter={(e) => e.target.style.opacity = '0.7'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar