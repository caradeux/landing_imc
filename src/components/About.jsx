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
            logo: "https://via.placeholder.com/160x80/ffffff/1e40af?text=JUMBO",
            sector: "Retail",
            achievement: "50+ Remodelaciones",
            year: "2019-2024",
            description: "Socio estratégico en la modernización de supermercados a nivel nacional"
        },
        { 
            name: "Construmart", 
            logo: "https://via.placeholder.com/160x80/ffffff/0f172a?text=CONSTRUMART",
            sector: "Industrial",
            achievement: "15 Bodegas",
            year: "2020-2024",
            description: "Construcción de infraestructura logística y centros de distribución"
        },
        { 
            name: "Santa Isabel", 
            logo: "https://via.placeholder.com/160x80/ffffff/dc2626?text=SANTA+ISABEL",
            sector: "Logística",
            achievement: "8 Centros",
            year: "2021-2024",
            description: "Desarrollo de centros logísticos de última generación"
        },
        { 
            name: "Easy", 
            logo: "https://via.placeholder.com/160x80/ffffff/ea580c?text=EASY",
            sector: "Retail",
            achievement: "25+ Tiendas",
            year: "2018-2024",
            description: "Modernización integral de tiendas y mejoramiento continuo"
        },
        { 
            name: "Walmart Chile", 
            logo: "https://via.placeholder.com/160x80/ffffff/059669?text=WALMART",
            sector: "Corporativo",
            achievement: "12 Proyectos",
            year: "2022-2024",
            description: "Expansión y renovación de infraestructura comercial"
        },
        { 
            name: "Sodimac", 
            logo: "https://via.placeholder.com/160x80/ffffff/7c3aed?text=SODIMAC",
            sector: "Retail",
            achievement: "30+ Instalaciones",
            year: "2019-2024",
            description: "Sistemas eléctricos especializados y automatización"
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentClientSlide((prev) => (prev + 1) % Math.ceil(clients.length / 3))
        }, 4000)
        return () => clearInterval(timer)
    }, [])

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
                    {/* Background Pattern */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.1,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        zIndex: 1
                    }} />

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
                                        transition: 'all 0.3s ease',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer'
                                    }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-8px)'
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
                                            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)'
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)'
                                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                                            e.currentTarget.style.boxShadow = 'none'
                                        }}
                                    >
                                        {/* Glow effect */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '-50%',
                                            left: '-50%',
                                            width: '200%',
                                            height: '200%',
                                            background: `radial-gradient(circle, ${prop.color}20 0%, transparent 70%)`,
                                            zIndex: 1
                                        }} />

                                        <div style={{ position: 'relative', zIndex: 2 }}>
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
                                                marginBottom: '15px',
                                                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
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
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'translateY(-2px)'
                                    e.target.style.boxShadow = '0 12px 35px rgba(220, 38, 38, 0.4)'
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'translateY(0)'
                                    e.target.style.boxShadow = '0 8px 25px rgba(220, 38, 38, 0.3)'
                                }}
                                onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Solicitar Cotización Gratuita
                            </button>
                        </div>
                    </div>
                </div>

                {/* Clients Showcase */}
                <div style={{ 
                    marginBottom: '80px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Background with geometric patterns */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #0f172a 100%)',
                        borderRadius: '32px',
                        zIndex: 1
                    }} />
                    
                    {/* Geometric decorations */}
                    <div style={{
                        position: 'absolute',
                        top: '-100px',
                        right: '-100px',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 2
                    }} />
                    
                    <div style={{
                        position: 'absolute',
                        bottom: '-50px',
                        left: '-50px',
                        width: '200px',
                        height: '200px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 2
                    }} />

                    <div style={{
                        position: 'relative',
                        zIndex: 3,
                        padding: '80px 60px',
                        color: 'white'
                    }}>
                        {/* Header Section */}
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <div style={{
                                display: 'inline-block',
                                background: 'rgba(255, 255, 255, 0.1)',
                                padding: '8px 20px',
                                borderRadius: '25px',
                                fontSize: '14px',
                                fontWeight: '600',
                                marginBottom: '20px',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                🏆 CLIENTES CORPORATIVOS
                            </div>
                            
                            <h3 style={{
                                fontSize: '3rem',
                                fontWeight: '900',
                                marginBottom: '20px',
                                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                                lineHeight: '1.1'
                            }}>
                                Empresas Líderes que
                                <br />
                                <span style={{
                                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    Confían en Nosotros
                                </span>
                            </h3>

                            <p style={{
                                fontSize: '1.3rem',
                                opacity: 0.9,
                                maxWidth: '700px',
                                margin: '0 auto',
                                lineHeight: '1.6'
                            }}>
                                Más de 6 años construyendo relaciones sólidas con las empresas más importantes de Chile
                            </p>
                        </div>

                        {/* Clients Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '30px',
                            marginBottom: '50px'
                        }} className="clients-showcase-grid">
                            {clients.map((client, index) => (
                                <div key={index} style={{
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    borderRadius: '24px',
                                    padding: '40px 30px',
                                    textAlign: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.4s ease',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    backdropFilter: 'blur(10px)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'
                                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)'
                                    e.currentTarget.style.boxShadow = 'none'
                                }}
                                >
                                    {/* Animated background gradient */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '6px',
                                        background: `linear-gradient(135deg, #1e40af 0%, #fbbf24 50%, #dc2626 100%)`,
                                        backgroundSize: '200% 100%',
                                        animation: 'gradientShift 3s ease-in-out infinite'
                                    }} />

                                    {/* Company Logo */}
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                                        borderRadius: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 25px',
                                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                                        border: '2px solid #f1f5f9'
                                    }}>
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            style={{
                                                height: '60px',
                                                objectFit: 'contain'
                                            }}
                                        />
                                    </div>
                                    
                                    <h4 style={{
                                        fontSize: '1.5rem',
                                        fontWeight: '800',
                                        color: '#0f172a',
                                        marginBottom: '12px'
                                    }}>
                                        {client.name}
                                    </h4>

                                    {/* Sector Badge */}
                                    <div style={{
                                        display: 'inline-block',
                                        background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                                        color: 'white',
                                        padding: '6px 16px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        fontWeight: '700',
                                        marginBottom: '15px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {client.sector}
                                    </div>
                                    



                                </div>
                            ))}
                        </div>


                    </div>

                    <style jsx>{`
                        @keyframes gradientShift {
                            0%, 100% { background-position: 0% 50%; }
                            50% { background-position: 100% 50%; }
                        }
                        
                        @media (max-width: 768px) {
                            .clients-showcase-grid {
                                grid-template-columns: 1fr !important;
                                gap: 20px !important;
                            }
                        }
                        
                        @media (max-width: 1024px) {
                            .clients-showcase-grid {
                                grid-template-columns: repeat(2, 1fr) !important;
                            }
                        }
                    `}</style>
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
          .clients-carousel-grid {
            grid-template-columns: 1fr !important;
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