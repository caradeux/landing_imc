import React, { useState, useEffect } from 'react'
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

function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    </div>
  )
}

export default App