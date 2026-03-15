"use client";

import { motion, useScroll, useSpring } from 'framer-motion';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {/* Dynamic Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 origin-left z-[100] shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                style={{ scaleX }}
            />

            {children}

            {/* High-End Floating Action Buttons */}
            <div className="fixed bottom-10 right-10 flex flex-col gap-6 z-50">
                {/* Scroll to Top */}
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="w-16 h-16 glass backdrop-blur-3xl border border-white/10 rounded-[1.5rem] flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 shadow-2xl group"
                >
                    <ArrowUp className="w-8 h-8 group-hover:-translate-y-1 transition-transform" />
                </motion.button>

                {/* WhatsApp Button - Ultra Conversion Style */}
                <motion.a
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://wa.me/56979749131?text=Hola%20IMC%20SERVICIOS%20SPA,%20necesito%20cotizar%20un%20proyecto."
                    target="_blank"
                    className="flex items-center gap-4 bg-[#25D366] text-white p-2 pr-6 rounded-[2rem] shadow-[0_20px_40px_rgba(37,211,102,0.4)] group overflow-hidden"
                >
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:rotate-[360deg] transition-all duration-700">
                        <MessageCircle className="w-8 h-8 fill-current" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Asesoría Directa</span>
                        <span className="text-sm font-black tracking-tight">¡Hablemos ahora! 👋</span>
                    </div>

                    {/* Internal Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </motion.a>
            </div>
        </>
    );
}
