import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, Clock, ArrowRight, X } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { supabase } from '../lib/supabase'
import ParallaxSection from './ParallaxSection'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error al cargar proyectos:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="projects" className="section" style={{ background: '#f8fafc', textAlign: 'center', padding: '100px 40px' }}>
        <div>Cargando proyectos...</div>
      </section>
    )
  }

  const categories = ['all', 'Retail', 'Industrial', 'Logística', 'Corporativo']

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  const getCategoryColor = (category) => {
    const colors = {
      'Retail': 'var(--color-primary)',
      'Industrial': 'var(--color-secondary)',
      'Logística': 'var(--color-error)',
      'Corporativo': 'var(--color-warning)'
    }
    return colors[category] || 'var(--color-primary)'
  }

  return (
    <section id="projects" className="section" style={{ background: 'var(--color-section-bg-light)' }}>
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
                  backgroundImage: `url(${project.image_url})`,
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
              backgroundImage: `url(${selectedProject.image_url})`,
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