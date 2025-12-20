import React, { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import ParallaxSection from './ParallaxSection'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error('Error al cargar testimonios:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="testimonials" className="section" style={{ background: '#f8fafc', textAlign: 'center', padding: '100px 40px' }}>
        <div>Cargando testimonios...</div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="section" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f8fafc 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '100px 40px'
      }}>
        <ParallaxSection speed={0.3} direction="up">
          <div className="section-title" style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 24px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: '25px',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              marginBottom: '30px'
            }}>
              <span style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#667eea',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Testimonios
              </span>
            </div>

            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '30px',
              lineHeight: '1.2'
            }}>
              Lo Que Dicen Nuestros Clientes
            </h2>

            <p style={{
              fontSize: '1.4rem',
              color: '#64748b',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.8'
            }}>
              La satisfacción de nuestros clientes es nuestra mejor carta de presentación
            </p>
          </div>
        </ParallaxSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '30px'
        }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(102, 126, 234, 0.1)',
                position: 'relative',
                transition: 'all 0.3s ease'
              }}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
                transition: { duration: 0.3 }
              }}
            >
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                opacity: 0.1
              }}>
                <Quote size={60} style={{ color: '#667eea' }} />
              </div>

              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    style={{
                      fill: i < testimonial.rating ? '#fbbf24' : 'none',
                      stroke: i < testimonial.rating ? '#fbbf24' : '#e0e0e0'
                    }}
                  />
                ))}
              </div>

              <p style={{
                fontSize: '1.05rem',
                lineHeight: '1.7',
                color: '#475569',
                marginBottom: '25px',
                fontStyle: 'italic',
                position: 'relative',
                zIndex: 2
              }}>
                "{testimonial.content}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                {testimonial.client_photo_url ? (
                  <img
                    src={testimonial.client_photo_url}
                    alt={testimonial.client_name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid #667eea'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'white'
                  }}>
                    {testimonial.client_name.charAt(0)}
                  </div>
                )}

                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '3px'
                  }}>
                    {testimonial.client_name}
                  </h4>
                  {testimonial.client_position && (
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#64748b',
                      marginBottom: '2px'
                    }}>
                      {testimonial.client_position}
                    </p>
                  )}
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#667eea',
                    fontWeight: '600'
                  }}>
                    {testimonial.client_company}
                  </p>
                </div>
              </div>

              {testimonial.project_name && (
                <div style={{
                  marginTop: '20px',
                  padding: '10px 15px',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  borderRadius: '10px',
                  borderLeft: '3px solid #667eea'
                }}>
                  <span style={{
                    fontSize: '0.85rem',
                    color: '#64748b',
                    fontWeight: '600'
                  }}>
                    Proyecto: {testimonial.project_name}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
