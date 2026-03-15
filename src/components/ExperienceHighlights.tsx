"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ClipboardList,
    CalendarCheck,
    ShieldCheck,
    Zap
} from 'lucide-react';
import { useRef } from 'react';

const steps = [
    {
        num: "01",
        icon: <ClipboardList className="w-10 h-10" />,
        title: "Presupuesto Gratis",
        desc: "Propuesta técnica detallada en menos de 24 horas hábiles.",
        color: "from-blue-600 to-blue-400",
        shadow: "shadow-blue-500/40"
    },
    {
        num: "02",
        icon: <CalendarCheck className="w-10 h-10" />,
        title: "Visita Técnica",
        desc: "Validación experta en terreno para máxima precisión.",
        color: "from-cyan-500 to-blue-500",
        shadow: "shadow-cyan-500/40"
    },
    {
        num: "03",
        icon: <ShieldCheck className="w-10 h-10" />,
        title: "Garantía IMCS",
        desc: "Ejecución profesional con respaldo y post-venta total.",
        color: "from-blue-700 to-indigo-600",
        shadow: "shadow-indigo-500/40"
    }
];

const ExperienceHighlights = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineScale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="py-48 relative overflow-hidden bg-black">
            {/* High-Tech Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px]"></div>
            </div>

            <motion.div style={{ opacity }} className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 text-blue-400 text-[11px] font-black tracking-[0.5em] uppercase mb-10 shadow-2xl"
                    >
                        <Zap size={14} className="fill-blue-400" /> EL MÉTODO IMCS
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] mb-12">
                        Nuestro <br /> <span className="text-gradient italic">Proceso.</span>
                    </h2>
                    <p className="text-white/40 text-xl md:text-2xl font-medium max-w-3xl mx-auto italic leading-relaxed">
                        Hemos simplificado la construcción para brindarte <br className="hidden md:block" /> una experiencia sin fricciones y de alta gama.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Glowing Connecting Line */}
                    <div className="absolute top-24 left-0 w-full h-1 bg-white/5 hidden lg:block overflow-hidden rounded-full">
                        <motion.div
                            style={{ scaleX: lineScale }}
                            className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 origin-left shadow-[0_0_20px_rgba(0,106,255,1)]"
                        ></motion.div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-20 lg:gap-16 relative">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2, duration: 0.8 }}
                                className="relative group"
                            >
                                {/* Visual Node */}
                                <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black border-[3px] border-blue-600 hidden lg:block z-20 group-hover:scale-125 transition-transform shadow-[0_0_15px_rgba(0,106,255,0.5)]">
                                    <div className="w-full h-full bg-blue-600 rounded-full scale-0 group-hover:scale-50 transition-transform"></div>
                                </div>

                                <div className="flex flex-col items-center">
                                    {/* Icon Node Container */}
                                    <div className="mb-14 relative pt-12">
                                        <div className={`w-36 h-36 rounded-[3rem] bg-gradient-to-br ${step.color} p-[1px] ${step.shadow} group-hover:rotate-3 transition-all duration-500`}>
                                            <div className="w-full h-full bg-[#0a0a0b] rounded-[3rem] flex items-center justify-center relative overflow-hidden backdrop-blur-md">
                                                {/* Subtle Number */}
                                                <span className="absolute top-2 right-4 text-5xl font-black text-white/[0.03] select-none italic">
                                                    {step.num}
                                                </span>
                                                <div className="text-white relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                                    {step.icon}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Details */}
                                    <div className="text-center group-hover:translate-y-[-5px] transition-transform duration-500">
                                        <h3 className="text-3xl font-black text-white mb-4 uppercase tracking-tight italic">
                                            {step.title}
                                        </h3>
                                        <p className="text-white/40 text-lg font-bold leading-snug mb-10 max-w-[280px] mx-auto italic">
                                            &quot;{step.desc}&quot;
                                        </p>

                                    </div>
                                </div>

                                {/* Mobile Separator */}
                                {idx !== steps.length - 1 && (
                                    <div className="w-12 h-px bg-gradient-to-r from-blue-600 to-transparent mx-auto my-16 lg:hidden"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

            </motion.div>
        </section>
    );
};

export default ExperienceHighlights;
