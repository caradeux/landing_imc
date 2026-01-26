import React, { useState, useEffect } from 'react'
import { Calendar, MapPin, Users, Clock, ArrowRight, X, ChevronLeft, ChevronRight, Grid, Image } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../lib/api'
import ParallaxSection from './ParallaxSection'

// Galerías de imágenes por proyecto (fallback para proyectos sin gallery en DB)
// IMPORTANTE: Los títulos deben coincidir EXACTAMENTE con los de la base de datos
const projectGalleries = {
  // Proyectos actuales con imágenes reales - títulos SIN acentos para coincidir con DB
  "Remodelacion Departamento Completo": [
    "/images/projects/remodelacion-depto-completo/IMG-20260125-WA0010.jpg",
    "/images/projects/remodelacion-depto-completo/IMG-20260125-WA0018.jpg",
    "/images/projects/remodelacion-depto-completo/IMG-20260125-WA0019.jpg",
    "/images/projects/remodelacion-depto-completo/IMG-20260125-WA0088.jpg",
    "/images/projects/remodelacion-depto-completo/IMG-20260125-WA0090.jpg"
  ],
  "Fabricacion Muebles de Cocina a Medida": [
    "/images/projects/muebles-cocina-medida/IMG-20260125-WA0011.jpg",
    "/images/projects/muebles-cocina-medida/IMG-20260125-WA0012.jpg",
    "/images/projects/muebles-cocina-medida/IMG-20260125-WA0013.jpg",
    "/images/projects/muebles-cocina-medida/IMG-20260125-WA0082.jpg",
    "/images/projects/muebles-cocina-medida/IMG-20260125-WA0083.jpg"
  ],
  "Separacion Vidrio Lobby Penthouse": [
    "/images/projects/separacion-vidrio-penthouse/IMG-20260125-WA0057.jpg",
    "/images/projects/separacion-vidrio-penthouse/IMG-20260125-WA0058.jpg",
    "/images/projects/separacion-vidrio-penthouse/IMG-20260125-WA0070.jpg",
    "/images/projects/separacion-vidrio-penthouse/IMG-20260125-WA0080.jpg"
  ],
  "Restauracion Edificio Greco II": [
    "/images/projects/restauracion-greco-ii/IMG-20260125-WA0023.jpg",
    "/images/projects/restauracion-greco-ii/IMG-20260125-WA0027.jpg",
    "/images/projects/restauracion-greco-ii/IMG-20260125-WA0028.jpg",
    "/images/projects/restauracion-greco-ii/IMG-20260125-WA0042.jpg",
    "/images/projects/restauracion-greco-ii/IMG-20260125-WA0078.jpg",
    "/images/projects/restauracion-greco-ii/IMG-20260125-WA0100.jpg"
  ],
  "Obras Civiles Easy Vina del Mar": [
    "/images/projects/easy-vina-obras/IMG-20260125-WA0060.jpg",
    "/images/projects/easy-vina-obras/IMG-20260125-WA0062.jpg",
    "/images/projects/easy-vina-obras/IMG-20260125-WA0063.jpg",
    "/images/projects/easy-vina-obras/IMG-20260125-WA0064.jpg",
    "/images/projects/easy-vina-obras/IMG-20260125-WA0068.jpg"
  ],
  "Obras Civiles Santiago": [
    "/images/projects/obras-civiles-santiago/IMG-20260125-WA0024.jpg",
    "/images/projects/obras-civiles-santiago/IMG-20260125-WA0025.jpg",
    "/images/projects/obras-civiles-santiago/IMG-20260125-WA0026.jpg",
    "/images/projects/obras-civiles-santiago/IMG-20260125-WA0030.jpg",
    "/images/projects/obras-civiles-santiago/IMG-20260125-WA0031.jpg"
  ],
  "Instalacion de Pisos Laminados": [
    "/images/projects/instalacion-pisos/IMG-20260125-WA0081.jpg",
    "/images/projects/instalacion-pisos/IMG-20260125-WA0084.jpg",
    "/images/projects/instalacion-pisos/IMG-20260125-WA0085.jpg",
    "/images/projects/instalacion-pisos/IMG-20260125-WA0086.jpg",
    "/images/projects/instalacion-pisos/IMG-20260125-WA0120.jpg"
  ]
}

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewMode, setViewMode] = useState('gallery') // 'gallery' or 'grid'

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const projects = await api.getProjects()
      setProjects(projects || [])
    } catch (error) {
      console.error('Error al cargar proyectos:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProjectGallery = (project) => {
    // First check if project has gallery from database
    if (project?.gallery && Array.isArray(project.gallery) && project.gallery.length > 0) {
      return project.gallery
    }
    // Fallback to hardcoded galleries by title
    if (project?.title && projectGalleries[project.title]) {
      return projectGalleries[project.title]
    }
    // Last fallback: just the main image
    return project?.image_url ? [project.image_url] : []
  }

  const nextImage = () => {
    const gallery = getProjectGallery(selectedProject)
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevImage = () => {
    const gallery = getProjectGallery(selectedProject)
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  useEffect(() => {
    if (selectedProject) {
      setCurrentImageIndex(0)
    }
  }, [selectedProject])

  if (loading) {
    return (
      <section id="projects" className="section" style={{ background: '#f8fafc', textAlign: 'center', padding: '100px 40px' }}>
        <div>Cargando proyectos...</div>
      </section>
    )
  }

  const categories = ['all', 'Residencial', 'Retail', 'Restauración', 'Obras Civiles']

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter)

  const getCategoryColor = (category) => {
    const colors = {
      'Residencial': '#667eea',
      'Retail': '#10b981',
      'Restauración': '#f59e0b',
      'Obras Civiles': '#6366f1'
    }
    return colors[category] || '#667eea'
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

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px',
          width: '100%',
          maxWidth: 'none',
          padding: '0 40px',
          justifyContent: 'center'
        }}>
          {filteredProjects.map((project, index) => {
            const gallery = getProjectGallery(project)
            const imageCount = gallery.length || 1

            return (
              <motion.div
                key={project.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.4s ease',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  height: 'fit-content'
                }}
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{
                  y: -12,
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Image Container with gallery preview */}
                <div style={{ position: 'relative' }}>
                  <motion.div
                    style={{
                      height: '250px',
                      backgroundImage: `url(${project.image_url})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      background: getCategoryColor(project.category),
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                    }}>
                      {project.category}
                    </div>

                    {/* Image Count Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      padding: '8px 14px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <Image size={14} />
                      {imageCount} fotos
                    </div>

                    {/* Gradient overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '100px',
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.5))'
                    }} />
                  </motion.div>

                  {/* Mini gallery preview */}
                  {imageCount > 1 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '15px',
                      left: '15px',
                      right: '15px',
                      display: 'flex',
                      gap: '8px'
                    }}>
                      {gallery.slice(0, 4).map((img, idx) => (
                        <div
                          key={idx}
                          style={{
                            width: '50px',
                            height: '35px',
                            borderRadius: '6px',
                            backgroundImage: `url(${img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '2px solid white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            opacity: idx === 0 ? 1 : 0.7
                          }}
                        />
                      ))}
                      {imageCount > 4 && (
                        <div style={{
                          width: '50px',
                          height: '35px',
                          borderRadius: '6px',
                          background: 'rgba(0,0,0,0.7)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: '700',
                          border: '2px solid white'
                        }}>
                          +{imageCount - 4}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div style={{ padding: '25px' }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '800',
                    marginBottom: '12px',
                    color: '#333'
                  }}>
                    {project.title}
                  </h3>

                  <p style={{
                    color: '#666',
                    marginBottom: '20px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
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
                            background: `${getCategoryColor(project.category)}15`,
                            color: getCategoryColor(project.category),
                            padding: '5px 10px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            fontWeight: '600'
                          }}
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: getCategoryColor(project.category),
                      fontWeight: '600',
                      fontSize: '13px'
                    }}>
                      Ver Galería
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Project Modal with Gallery */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.9)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div
              className="modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                background: 'white',
                borderRadius: '24px',
                maxWidth: '1200px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  zIndex: 100,
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                <X size={24} />
              </button>

              {/* Gallery Section */}
              <div style={{ position: 'relative' }}>
                {/* Main Image */}
                <div style={{
                  height: '500px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '24px 24px 0 0'
                }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${getProjectGallery(selectedProject)[currentImageIndex]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  {getProjectGallery(selectedProject).length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        style={{
                          position: 'absolute',
                          left: '20px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '50px',
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <ChevronLeft size={28} color="#333" />
                      </button>
                      <button
                        onClick={nextImage}
                        style={{
                          position: 'absolute',
                          right: '20px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          borderRadius: '50%',
                          width: '50px',
                          height: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <ChevronRight size={28} color="#333" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {currentImageIndex + 1} / {getProjectGallery(selectedProject).length}
                  </div>

                  {/* View Mode Toggle */}
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    display: 'flex',
                    gap: '10px'
                  }}>
                    <button
                      onClick={() => setViewMode('gallery')}
                      style={{
                        background: viewMode === 'gallery' ? getCategoryColor(selectedProject.category) : 'rgba(255,255,255,0.9)',
                        color: viewMode === 'gallery' ? 'white' : '#333',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Image size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      style={{
                        background: viewMode === 'grid' ? getCategoryColor(selectedProject.category) : 'rgba(255,255,255,0.9)',
                        color: viewMode === 'grid' ? 'white' : '#333',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Grid size={20} />
                    </button>
                  </div>

                  {/* Category & Title Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '80px',
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
                      display: 'inline-block',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                    }}>
                      {selectedProject.category}
                    </div>
                    <h2 style={{
                      fontSize: '2.2rem',
                      fontWeight: '800',
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                      maxWidth: '600px'
                    }}>
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  padding: '15px 20px',
                  background: '#f8fafc',
                  overflowX: 'auto',
                  borderBottom: '1px solid #eee'
                }}>
                  {getProjectGallery(selectedProject).map((img, idx) => (
                    <motion.div
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      style={{
                        minWidth: '80px',
                        height: '60px',
                        borderRadius: '10px',
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        cursor: 'pointer',
                        border: currentImageIndex === idx ? `3px solid ${getCategoryColor(selectedProject.category)}` : '3px solid transparent',
                        opacity: currentImageIndex === idx ? 1 : 0.6,
                        transition: 'all 0.3s ease'
                      }}
                      whileHover={{ opacity: 1, scale: 1.05 }}
                    />
                  ))}
                </div>

                {/* Grid View */}
                {viewMode === 'grid' && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: '10px',
                    padding: '20px',
                    background: '#f8fafc'
                  }}>
                    {getProjectGallery(selectedProject).map((img, idx) => (
                      <motion.div
                        key={idx}
                        onClick={() => {
                          setCurrentImageIndex(idx)
                          setViewMode('gallery')
                        }}
                        style={{
                          aspectRatio: '4/3',
                          borderRadius: '12px',
                          backgroundImage: `url(${img})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                        }}
                        whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(0,0,0,0.2)' }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div style={{ padding: '30px' }}>
                <p style={{
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: '#666',
                  marginBottom: '30px'
                }}>
                  {selectedProject.description}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px',
                  marginBottom: '30px'
                }}>
                  <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '15px', color: '#333', fontSize: '1.1rem' }}>
                      Detalles del Proyecto
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 15px', background: '#f8fafc', borderRadius: '10px' }}>
                        <MapPin size={18} style={{ color: getCategoryColor(selectedProject.category) }} />
                        <span style={{ color: '#666' }}>{selectedProject.location}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 15px', background: '#f8fafc', borderRadius: '10px' }}>
                        <Users size={18} style={{ color: getCategoryColor(selectedProject.category) }} />
                        <span style={{ color: '#666' }}>{selectedProject.area}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 15px', background: '#f8fafc', borderRadius: '10px' }}>
                        <Clock size={18} style={{ color: getCategoryColor(selectedProject.category) }} />
                        <span style={{ color: '#666' }}>{selectedProject.duration}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 15px', background: '#f8fafc', borderRadius: '10px' }}>
                        <Calendar size={18} style={{ color: getCategoryColor(selectedProject.category) }} />
                        <span style={{ color: '#666' }}>{selectedProject.year}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '15px', color: '#333', fontSize: '1.1rem' }}>
                      Servicios Realizados
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {selectedProject.services.map((service, index) => (
                        <span
                          key={index}
                          style={{
                            background: `${getCategoryColor(selectedProject.category)}15`,
                            color: getCategoryColor(selectedProject.category),
                            padding: '10px 16px',
                            borderRadius: '10px',
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
                  <h4 style={{ fontWeight: '700', marginBottom: '15px', color: '#333', fontSize: '1.1rem' }}>
                    Aspectos Destacados
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px'
                  }}>
                    {selectedProject.highlights.map((highlight, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 15px',
                        background: '#f8fafc',
                        borderRadius: '10px',
                        border: '1px solid #eee'
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: getCategoryColor(selectedProject.category),
                          boxShadow: `0 0 10px ${getCategoryColor(selectedProject.category)}50`
                        }} />
                        <span style={{ color: '#555', fontSize: '14px' }}>
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
      </AnimatePresence>
    </section>
  )
}

export default Projects
