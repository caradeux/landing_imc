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
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px 0'
        }}>
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
                    color: 'var(--color-text)',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    fontSize: '16px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--color-accent)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--color-text)'}
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            <button
              onClick={onQuoteClick}
              style={{
                marginLeft: '20px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 28px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)'
                e.target.style.boxShadow = '0 6px 25px rgba(245, 158, 11, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = '0 4px 20px rgba(245, 158, 11, 0.4)'
              }}
            >
              Cotiza Gratis
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
            background: 'var(--color-background)',
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
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  borderBottom: '1px solid var(--color-border)'
                }}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={onQuoteClick}
              style={{
                width: '100%',
                marginTop: '15px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)'
              }}
            >
              Cotiza Gratis
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