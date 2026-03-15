"use client";

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, PlayCircle, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const images = [
    "/img/IMG-20260210-WA0141.jpg", // Gran Escala Obras
    "/img/IMG-20260210-WA0148.jpg", // Detalle Alta Calidad Industrial
    "/img/IMG-20260210-WA0089.jpg", // Interior Lujo/Remodelación
    "/img/IMG-20260125-WA0075.jpg", // Estructura Metálica Monumental
    "/img/IMG-20260210-WA0166.jpg", // Proyecto Finalizado Fachada
    "/img/IMG-20260210-WA0063.jpg", // Obra en Proceso Impresionante
    "/img/IMG-20260210-WA0138.jpg", // Terminaciones de Autor
    "/img/IMG-20260125-WA0046.jpg", // Detalle Técnico Fachada
    "/img/IMG-20260125-WA0062.jpg", // Techo Industrial Complejo
    "/img/IMG-20260125-WA0115.jpg"  // Cocina Premium Remodelada
];

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* Dynamic Background Slider */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2 }}
                        className="absolute inset-0 bg-zinc-950"
                    >
                        <motion.div
                            initial={{ scale: 1.1, x: 0 }}
                            animate={{ scale: 1.02, x: 10 }}
                            transition={{ duration: 10, ease: "linear" }}
                            className="relative w-full h-full opacity-60"
                        >
                            <Image
                                src={images[currentImage]}
                                alt="Proyecto IMC SERVICIOS SPA"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </motion.div>

                        {/* Gradient Mask for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-10"></div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Quick Contact & Social Strip - High End */}
            <div className="absolute top-0 right-0 h-full flex items-center pr-8 z-20 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col gap-8 items-center glass p-4 py-8 rounded-full border border-white/10 pointer-events-auto"
                >
                    <div className="flex flex-col gap-6">
                        <a href="https://www.instagram.com/imc_servicios_/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-500 transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="https://web.facebook.com/profile.php?id=61587094988723" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-500 transition-colors">
                            <Facebook size={20} />
                        </a>
                    </div>
                    <div className="w-px h-12 bg-white/10"></div>
                    <div className="[writing-mode:vertical-lr] flex gap-8">
                        <a href="tel:+56979749131" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                            +56 9 7974 9131
                        </a>
                        <a href="mailto:imcs.spa@gmail.com" className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors">
                            imcs.spa@gmail.com
                        </a>
                    </div>
                </motion.div>
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-2.5 text-blue-400 text-xs font-black mb-10 tracking-[0.4em] uppercase"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                        CONSTRUCCIÓN DE ALTO NIVEL
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
                        className="text-5xl md:text-8xl font-black text-white mb-10 leading-[0.85] tracking-tighter"
                    >
                        Donde la <br /> <span className="text-gradient italic">Precisión</span> <br /> encuentra el Arte.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="text-xl md:text-3xl text-white/50 max-w-2xl mb-16 leading-tight font-medium italic"
                    >
                        Resultados técnicos impecables para empresas <br className="hidden md:block" /> y remodelaciones de autor para su hogar.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-8"
                    >
                        <Link
                            href="#contacto"
                            className="group relative bg-blue-600 hover:bg-white text-white hover:text-blue-600 px-12 py-6 rounded-3xl font-black text-xl transition-all duration-500 flex items-center gap-4 shadow-[0_25px_50px_rgba(0,106,255,0.3)]"
                        >
                            Comenzar Ahora <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </Link>

                        <Link
                            href="#proyectos"
                            className="flex items-center gap-5 text-white font-black text-lg hover:text-blue-400 transition-all group px-4"
                        >
                            <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-all duration-500">
                                <PlayCircle className="w-8 h-8" />
                            </div>
                            Ver Portafolio
                        </Link>
                    </motion.div>

                    {/* Slider Controls/Indicators */}
                    <div className="mt-20 flex gap-3">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImage(idx)}
                                className={`h-1.5 transition-all duration-500 rounded-full ${currentImage === idx ? "w-12 bg-blue-500" : "w-4 bg-white/20 hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
