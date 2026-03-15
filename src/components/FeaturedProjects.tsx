"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, Home as HomeIcon, MapPin, Layers } from 'lucide-react';
import Link from 'next/link';

const projects = [
    {
        title: "Planta Logística Santiago",
        category: "Industrial",
        image: "/img/IMG-20260125-WA0074.jpg",
        tags: ["Acero", "Continuidad", "Estructura"],
        icon: <Building2 className="w-5 h-5" />
    },
    {
        title: "Cocina Gourmet Vitacura",
        category: "Residencial",
        image: "/img/IMG-20260125-WA0010.jpg",
        tags: ["Diseño", "Lujo", "Importado"],
        icon: <HomeIcon className="w-5 h-5" />
    },
    {
        title: "Interiorismo Moderno",
        category: "Residencial",
        image: "/img/IMG-20260210-WA0075.jpg",
        tags: ["Minimalista", "Iluminación", "Pisos"],
        icon: <Layers className="w-5 h-5" />
    }
];

const FeaturedProjects = () => {
    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[200px] -z-10 translate-x-1/2 -translate-y-1/2"></div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1 text-blue-400 text-xs font-black tracking-[0.2em] mb-6"
                        >
                            PORTAFOLIO DE ÉLITE
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                            Obras que <span className="text-gradient">Redefinen</span> <br /> el Estándar.
                        </h2>
                    </div>
                    <Link href="/proyectos" className="group flex items-center gap-4 py-4 px-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                        <span className="text-white font-bold">Ver todos los proyectos</span>
                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center group-hover:rotate-45 transition-transform">
                            <ArrowUpRight className="text-white w-5 h-5" />
                        </div>
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1, duration: 0.7 }}
                            className="group relative"
                        >
                            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] border border-white/5 transition-all duration-500 group-hover:translate-y-[-10px] group-hover:border-blue-500/30">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 saturate-[0.8] group-hover:saturate-100"
                                />

                                {/* Overlay Layers */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 transition-opacity"></div>

                                {/* Content */}
                                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                    <div className="translate-y-12 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 rounded-xl bg-blue-600 shadow-lg shadow-blue-600/50 flex items-center justify-center text-white">
                                                {project.icon}
                                            </div>
                                            <span className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-black text-white tracking-widest border border-white/10 uppercase">
                                                {project.category}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl font-black text-white mb-6 leading-tight group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                                            {project.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-black tracking-widest text-white/40 uppercase border border-white/10 px-3 py-1 rounded-md">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-2 text-white/50 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                                            <MapPin className="w-3 h-3 text-blue-500" />
                                            Santiago, Chile
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Glow */}
                            <div className="absolute -inset-2 bg-blue-600/0 group-hover:bg-blue-600/5 rounded-[3.5rem] -z-10 blur-xl transition-all duration-500"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjects;
