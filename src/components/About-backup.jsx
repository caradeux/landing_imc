import React, { useState, useEffect } from 'react'
import { Award, CheckCircle, Shield, Target, Star, Clock } from 'lucide-react'

const About = () => {
    const [currentClientSlide, setCurrentClientSlide] = useState(0)

    const valueProps = [
        { 
            icon: Award, 
            title: "Calidad Garantizada", 
            description: "Certificación ISO 9001:2015 y cumplimiento de estándares internacionales", 
            color: "#1e40af" 
        },
        { 
            icon: Shield, 
            title: "Seguridad Total", 
            description: "Cero accidentes laborales y protocolos de seguridad rigurosos", 
            color: "#059669" 
        },
        { 
            icon: Clock, 
            title: "Entrega a Tiempo", 
            description: "Cumplimiento de plazos garantizado con planificación profesional", 
            color: "#dc2626" 
        },
        { 
            icon: Target, 
            title: "Soluciones Integrales", 
            description: "Desde el diseño hasta la entrega final, todo en un solo lugar", 
            color: "#ea580c" 
        }
    ]

    const clients = [
        { 
            name: "Jumbo", 
            logo: "https://via.placeholder.com/140x70/1e40af/white?text=JUMBO",
            description: "50+ remodelaciones exitosas",
            projects: "Retail & Supermercados"
        },
        { 
            name: "Construmart", 
            logo: "https://via.placeholder.com/140x70/0f172a/white?text=CONSTRUMART",
            description: "Bodegas industriales",
            projects: "Construcción Industrial"
        },
        { 
            name: "Santa Isabel", 
            logo: "https://via.placeholder.com/140x70/dc2626/white?text=SANTA+ISABEL",
            description: "Centros logísticos",
            projects: "Infraestructura Logística"
        },
        { 
            name: "Easy", 
            logo: "https://via.placeholder.com/140x70/ea580c/white?text=EASY",
            description: "Modernización de tiendas",
            projects: "Retail Especializado"
        },
        { 
            name: "Walmart", 
            logo: "https://via.placeholder.com/140x70/059669/white?text=WALMART",
            description: "Proyectos de expansión",
            projects: "Retail Corporativo"
        },
        { 
            name: "Sodimac", 
            logo: "https://via.placeholder.com/140x70/7c3aed/white?text=SODIMAC",
            description: "Instalaciones eléctricas",
            projects: "Mejoramiento Continuo"
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentClientSlide((prev) => (prev + 1) % Math.ceil(clients.length / 3))
        }, 4000)
        return () => clearInterval(timer)
    }, [clients.length])

    const certifications = [
        { name: "ISO 9001:2015", icon: Shield, color: "#1e40af" },
        { name: "Certificación SEC", icon: Award, color: "#059669" },
        { name: "Mutual de Seguridad", icon: CheckCircle, color: "#7c3aed" }
    ]

    return (
        <section id="about" className="section">
            <div className="container">
                <div className="section-title">
                    <h2>Sobre IMC Servicios Chile</h2>
                    <p>Más de 15 años liderando el mercado de construcción y servicios especializados en Chile</p>
                </div>

                {/* Company Story */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '60px',
                    alignItems: 'center',
                    marginBottom: '80px'
                }} className="about-grid">

                    <div>
                        <h3 style={{
                            fontSize: '2.2rem',
                            fontWeight: '700',
                            marginBottom: '24px',
                            background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Experiencia que Transforma Proyectos
                        </h3>

                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: '#666',
                            marginBottom: '30px'
                        }}>
                            En IMC Servicios Chile SpA, nos especializamos en brindar soluciones integrales de construcción
                            y servicios especializados para los sectores retail, industrial y comercial. Con más de 15 años
                            de experiencia, hemos consolidado nuestra posición como líderes en el mercado chileno.
                        </p>

                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.8',
                            color: '#666',
                            marginBottom: '30px'
                        }}>
                            Nuestro compromiso con la excelencia se refleja en cada proyecto que ejecutamos, desde
                            instalaciones eléctricas certificadas hasta obras civiles de alta complejidad, siempre
                            cumpliendo con los más altos estándares de calidad y seguridad.
                        </p>

                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <Target size={24} style={{ color: '#1e40af' }} />
                            <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333' }}>
                                0% de accidentes en los últimos 5 años
                            </span>
                        </div>
                    </div>

                    <div style={{
                        background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
                        borderRadius: '20px',
                        padding: '40px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: '-50px',
                            right: '-50px',
                            width: '150px',
                            height: '150px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '50%'
                        }} />

                        <h4 style={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            marginBottom: '20px'
                        }}>
                            Nuestra Misión
                        </h4>

                        <p style={{
                            fontSize: '1.1rem',
                            lineHeight: '1.7',
                            opacity: 0.95,
                            marginBottom: '30px'
                        }}>
                            Transformar espacios y crear valor para nuestros clientes a través de servicios
                            especializados de construcción, manteniendo siempre los más altos estándares
                            de calidad, seguridad y profesionalismo.
                        </p>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '15px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            padding: '15px 20px',
                            borderRadius: '10px'
                        }}>
                            <Star size={24} />
                            <span style={{ fontWeight: '600' }}>
                                Certificados en ISO 9001:2015
                            </span>
                        </div>
                    </div>
                </div>

                {/* Value Propositions */}
                <div style={{
                    background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
                    borderRadius: '24px',
                    padding: '60px 40px',
                    marginBottom: '80px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h3 style={{
                            textAlign: 'center',
                            fontSize: '2.5rem',
                            fontWeight: '800',
                            marginBottom: '20px',
                            color: 'white',
                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                        }}>
                            ¿Por Qué Elegir IMC Servicios Chile?
                        </h3>

                        <p style={{
                            textAlign: 'center',
                            fontSize: '1.2rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            marginBottom: '50px',
                            maxWidth: '700px',
                            margin: '0 auto 50px'
                        }}>
                            Somos tu socio estratégico para proyectos de construcción exitosos
                        </p>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr 1fr 1fr',
                            gap: '25px'
                        }} className="value-props-grid">
                            {valueProps.map((prop, index) => {
                                const IconComponent = prop.icon
                                return (
                                    <div key={index} style={{
                                        textAlign: 'center',
                                        padding: '35px 20px',
                                        background: 'rgba(255, 255, 255, 0.15)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '20px',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        <div style={{
                                            width: '80px',
                                            height: '80px',
                                            background: `linear-gradient(135deg, ${prop.color} 0%, ${prop.color}cc 100%)`,
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 25px',
                                            boxShadow: `0 8px 25px ${prop.color}40`
                                        }}>
                                            <IconComponent
                                                size={36}
                                                style={{ color: 'white' }}
                                            />
                                        </div>

                                        <h4 style={{
                                            fontSize: '1.4rem',
                                            fontWeight: '700',
                                            color: 'white',
                                            marginBottom: '15px'
                                        }}>
                                            {prop.title}
                                        </h4>

                                        <p style={{
                                            fontSize: '1rem',
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            lineHeight: '1.5',
                                            margin: 0
                                        }}>
                                            {prop.description}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Call to Action */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: '50px',
                            padding: '30px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '20px',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}>
                            <h4 style={{
                                color: 'white',
                                fontSize: '1.5rem',
                                fontWeight: '700',
                                marginBottom: '15px'
                            }}>
                                ¿Listo para tu próximo proyecto?
                            </h4>
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '1.1rem',
                                marginBottom: '25px'
                            }}>
                                Obtén una cotización personalizada y descubre cómo podemos transformar tu visión en realidad
                            </p>
                            <button 
                                style={{
                                    background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '15px 35px',
                                    borderRadius: '25px',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 8px 25px rgba(220, 38, 38, 0.3)'
                                }}
                                onClick={() => {
                                    const contactSection = document.querySelector('#contact')
                                    if (contactSection) {
                                        contactSection.scrollIntoView({ behavior: 'smooth' })
                                    }
                                }}
                            >
                                Solicitar Cotización Gratuita
                            </button>
                        </div>
                    </div>
                </div>

                {/* Clients Carousel - Simplified */}
                <div style={{ 
                    marginBottom: '80px',
                    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                    borderRadius: '24px',
                    padding: '60px 40px'
                }}>
                    <h3 style={{
                        textAlign: 'center',
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        marginBottom: '50px',
                        background: 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Clientes que Confían en Nosotros
                    </h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '30px'
                    }}>
                        {clients.slice(currentClientSlide * 3, currentClientSlide * 3 + 3).map((client, index) => (
                            <div key={index} style={{
                                background: 'white',
                                padding: '40px 30px',
                                borderRadius: '20px',
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
                                textAlign: 'center',
                                border: '1px solid #f0f0f0'
                            }}>
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    style={{
                                        height: '50px',
                                        objectFit: 'contain',
                                        marginBottom: '20px'
                                    }}
                                />
                                
                                <h4 style={{
                                    fontSize: '1.3rem',
                                    fontWeight: '700',
                                    color: '#333',
                                    marginBottom: '10px'
                                }}>
                                    {client.name}
                                </h4>
                                
                                <p style={{
                                    fontSize: '1rem',
                                    color: '#1e40af',
                                    fontWeight: '600',
                                    marginBottom: '8px'
                                }}>
                                    {client.description}
                                </p>
                                
                                <p style={{
                                    fontSize: '0.9rem',
                                    color: '#666',
                                    fontStyle: 'italic'
                                }}>
                                    {client.projects}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Indicators */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '12px',
                        marginTop: '40px'
                    }}>
                        {Array.from({ length: Math.ceil(clients.length / 3) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentClientSlide(index)}
                                style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: currentClientSlide === index 
                                        ? 'linear-gradient(135deg, #1e40af 0%, #0f172a 100%)'
                                        : '#cbd5e1',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div>
                    <h3 style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        fontWeight: '700',
                        marginBottom: '40px',
                        color: '#333'
                    }}>
                        Certificaciones y Acreditaciones
                    </h3>

                    <div className="grid grid-3">
                        {certifications.map((cert, index) => {
                            const IconComponent = cert.icon
                            return (
                                <div key={index} className="card" style={{
                                    textAlign: 'center',
                                    background: `linear-gradient(135deg, ${cert.color}10 0%, ${cert.color}05 100%)`,
                                    border: `2px solid ${cert.color}20`
                                }}>
                                    <IconComponent
                                        size={48}
                                        style={{
                                            color: cert.color,
                                            marginBottom: '20px'
                                        }}
                                    />
                                    <h4 style={{
                                        fontSize: '1.3rem',
                                        fontWeight: '700',
                                        color: '#333',
                                        marginBottom: '10px'
                                    }}>
                                        {cert.name}
                                    </h4>
                                    <p style={{ color: '#666' }}>
                                        Certificación que garantiza nuestros altos estándares de calidad y seguridad
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .about-grid {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                    }
                    .value-props-grid {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 20px !important;
                    }
                }
                @media (max-width: 480px) {
                    .value-props-grid {
                        grid-template-columns: 1fr !important;
                        gap: 20px !important;
                    }
                }
            `}</style>
        </section>
    )
}

export default About