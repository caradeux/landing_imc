"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, Building2, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Empresas & Hogar', href: '#servicios', icon: <Building2 className="w-4 h-4" /> },
        { name: 'Nuestros Proyectos', href: '#proyectos' },
        { name: 'Quiénes Somos', href: '#nosotros' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/20">
                        <Image
                            src="/img/logo/logo.jpg"
                            alt="IMCS Chile Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className={`font-black text-2xl tracking-tighter uppercase ${scrolled ? 'text-white' : 'text-white'}`}>
                        IMC <span className="text-blue-500">SERVICIOS SPA</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-all hover:text-blue-400 ${scrolled ? 'text-white/80' : 'text-white/90'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="https://imcscotizador.cl/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-all hover:text-blue-400 opacity-70 hover:opacity-100 ${scrolled ? 'text-white' : 'text-white'}`}
                    >
                        <LogIn className="w-4 h-4" />
                        Acceso
                    </Link>
                    <Link
                        href="#contacto"
                        className="bg-blue-600 hover:bg-white hover:text-blue-600 text-white px-8 py-3 rounded-xl font-black transition-all shadow-xl flex items-center gap-2 text-sm uppercase tracking-tighter"
                    >
                        <Phone className="w-4 h-4" />
                        Llámanos
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 w-full glass shadow-2xl lg:hidden overflow-hidden border-t border-white/10"
                    >
                        <div className="flex flex-col p-8 gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-white font-black text-xl flex items-center gap-4 uppercase tracking-tight"
                                >
                                    <span className="text-blue-500">{link.icon}</span>
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="https://imcscotizador.cl/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                                className="text-white font-black text-xl flex items-center gap-4 uppercase tracking-tight opacity-70"
                            >
                                <span className="text-blue-500"><LogIn className="w-6 h-6" /></span>
                                Acceso Interno
                            </Link>                            
                            <Link
                                href="#contacto"
                                className="bg-blue-600 text-white text-center py-5 rounded-2xl font-black text-lg shadow-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                HABLAR CON UN EXPERTO
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
