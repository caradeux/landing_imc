import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { LogOut, Briefcase, FolderOpen, MessageSquare, Image, Menu, X } from 'lucide-react'
import ServicesManager from './ServicesManager'
import ProjectsManager from './ProjectsManager'
import TestimonialsManager from './TestimonialsManager'
import ImagesManager from './ImagesManager'

const Dashboard = () => {
  const { signOut, user } = useAuth()
  const [activeTab, setActiveTab] = useState('services')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  const tabs = [
    { id: 'services', label: 'Servicios', icon: Briefcase },
    { id: 'projects', label: 'Proyectos', icon: FolderOpen },
    { id: 'testimonials', label: 'Testimonios', icon: MessageSquare },
    { id: 'images', label: 'Imágenes', icon: Image }
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px 40px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div>
            <h1 style={{
              color: 'white',
              fontSize: '1.8rem',
              fontWeight: '700',
              margin: 0
            }}>
              Panel de Administración
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.9rem',
              margin: '5px 0 0 0'
            }}>
              {user?.email}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '30px 40px'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            borderBottom: '2px solid #f0f0f0',
            overflow: 'auto'
          }}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: '20px',
                    border: 'none',
                    background: activeTab === tab.id
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#666',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    minWidth: '150px'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.background = '#f9fafb'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.background = 'transparent'
                    }
                  }}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div style={{ padding: '30px' }}>
            {activeTab === 'services' && <ServicesManager />}
            {activeTab === 'projects' && <ProjectsManager />}
            {activeTab === 'testimonials' && <TestimonialsManager />}
            {activeTab === 'images' && <ImagesManager />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
