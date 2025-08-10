import React, { useState } from 'react'
import { Calendar, MapPin, Users, Clock, ArrowRight, X } from 'lucide-react'

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: "Remodelación Jumbo Maipú",
      category: "Retail",
      year: "2024",
      area: "2,500 m²",
      duration: "3 meses",
      location: "Maipú, Santiago",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Remodelación integral de supermercado Jumbo incluyendo sistemas eléctricos, obras civiles y acabados premium.",
      services: ["Servicios Eléctricos", "Obras Civiles", "Acabados Premium"],
      highlights: [
        "Instalación de sistema LED completo",
        "Renovación de pisos industriales",
        "Modernización de sistemas eléctricos",
        "Acabados de alta calidad"
      ]
    },
    {
      id: 2,
      title: "Construcción Bodega Construmart",
      category: "Industrial",
      year: "2023",
      area: "5,000 m²",
      duration: "6 meses",
      location: "Quilicura, Santiago",
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Construcción de bodega industrial con estructuras de alta resistencia y sistemas especializados.",
      services: ["Obras Civiles", "Estructuras Metálicas", "Techumbres"],
      highlights: [
        "Fundaciones de alta resistencia",
        "Estructuras metálicas certificadas",
        "Sistema de techumbre industrial",
        "Instalaciones eléctricas industriales"
      ]
    },
    {
      id: 3,
      title: "Modernización Easy Providencia",
      category: "Retail",
      year: "2024",
      area: "3,200 m²",
      duration: "4 meses",
      location: "Providencia, Santiago",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Modernización completa de tienda Easy con nuevos estándares de diseño y funcionalidad.",
      services: ["Carpintería Especializada", "Servicios Eléctricos", "Acabados"],
      highlights: [
        "Mobiliario comercial personalizado",
        "Sistemas de iluminación LED",
        "Carpintería en metalcom",
        "Acabados arquitectónicos"
      ]
    },
    {
      id: 4,
      title: "Centro Logístico Santa Isabel",
      category: "Logística",
      year: "2023",
      area: "8,000 m²",
      duration: "8 meses",
      location: "Pudahuel, Santiago",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Centro de distribución logística con tecnología avanzada y sistemas automatizados.",
      services: ["Obras Civiles", "Automatización", "Estructuras"],
      highlights: [
        "Sistemas automatizados",
        "Estructuras de gran envergadura",
        "Pavimentación especializada",
        "Instalaciones de alta tecnología"
      ]
    },
    {
      id: 5,
      title: "Oficinas Corporativas",
      category: "Corporativo",
      year: "2024",
      area: "1,800 m²",
      duration: "5 meses",
      location: "Las Condes, Santiago",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Oficinas corporativas modernas con diseño arquitectónico de vanguardia.",
      services: ["Carpintería", "Acabados Premium", "Servicios Eléctricos"],
      highlights: [
        "Diseño arquitectónico moderno",
        "Acabados de lujo",
        "Sistemas inteligentes",
        "Espacios colaborativos"
      ]
    },
    {
      id: 6,
      title: "Planta Industrial",
      category: "Industrial",
      year: "2023",
      area: "12,000 m²",
      duration: "12 meses",
      location: "Melipilla, Santiago",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Planta industrial completa con infraestructura especializada y sistemas de seguridad.",
      services: ["Obras Civiles", "Soldadura", "Instalaciones"],
      highlights: [
        "Infraestructura industrial completa",
        "Sistemas de seguridad avanzados",
        "Soldadura certificada AWS",
        "Control de calidad integral"
      ]
    }
  ]

  const categories = ['all', 'Retail', 'Industrial', 'Logística', 'Corporativo']

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const getCategoryColor = (category) => {
    const colors = {
      'Retail': '#1e40af',
      'Industrial': '#0f172a',
      'Logística': '#dc2626',
      'Corporativo': '#ea580c'
    }
    return colors[category] || '#1e40af'
  }

  return (
    <section id="projects" className="section" style={{ background: '#f8fafc' }}>
      <div className="container">
        <div className="section-title">
          <h2>Proyectos Destacados</h2>
          <p>Conoce algunos de nuestros proyectos más representativos que demuestran nuestra experiencia y calidad</p>
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '50px',
          flexWrap: 'wrap'
        }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '25px',
                background: filter === category 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white',
                color: filter === category ? 'white' : '#666',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px',
                fontWeight: '600',
                boxShadow: filter === category 
                  ? '0 4px 15px rgba(102, 126, 234, 0.3)'
                  : '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-3">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="card"
              style={{
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedProject(project)}
            >
              <div style={{
                height: '200px',
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  background: getCategoryColor(project.category),
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {project.category}
                </div>
                
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#333',
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {project.year}
                </div>
              </div>

              <div style={{ padding: '25px' }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#333'
                }}>
                  {project.title}
                </h3>

                <p style={{
                  color: '#666',
                  marginBottom: '20px',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  {project.description}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '20px',
                  fontSize: '13px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666' }}>
                    <MapPin size={14} />
                    <span>{project.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666' }}>
                    <Users size={14} />
                    <span>{project.area}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666' }}>
                    <Clock size={14} />
                    <span>{project.duration}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666' }}>
                    <Calendar size={14} />
                    <span>{project.year}</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '6px',
                    flexWrap: 'wrap'
                  }}>
                    {project.services.slice(0, 2).map((service, index) => (
                      <span
                        key={index}
                        style={{
                          background: `${getCategoryColor(project.category)}20`,
                          color: getCategoryColor(project.category),
                          padding: '4px 8px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '600'
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  
                  <ArrowRight 
                    size={20} 
                    style={{ 
                      color: getCategoryColor(project.category),
                      transition: 'transform 0.3s ease'
                    }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-btn"
              onClick={() => setSelectedProject(null)}
            >
              <X size={20} />
            </button>

            <div style={{
              height: '300px',
              backgroundImage: `url(${selectedProject.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              borderRadius: '16px 16px 0 0'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '30px',
                color: 'white'
              }}>
                <div style={{
                  background: getCategoryColor(selectedProject.category),
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '10px',
                  display: 'inline-block'
                }}>
                  {selectedProject.category}
                </div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
                }}>
                  {selectedProject.title}
                </h2>
              </div>
            </div>

            <div className="modal-body">
              <p style={{
                fontSize: '1.1rem',
                lineHeight: '1.6',
                color: '#666',
                marginBottom: '30px'
              }}>
                {selectedProject.description}
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div>
                  <h4 style={{ fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                    Detalles del Proyecto
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={16} style={{ color: '#666' }} />
                      <span style={{ color: '#666' }}>{selectedProject.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Users size={16} style={{ color: '#666' }} />
                      <span style={{ color: '#666' }}>{selectedProject.area}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} style={{ color: '#666' }} />
                      <span style={{ color: '#666' }}>{selectedProject.duration}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} style={{ color: '#666' }} />
                      <span style={{ color: '#666' }}>{selectedProject.year}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                    Servicios Realizados
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedProject.services.map((service, index) => (
                      <span
                        key={index}
                        style={{
                          background: `${getCategoryColor(selectedProject.category)}20`,
                          color: getCategoryColor(selectedProject.category),
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 style={{ fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                  Aspectos Destacados
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px'
                }}>
                  {selectedProject.highlights.map((highlight, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: getCategoryColor(selectedProject.category)
                      }} />
                      <span style={{ color: '#666', fontSize: '14px' }}>
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Projects