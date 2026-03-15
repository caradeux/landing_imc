"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, Shield, Award, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const About = () => {
    const [activeMedia, setActiveMedia] = useState(0);
    const mediaItems = [
        { type: 'video', src: '/img/VID-20260125-WA0141.mp4' },
        { type: 'image', src: '/img/IMG-20260210-WA0141.jpg' },
        { type: 'video', src: '/img/VID-20260125-WA0142.mp4' },
        { type: 'image', src: '/img/IMG-20260210-WA0148.jpg' },
        { type: 'video', src: '/img/VID-20260125-WA0146.mp4' },
        { type: 'image', src: '/img/IMG-20260210-WA0166.jpg' },
        { type: 'image', src: '/img/IMG-20260210-WA0138.jpg' },
        { type: 'video', src: '/img/VID-20260125-WA0021.mp4' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveMedia((prev) => (prev + 1) % mediaItems.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [mediaItems.length]);

    const categories = [
        { title: "Industrial", desc: "Mantenimiento, estructuras y electricidad semi-industrial.", icon: <Shield className="w-5 h-5" /> },
        { title: "Comercial", desc: "Habilitación de locales, oficinas y centros de distribución.", icon: <Target className="w-5 h-5" /> },
        { title: "Residencial", desc: "Remodelaciones de lujo, ampliaciones y terminaciones de autor.", icon: <Users className="w-5 h-5" /> }
    ];

    return (
        <section id="nosotros" className="py-40 bg-black relative overflow-hidden">
            {/* Background Decorative */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-32 items-start">

                    {/* Visual Side - Dynamic Media Slider */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative group lg:sticky lg:top-32"
                    >
                        <div className="absolute -inset-4 bg-blue-600/10 rounded-[4rem] blur-2xl"></div>

                        <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeMedia}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-0"
                                >
                                    {mediaItems[activeMedia].type === 'video' ? (
                                        <video
                                            src={mediaItems[activeMedia].src}
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Image
                                            src={mediaItems[activeMedia].src}
                                            alt="IMC SERVICIOS SPA"
                                            fill
                                            className="object-cover"
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                            {/* Slider Dots */}
                            <div className="absolute top-8 right-8 flex gap-2 z-10">
                                {mediaItems.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${activeMedia === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Floating Action Badge */}
                        <motion.div
                            initial={{ opacity: 0, x: 30, y: 30 }}
                            whileInView={{ opacity: 1, x: 0, y: 0 }}
                            transition={{ delay: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-10 -right-10 w-48 h-48 rounded-[2rem] glass border border-white/10 flex flex-col items-center justify-center p-6 text-center shadow-2xl hidden md:flex"
                        >
                            <span className="text-4xl font-black text-blue-500">+100</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Proyectos <br /> Entregados</span>
                        </motion.div>
                    </motion.div>

                    {/* Text Content Side */}
                    <div className="pt-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-6 py-2 text-blue-400 text-xs font-black tracking-[0.4em] uppercase mb-10"
                        >
                            <Users size={14} /> QUIÉNES SOMOS
                        </motion.div>

                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-12">
                            Excelencia en <br /> <span className="text-gradient">360 Grados.</span>
                        </h2>

                        <div className="space-y-8 text-white/50 text-xl font-medium leading-relaxed mb-16 italic">
                            <p>
                                En <span className="text-white font-black not-italic uppercase">IMC SERVICIOS SPA</span>, entendemos que cada proyecto es una inversión crítica. Nuestra capacidad técnica nos permite navegar con maestría entre la <span className="text-white">rigurosidad industrial</span> y la <span className="text-white">estética residencial de lujo</span>.
                            </p>
                            <p>
                                No solo ejecutamos obras; asesoramos desde la ingeniería conceptual hasta el último acabado, asegurando que cada metro cuadrado refleje profesionalismo y durabilidad.
                            </p>
                        </div>

                        {/* Core Pillars Grid */}
                        <div className="grid gap-6 mb-16">
                            {categories.map((cat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-black uppercase text-sm tracking-widest mb-1">{cat.title}</h4>
                                        <p className="text-white/40 text-sm font-medium">{cat.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTAs or Values */}
                        <div className="flex flex-wrap gap-10 items-center">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-blue-500 w-6 h-6" />
                                    <span className="text-white/70 font-bold uppercase text-[10px] tracking-widest">Garantía Post-Obra</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-blue-500 w-6 h-6" />
                                    <span className="text-white/70 font-bold uppercase text-[10px] tracking-widest">Personal Técnico SEC / AWS</span>
                                </div>
                            </div>

                            <div className="h-12 w-px bg-white/10 hidden md:block"></div>

                            <div className="flex gap-6 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                                <div className="flex flex-col items-center gap-1">
                                    <Shield className="w-5 h-5 text-white" />
                                    <span className="text-[8px] font-black uppercase tracking-tighter text-white">Seguridad</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Target className="w-5 h-5 text-white" />
                                    <span className="text-[8px] font-black uppercase tracking-tighter text-white">Precisión</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Award className="w-5 h-5 text-white" />
                                    <span className="text-[8px] font-black uppercase tracking-tighter text-white">Calidad</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default About;
