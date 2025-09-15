import React, { useState, useEffect } from 'react'
import { Award, CheckCircle, Shield, Target, Star, Clock } from 'lucide-react'
import Marquee from 'react-fast-marquee'

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
            logo: "/images/logos/jumbo.png",
            sector: "Retail",
            achievement: "50+ Remodelaciones",
            year: "2019-2024",
            description: "Socio estratégico en la modernización de supermercados a nivel nacional"
        },
        { 
            name: "Contrumart", 
            logo: "/images/logos/contrumart.png",
            sector: "Retail",
            achievement: "15 Bodegas",
            year: "2020-2024",
            description: "Construcción de infraestructura logística y centros de distribución"
        },
        { 
            name: "Santa Isabel", 
            logo: "/images/logos/Santa_Isabel.png",
            sector: "Retail",
            achievement: "8 Centros",
            year: "2021-2024",
            description: "Desarrollo de centros logísticos de última generación"
        },
        { 
            name: "Easy", 
            logo: "/images/logos/easy.png",
            sector: "Retail",
            achievement: "25+ Tiendas",
            year: "2018-2024",
            description: "Modernización integral de tiendas y mejoramiento continuo"
        },
        { 
            name: "Líder", 
            logo: "/images/logos/Lider.png",
            sector: "Retail",
            achievement: "12 Proyectos",
            year: "2022-2024",
            description: "Expansión y renovación de infraestructura comercial"
        },
        { 
            name: "Homecenter Sodimac", 
            logo: "/images/logos/Homecenter_Sodimac.png",
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

                 {/* Value Propositions - CORPORATE PROFESSIONAL */}
                <div style={{
                     background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 20%, #334155 40%, #475569 60%, #334155 80%, #0f172a 100%)',
                     borderRadius: '0',
                     padding: '80px 0',
                     marginBottom: '60px',
                    position: 'relative',
                     overflow: 'hidden',
                     width: '100vw',
                     marginLeft: 'calc(-50vw + 50%)',
                     backgroundSize: '600% 600%',
                     animation: 'corporateFlow 20s ease infinite'
                 }}>
                    {/* Professional Background Elements */}
                    <div style={{
                        position: 'absolute',
                        top: '-300px',
                        right: '-300px',
                        width: '800px',
                        height: '800px',
                        background: 'radial-gradient(circle, rgba(30, 64, 175, 0.08) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 1,
                        animation: 'corporateFloat 12s ease-in-out infinite'
                    }} />
                    
                    <div style={{
                        position: 'absolute',
                        bottom: '-200px',
                        left: '-200px',
                        width: '700px',
                        height: '700px',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 1,
                        animation: 'corporateFloat 15s ease-in-out infinite reverse'
                    }} />

                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '1000px',
                        height: '1000px',
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
                        borderRadius: '50%',
                        zIndex: 1,
                        animation: 'corporatePulse 25s ease-in-out infinite'
                    }} />

                    {/* Corporate Grid Pattern */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M50 0h50v50H50zM0 50h50v50H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        zIndex: 2
                    }} />

                    {/* Corporate Lines */}
                    <div style={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: '2px',
                        height: '200px',
                        background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
                        zIndex: 2
                    }} />
                    
                    <div style={{
                        position: 'absolute',
                        top: '30%',
                        right: '15%',
                        width: '150px',
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.3) 50%, transparent 100%)',
                        zIndex: 2
                    }} />

                     <div style={{ 
                         position: 'relative', 
                         zIndex: 3,
                         maxWidth: '1400px',
                         margin: '0 auto',
                         padding: '0 40px'
                     }}>
                         {/* Corporate Header Section */}
                         <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                             {/* Corporate Badge */}
                             <div style={{
                                 display: 'inline-block',
                                 background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                                 padding: '12px 30px',
                                 borderRadius: '50px',
                                 fontSize: '12px',
                            fontWeight: '800',
                                 marginBottom: '25px',
                                 border: '1px solid rgba(59, 130, 246, 0.3)',
                                 backdropFilter: 'blur(15px)',
                                 textTransform: 'uppercase',
                                 letterSpacing: '1.5px',
                                 boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                            color: 'white',
                                 position: 'relative',
                                 overflow: 'hidden'
                             }}>
                                 <div style={{
                                     position: 'absolute',
                                     top: 0,
                                     left: '-100%',
                                     width: '100%',
                                     height: '100%',
                                     background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
                                     animation: 'corporateShimmer 3s ease-in-out infinite'
                                 }} />
                                 <span style={{ position: 'relative', zIndex: 2 }}>
                                     🏆 EXCELENCIA CORPORATIVA
                                 </span>
                             </div>
                             
                             {/* Main Title */}
                             <h3 style={{
                                 fontSize: '3.2rem',
                                 fontWeight: '900',
                                 marginBottom: '25px',
                                 color: 'white',
                                 textShadow: '0 8px 25px rgba(0, 0, 0, 0.5)',
                                 lineHeight: '1.1',
                                 letterSpacing: '-1px',
                                 position: 'relative'
                             }}>
                                 Nuestros Pilares
                                 <br />
                                 <span style={{
                                     background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 30%, #1e40af 60%, #1e3a8a 100%)',
                                     WebkitBackgroundClip: 'text',
                                     WebkitTextFillColor: 'transparent',
                                     backgroundClip: 'text',
                                     position: 'relative',
                                     display: 'inline-block',
                                     filter: 'drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))'
                                 }}>
                                     Estratégicos
                                     <div style={{
                                         position: 'absolute',
                                         bottom: '-12px',
                                         left: '0',
                                         right: '0',
                                         height: '6px',
                                         background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
                                         borderRadius: '3px',
                                         opacity: 0.8,
                                         boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
                                     }} />
                                 </span>
                        </h3>

                             {/* Corporate Subtitle */}
                        <p style={{
                            fontSize: '1.2rem',
                                 color: 'rgba(255, 255, 255, 0.85)',
                                 marginBottom: '40px',
                                 maxWidth: '800px',
                                 margin: '0 auto 40px',
                                 lineHeight: '1.6',
                                 fontWeight: '400',
                                 textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                                 letterSpacing: '0.3px'
                             }}>
                                 Lideramos el mercado con estándares internacionales, certificaciones profesionales y un compromiso inquebrantable con la excelencia operacional
                             </p>

                         </div>

                         {/* Corporate Value Props Grid */}
                         <div style={{
                             display: 'grid',
                             gridTemplateColumns: 'repeat(4, 1fr)',
                             gap: '25px',
                             marginBottom: '50px'
                         }} className="value-props-grid">
                            {valueProps.map((prop, index) => {
                                const IconComponent = prop.icon
                                return (
                                     <div key={index} style={{
                                         textAlign: 'center',
                                         padding: '35px 20px',
                                         background: 'rgba(255, 255, 255, 0.06)',
                                         backdropFilter: 'blur(20px)',
                                         borderRadius: '20px',
                                         border: '1px solid rgba(255, 255, 255, 0.12)',
                                         transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                         position: 'relative',
                                         overflow: 'hidden',
                                         cursor: 'pointer',
                                         transform: 'translateY(0)',
                                         animation: `corporateFadeIn 0.8s ease-out ${index * 0.1}s both`,
                                         boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)'
                                     }}
                                        onMouseEnter={(e) => {
                                             e.currentTarget.style.transform = 'translateY(-20px) scale(1.03)'
                                             e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'
                                             e.currentTarget.style.boxShadow = `0 35px 80px rgba(0, 0, 0, 0.4), 0 0 0 2px ${prop.color}50`
                                             e.currentTarget.style.borderColor = `${prop.color}70`
                                        }}
                                        onMouseLeave={(e) => {
                                             e.currentTarget.style.transform = 'translateY(0) scale(1)'
                                             e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                                             e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.2)'
                                             e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                                         }}
                                     >
                                         {/* Corporate Corner Accent */}
                                        <div style={{
                                            position: 'absolute',
                                             top: '0',
                                             right: '0',
                                             width: '60px',
                                             height: '60px',
                                             background: `linear-gradient(135deg, ${prop.color} 0%, ${prop.color}dd 100%)`,
                                             clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)',
                                             opacity: 0.8
                                         }} />

                                         {/* Professional Glow Effect */}
                                            <div style={{
                                             position: 'absolute',
                                             top: '-60%',
                                             left: '-60%',
                                             width: '220%',
                                             height: '220%',
                                             background: `radial-gradient(circle, ${prop.color}15 0%, transparent 70%)`,
                                             zIndex: 1,
                                             animation: `corporatePulse 6s ease-in-out infinite ${index * 0.8}s`
                                         }} />

                                         {/* Corporate Shimmer */}
                                         <div style={{
                                             position: 'absolute',
                                             top: 0,
                                             left: '-100%',
                                             width: '100%',
                                             height: '100%',
                                             background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%)',
                                             transition: 'left 1s ease',
                                             opacity: 0,
                                             zIndex: 2
                                         }} className="corporate-shimmer" />

                                         <div style={{ position: 'relative', zIndex: 3 }}>
                                             {/* Professional Icon Container */}
                                             <div style={{
                                                 width: '90px',
                                                 height: '90px',
                                                 background: `linear-gradient(135deg, ${prop.color} 0%, ${prop.color}cc 100%)`,
                                                 borderRadius: '50%',
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 justifyContent: 'center',
                                                 margin: '0 auto 20px',
                                                 boxShadow: `0 15px 35px ${prop.color}50`,
                                                 position: 'relative',
                                                 overflow: 'hidden',
                                                 border: '2px solid rgba(255, 255, 255, 0.2)'
                                             }}>
                                                 {/* Professional Icon Glow */}
                                                 <div style={{
                                                     position: 'absolute',
                                                     top: '50%',
                                                     left: '50%',
                                                     transform: 'translate(-50%, -50%)',
                                                     width: '110px',
                                                     height: '110px',
                                                     background: `radial-gradient(circle, ${prop.color}40 0%, transparent 70%)`,
                                                     borderRadius: '50%',
                                                     animation: `corporatePulse 4s ease-in-out infinite ${index * 0.4}s`
                                                 }} />
                                                 
                                                 <IconComponent
                                                     size={36}
                                                     style={{ 
                                                         color: 'white',
                                                         position: 'relative',
                                                         zIndex: 2,
                                                         filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
                                                     }}
                                                 />
                                            </div>

                                             {/* Professional Title */}
                                             <h4 style={{
                                                 fontSize: '1.4rem',
                                                 fontWeight: '900',
                                                 color: 'white',
                                                 marginBottom: '15px',
                                                 textShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                                                 lineHeight: '1.2',
                                                 letterSpacing: '-0.3px'
                                             }}>
                                                 {prop.title}
                                             </h4>

                                             {/* Professional Description */}
                                             <p style={{
                                                 fontSize: '1rem',
                                                 color: 'rgba(255, 255, 255, 0.85)',
                                                 lineHeight: '1.5',
                                                 margin: 0,
                                                 fontWeight: '400',
                                                 letterSpacing: '0.2px'
                                             }}>
                                                 {prop.description}
                                             </p>

                                             {/* Professional Indicator */}
                                             <div style={{
                                                 marginTop: '15px',
                                                 display: 'flex',
                                                 alignItems: 'center',
                                                 justifyContent: 'center',
                                                 gap: '6px'
                                             }}>
                                                 <div style={{
                                                     width: '6px',
                                                     height: '6px',
                                                     borderRadius: '50%',
                                                     background: prop.color,
                                                     boxShadow: `0 0 8px ${prop.color}50`
                                                 }} />
                                                 <span style={{
                                                     fontSize: '0.75rem',
                                                     color: 'rgba(255, 255, 255, 0.7)',
                                                     fontWeight: '600',
                                                     textTransform: 'uppercase',
                                                     letterSpacing: '0.8px'
                                                 }}>
                                                     Certificado
                                                 </span>
                                             </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                         {/* Simplified Call to Action */}
                         <div style={{
                             textAlign: 'center',
                             padding: '50px 40px',
                             background: 'rgba(255, 255, 255, 0.06)',
                             borderRadius: '24px',
                             border: '1px solid rgba(255, 255, 255, 0.12)',
                             backdropFilter: 'blur(20px)',
                             position: 'relative',
                             overflow: 'hidden',
                             boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)'
                         }}>
                             <div style={{ position: 'relative', zIndex: 2 }}>
                                 <h4 style={{
                                     color: 'white',
                                     fontSize: '2rem',
                                     fontWeight: '800',
                                     marginBottom: '20px',
                                     textShadow: '0 4px 15px rgba(0, 0, 0, 0.4)'
                                 }}>
                                     ¿Listo para tu próximo proyecto?
                                 </h4>
                                 <p style={{
                                     color: 'rgba(255, 255, 255, 0.85)',
                                     fontSize: '1.2rem',
                                     marginBottom: '30px',
                                     maxWidth: '600px',
                                     margin: '0 auto 30px',
                                     lineHeight: '1.6'
                                 }}>
                                     Obtén una cotización personalizada y descubre cómo podemos transformar tu visión en realidad
                                 </p>
                                 
                                 <button 
                                     style={{
                                         background: 'linear-gradient(135deg, #dc2626 0%, #ea580c 100%)',
                                         color: 'white',
                                         border: 'none',
                                         padding: '18px 45px',
                                         borderRadius: '30px',
                                         fontSize: '1.1rem',
                                         fontWeight: '700',
                                         cursor: 'pointer',
                                         transition: 'all 0.4s ease',
                                         boxShadow: '0 15px 40px rgba(220, 38, 38, 0.4)',
                                         textTransform: 'uppercase',
                                         letterSpacing: '1px'
                                     }}
                                     onMouseEnter={(e) => {
                                         e.target.style.transform = 'translateY(-3px)'
                                         e.target.style.boxShadow = '0 20px 50px rgba(220, 38, 38, 0.5)'
                                     }}
                                     onMouseLeave={(e) => {
                                         e.target.style.transform = 'translateY(0)'
                                         e.target.style.boxShadow = '0 15px 40px rgba(220, 38, 38, 0.4)'
                                     }}
                                     onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                                 >
                                     Solicitar Cotización Gratuita
                                 </button>
                             </div>
                         </div>
                    </div>
                </div>

                 {/* Clients Marquee - PROFESIONAL */}
                <div style={{ 
                    marginBottom: '80px',
                    position: 'relative',
                     overflow: 'hidden',
                     width: '100vw',
                     marginLeft: 'calc(-50vw + 50%)',
                     background: 'linear-gradient(135deg, #0a0f1c 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0a0f1c 100%)',
                     padding: '100px 0',
                     backgroundSize: '400% 400%',
                     animation: 'gradientFlow 8s ease infinite'
                 }}>
                     {/* Animated background elements */}
                    <div style={{
                        position: 'absolute',
                         top: '-150px',
                         right: '-150px',
                         width: '400px',
                         height: '400px',
                         background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                         borderRadius: '50%',
                         zIndex: 1,
                         animation: 'float 6s ease-in-out infinite'
                     }} />
                     
                    <div style={{
                        position: 'absolute',
                         bottom: '-100px',
                         left: '-100px',
                        width: '300px',
                        height: '300px',
                         background: 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)',
                        borderRadius: '50%',
                         zIndex: 1,
                         animation: 'float 8s ease-in-out infinite reverse'
                    }} />
                    
                    <div style={{
                        position: 'absolute',
                         top: '50%',
                         left: '50%',
                         transform: 'translate(-50%, -50%)',
                         width: '600px',
                         height: '600px',
                         background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                        borderRadius: '50%',
                         zIndex: 1,
                         animation: 'pulse 10s ease-in-out infinite'
                     }} />

                     {/* Grid pattern overlay */}
                     <div style={{
                         position: 'absolute',
                         top: 0,
                         left: 0,
                         right: 0,
                         bottom: 0,
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M30 0h30v30H30zM0 30h30v30H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        zIndex: 2
                    }} />

                    <div style={{
                        position: 'relative',
                        zIndex: 3,
                         color: 'white',
                         maxWidth: '1400px',
                         margin: '0 auto',
                         padding: '0 40px'
                     }}>
                         {/* Header Section - PROFESIONAL */}
                         <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                            <div style={{
                                display: 'inline-block',
                                 background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(251, 191, 36, 0.2) 100%)',
                                 padding: '12px 32px',
                                 borderRadius: '50px',
                                fontSize: '14px',
                                 fontWeight: '700',
                                 marginBottom: '30px',
                                 border: '1px solid rgba(255, 255, 255, 0.2)',
                                 backdropFilter: 'blur(10px)',
                                 textTransform: 'uppercase',
                                 letterSpacing: '1px',
                                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                            }}>
                                🏆 CLIENTES CORPORATIVOS
                            </div>
                            
                            <h3 style={{
                                 fontSize: '3.5rem',
                                fontWeight: '900',
                                 marginBottom: '30px',
                                 textShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                                 lineHeight: '1.1',
                                 letterSpacing: '-1px'
                            }}>
                                Empresas Líderes que
                                <br />
                                <span style={{
                                     background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #dc2626 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                     backgroundClip: 'text',
                                     position: 'relative',
                                     display: 'inline-block'
                                }}>
                                    Confían en Nosotros
                                     <div style={{
                                         position: 'absolute',
                                         bottom: '-8px',
                                         left: '0',
                                         right: '0',
                                         height: '4px',
                                         background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #dc2626 100%)',
                                         borderRadius: '2px',
                                         opacity: 0.6
                                     }} />
                                </span>
                            </h3>

                            <p style={{
                                 fontSize: '1.4rem',
                                opacity: 0.9,
                                 maxWidth: '800px',
                                margin: '0 auto',
                                 lineHeight: '1.6',
                                 fontWeight: '300',
                                 textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                            }}>
                                Más de 6 años construyendo relaciones sólidas con las empresas más importantes de Chile
                            </p>
                        </div>

                         {/* Marquee - Continuo Sin Espacios */}
                        <div style={{
                             width: '100vw',
                             marginLeft: 'calc(-50vw + 50%)',
                                    position: 'relative',
                                    overflow: 'hidden',
                             background: 'rgba(255, 255, 255, 0.05)',
                             padding: '40px 0',
                             borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                             borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                         }}>
                             <Marquee
                                 speed={60}
                                 gradient={false}
                                 style={{
                                     width: '100%',
                                     display: 'flex',
                                     alignItems: 'center'
                                 }}
                             >
                                 {/* Duplicamos los logos para crear continuidad */}
                                 {[...clients, ...clients, ...clients].map((client, index) => (
                                     <div key={`continuous-${index}`} style={{
                                         display: 'flex',
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                         width: '260px',
                                         height: '140px',
                                         background: 'transparent',
                                         borderRadius: '20px',
                                         padding: '20px',
                                         margin: '0 20px',
                                         boxShadow: 'none',
                                         border: 'none',
                                         transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                         flexShrink: 0
                                }}
                                onMouseEnter={(e) => {
                                         e.currentTarget.style.transform = 'scale(1.1) translateY(-8px)'
                                         e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)'
                                         e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                                         e.currentTarget.style.borderRadius = '25px'
                                }}
                                onMouseLeave={(e) => {
                                         e.currentTarget.style.transform = 'scale(1) translateY(0)'
                                    e.currentTarget.style.boxShadow = 'none'
                                         e.currentTarget.style.background = 'transparent'
                                         e.currentTarget.style.borderRadius = '20px'
                                }}
                                >
                                         {/* Shine effect - Solo en hover */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                             bottom: 0,
                                             background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%)',
                                             animation: 'shimmer 3s ease-in-out infinite',
                                             opacity: 0,
                                             transition: 'opacity 0.3s ease'
                                         }} 
                                         onMouseEnter={(e) => {
                                             e.target.style.opacity = '1'
                                         }}
                                         onMouseLeave={(e) => {
                                             e.target.style.opacity = '0'
                                         }}
                                         />
                                         
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            style={{
                                                 height: '100px',
                                                 width: 'auto',
                                                 maxWidth: '220px',
                                                 objectFit: 'contain',
                                                 position: 'relative',
                                                 zIndex: 1,
                                                 filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
                                                 transition: 'all 0.3s ease'
                                             }}
                                             onMouseEnter={(e) => {
                                                 e.target.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))'
                                             }}
                                             onMouseLeave={(e) => {
                                                 e.target.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                                             }}
                                         />
                                </div>
                            ))}
                             </Marquee>
                        </div>
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
                @keyframes gradientFlow {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes gradientShift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.1); opacity: 1; }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(40px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes corporateFlow {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                
                @keyframes corporateFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(3deg); }
                }
                
                @keyframes corporatePulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                
                @keyframes corporateFadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(50px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                @keyframes corporateShimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                
                .value-props-grid > div:hover .corporate-shimmer {
                    opacity: 1;
                    left: 100%;
                }
                
                .value-props-grid > div:hover .corporate-button-shimmer {
                    opacity: 1;
                    left: 100%;
                }
                
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .value-props-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }
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