import React, { useState, useEffect } from 'react'
import { useAuth } from './contexts/AuthContext'
import SEO from './components/SEO'
import TopBar from './components/TopBar'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import About from './components/About'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import QuoteModal from './components/QuoteModal'
import WhatsAppButton from './components/WhatsAppButton'
import Login from './components/admin/Login'
import Dashboard from './components/admin/Dashboard'

function App() {
  const { user, loading } = useAuth()
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAdmin, setShowAdmin] = useState(window.location.pathname === '/admin')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setShowAdmin(window.location.pathname === '/admin')
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ color: 'white', fontSize: '1.5rem' }}>Cargando...</div>
      </div>
    )
  }

  if (showAdmin) {
    if (!user) {
      return <Login />
    }
    return <Dashboard />
  }

  return (
    <div className="App">
      <SEO />
      <TopBar />
      <Header
        isScrolled={isScrolled}
        onQuoteClick={() => setIsQuoteModalOpen(true)}
      />
      <Hero onQuoteClick={() => setIsQuoteModalOpen(true)} />
      <Services />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />

      {isQuoteModalOpen && (
        <QuoteModal onClose={() => setIsQuoteModalOpen(false)} />
      )}

      <WhatsAppButton />
    </div>
  )
}

export default App