"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2, Camera } from 'lucide-react';

const galleryImages = [
    // INDUSTRIAL & EMPRESAS
    { src: "/img/IMG-20260210-WA0148.jpg", category: "Industrial" },
    { src: "/img/IMG-20260210-WA0137.jpg", category: "Industrial" },
    { src: "/img/IMG-20260125-WA0074.jpg", category: "Industrial" },
    { src: "/img/IMG-20260125-WA0080.jpg", category: "Industrial" },
    { src: "/img/IMG-20260125-WA0103.jpg", category: "Industrial" },
    { src: "/img/IMG-20260210-WA0166.jpg", category: "Industrial" },

    // HOGAR & RESIDENCIAL
    { src: "/img/IMG-20260125-WA0115.jpg", category: "Hogar" },
    { src: "/img/IMG-20260210-WA0089.jpg", category: "Hogar" },
    { src: "/img/IMG-20260210-WA0138.jpg", category: "Hogar" },
    { src: "/img/IMG-20260210-WA0085.jpg", category: "Hogar" },
    { src: "/img/IMG-20260125-WA0096.jpg", category: "Hogar" },
    { src: "/img/IMG-20260210-WA0140.jpg", category: "Hogar" },

    // OBRAS & ESTRUCTURAS
    { src: "/img/IMG-20260210-WA0141.jpg", category: "Obras" },
    { src: "/img/IMG-20260125-WA0075.jpg", category: "Obras" },
    { src: "/img/IMG-20260210-WA0063.jpg", category: "Obras" },
    { src: "/img/IMG-20260125-WA0046.jpg", category: "Obras" },
    { src: "/img/IMG-20260210-WA0147.jpg", category: "Obras" },
    { src: "/img/IMG-20260210-WA0144.jpg", category: "Obras" },

    // TÉCNICO & DETALLE
    { src: "/img/IMG-20260125-WA0077.jpg", category: "Estructuras" },
    { src: "/img/IMG-20260125-WA0062.jpg", category: "Estructuras" },
    { src: "/img/IMG-20260125-WA0093.jpg", category: "Estructuras" },
    { src: "/img/IMG-20260210-WA0075.jpg", category: "Estructuras" },
    { src: "/img/IMG-20260210-WA0145.jpg", category: "Estructuras" },
    { src: "/img/IMG-20260210-WA0055.jpg", category: "Estructuras" },
];

const categories = ["Todos", "Industrial", "Hogar", "Obras", "Estructuras"];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [filter, setFilter] = useState("Todos");

    const filteredImages = filter === "Todos"
        ? galleryImages
        : galleryImages.filter(img => img.category === filter);

    return (
        <section id="proyectos" className="py-32 bg-black relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 bg-blue-600/10 border border-blue-600/20 rounded-full px-6 py-2 text-blue-400 text-xs font-black tracking-[0.3em] uppercase mb-8"
                        >
                            <Camera size={14} /> PORTAFOLIO VISUAL
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                            Nuestra <br /> <span className="text-gradient italic">Maestría</span> en Imágenes.
                        </h2>
                    </div>

                    {/* Filter Bar */}
                    <div className="flex flex-wrap gap-4 bg-white/5 p-2 rounded-2xl backdrop-blur-md border border-white/10">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filter === cat
                                    ? "bg-blue-600 text-white shadow-[0_10px_20px_rgba(0,106,255,0.3)]"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((img, idx) => (
                            <motion.div
                                layout
                                key={img.src}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="relative aspect-square group cursor-pointer overflow-hidden rounded-[2.5rem] bg-zinc-900"
                                onClick={() => setSelectedImage(img.src)}
                            >
                                <Image
                                    src={img.src}
                                    alt="Proyecto IMCS Chile"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                />

                                {/* Overlay Detail */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{img.category}</p>
                                    <div className="flex justify-between items-center">
                                        <h4 className="text-white text-lg font-black tracking-tight">Ver Detalle</h4>
                                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                                            <Maximize2 size={18} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6 md:p-20"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src={selectedImage}
                                alt="Highlight IMCS"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
