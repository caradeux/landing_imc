import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const Header = ({ isScrolled, onQuoteClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Servicios', href: '#services' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Proyectos', href: '#projects' },
    { name: 'Testimonios', href: '#testimonials' },
    { name: 'Contacto', href: '#contact' }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header style={{
      position: 'fixed',
      top: '40px',
      left: 0,
      right: 0,
      zIndex: 999,
      background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
      transition: 'all 0.3s ease',
      boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '15px 0'
        }}>
          {/* Logo */}
          <div style={{
            fontSize: '24px',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            IMC SERVICIOS CHILE
          </div>

          {/* Desktop Navigation */}
          <nav style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '30px' }} className="desktop-nav">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#333',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    fontSize: '16px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#667eea'}
                  onMouseLeave={(e) => e.target.style.color = '#333'}
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            <button 
              className="btn btn-primary"
              onClick={onQuoteClick}
              style={{ marginLeft: '20px' }}
            >
              Cotizar Proyecto
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px'
              }}
              className="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            borderRadius: '0 0 16px 16px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            padding: '20px'
          }} className="mobile-nav">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '12px 0',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#333',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                {item.name}
              </button>
            ))}
            <button 
              className="btn btn-primary"
              onClick={onQuoteClick}
              style={{ width: '100%', marginTop: '15px' }}
            >
              Cotizar Proyecto
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-nav {
            display: none !important;
          }
        }
      `}</style>
    </header>
  )
}

export default Header