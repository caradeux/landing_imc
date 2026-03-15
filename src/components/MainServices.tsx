"use client";

import { motion } from 'framer-motion';
import {
    Zap,
    Building2,
    Hammer,
    Umbrella,
    Paintbrush,
    ShieldCheck,
    ChefHat,
    DoorClosed,
    Layout
} from 'lucide-react';


const allServices = [
    {
        title: "Servicios Eléctricos",
        subtitle: "Instalaciones profesionales y automatización",
        desc: "Tableros, iluminación LED y mantenimiento eléctrico garantizado tanto en industrias como en residencias.",
        points: ["Instalaciones bajo norma SEC", "Electricidad Semi-Industrial", "Iluminación de Alta Eficiencia"],
        icon: <Zap className="w-6 h-6" />,
    },
    {
        title: "Obras Civiles",
        subtitle: "Construcción de alta resistencia",
        desc: "Hormigones, fundaciones y estructuras sólidas diseñadas para durar décadas.",
        points: ["Hormigón de Alta Calidad", "Enfierraduras Especializadas", "Fundaciones y Cimiento"],
        icon: <Building2 className="w-6 h-6" />,
    },
    {
        title: "Soldadura Especializada",
        subtitle: "Precisión en estructuras metálicas",
        desc: "Soldadura especializada bajo norma internacional AWS para proyectos críticos.",
        points: ["Soldadura Especializada", "Estructuras Metálicas", "Norma AWS"],
        icon: <ShieldCheck className="w-6 h-6" />,
    },
    {
        title: "Techumbres Industriales",
        subtitle: "Protección y cubiertas metálicas",
        desc: "Soluciones definitivas contra filtraciones climáticas con materiales de primer nivel.",
        points: ["Cubiertas Metálicas", "Aislación Térmica", "Sistemas de Drenaje"],
        icon: <Umbrella className="w-6 h-6" />,
    },
    {
        title: "Carpintería Especializada",
        subtitle: "Soluciones arquitectónicas",
        desc: "Trabajos expertos en Metalcom, aluminio y mobiliario corporativo o residencial.",
        points: ["Carpintería en Metalcom", "Estructuras de Aluminio", "Mobiliario a Medida"],
        icon: <Hammer className="w-6 h-6" />,
    },
    {
        title: "Acabados Premium",
        subtitle: "Pintura y acabados especiales",
        desc: "Aplicación profesional de esquemas de pintura y protección anticorrosiva.",
        points: ["Pintura Profesional", "Acabados de Lujo", "Protección Anticorrosiva"],
        icon: <Paintbrush className="w-6 h-6" />,
    },
    {
        title: "Muebles de Cocina",
        subtitle: "Diseño y fabricación nacional",
        desc: "Cocinas de alta gama que transforman su hogar con materiales de lujo y diseño 3D.",
        points: ["Diseño 3D Incluido", "Materiales Premium", "Instalación Profesional"],
        icon: <ChefHat className="w-6 h-6" />,
    },
    {
        title: "Clósets a Medida",
        subtitle: "Optimización inteligente de espacios",
        desc: "Almacenamiento diseñado para su comodidad, optimizando cada rincón disponible.",
        points: ["Medidas Exactas", "Máximo Aprovechamiento", "Variedad de Acabados"],
        icon: <DoorClosed className="w-6 h-6" />,
    },
    {
        title: "Barandas de Vidrio",
        subtitle: "Elegancia y seguridad estructural",
        desc: "Vidrio templado bajo norma SEC para una estética moderna y protección total.",
        points: ["Vidrio Templado 10mm", "Acero Inoxidable", "Norma SEC"],
        icon: <Layout className="w-6 h-6" />,
        badge: "Hogar & Empresa"
    }
];

const MainServices = () => {
    return (
        <section id="servicios" className="py-32 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] -z-10 animate-pulse-slow delay-1000"></div>

            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 text-blue-400 text-xs font-black tracking-[0.3em] uppercase mb-8 shadow-2xl"
                    >
                        Nuestras Especialidades
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
                        Lo que <span className="text-gradient">Hacemos</span> Mejor
                    </h2>
                    <p className="text-white/40 text-xl md:text-2xl font-medium italic leading-relaxed">
                        Soluciones integrales con calidad industrial <br className="hidden md:block" /> tanto para su negocio como para su hogar.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {allServices.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: idx * 0.05, duration: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                            className="group h-full"
                        >
                            <div className="glass-card h-full p-12 rounded-[4rem] flex flex-col relative overflow-hidden">
                                {/* Visual Accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/15 transition-colors duration-500"></div>

                                <div className="flex justify-between items-start mb-10 relative z-10">
                                    <div className="w-16 h-16 bg-blue-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-[0_15px_35px_rgba(0,106,255,0.4)] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        {service.icon}
                                    </div>
                                    <div className="flex flex-col items-end gap-2 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                                        IMC <br /> EXPERTISE
                                    </div>
                                </div>

                                <div className="mb-8 relative z-10">
                                    <h4 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                                        {service.title}
                                    </h4>
                                    <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-500/60 mb-6 italic">
                                        {service.subtitle}
                                    </p>
                                    <p className="text-white/40 text-[15px] leading-relaxed font-semibold">
                                        {service.desc}
                                    </p>
                                </div>

                                <div className="mt-auto space-y-4 mb-10 relative z-10">
                                    <div className="h-px bg-white/10 w-full mb-6"></div>
                                    {service.points.map((point, pIdx) => (
                                        <div key={pIdx} className="flex items-center gap-4 text-white/60">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-125 transition-transform shadow-[0_0_10px_rgba(0,106,255,1)]"></div>
                                            <span className="text-[13px] font-black uppercase tracking-wider leading-none">{point}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MainServices;
