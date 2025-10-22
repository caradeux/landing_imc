import React, { useState } from 'react'
import { Calendar, MapPin, Users, Clock, ArrowRight, X } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ParallaxSection from './ParallaxSection'

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
      <div style={{ maxWidth: 'none', width: '100%' }}>
        <ParallaxSection speed={0.3} direction="up">
          <div className="section-title">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Proyectos Destacados
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Conoce algunos de nuestros proyectos más representativos que demuestran nuestra experiencia y calidad
            </motion.p>
          </div>
        </ParallaxSection>

        {/* Filter Buttons */}
        <ParallaxSection speed={0.2} direction="up">
          <motion.div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              marginBottom: '50px',
              flexWrap: 'wrap'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.button
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'all' ? 'Todos' : category}
              </motion.button>
            ))}
          </motion.div>
        </ParallaxSection>

        {/* Projects Grid - Ancho Completo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '25px',
          width: '100%',
          maxWidth: 'none',
          padding: '0 40px',
          justifyContent: 'center'
        }}>
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id} 
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                height: 'fit-content'
              }}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                style={{
                  height: '200px',
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>

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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div 
          className="modal-overlay" 
          onClick={() => setSelectedProject(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="modal" 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
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
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

export default Projects