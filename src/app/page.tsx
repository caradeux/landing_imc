"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import MainServices from "@/components/MainServices";
import About from "@/components/About";
import ExperienceHighlights from "@/components/ExperienceHighlights";
import Gallery from "@/components/Gallery";
import { Clock, Award, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Trabajos en mi Local o Empresa",
    message: ""
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (formData.name.trim().length < 3) newErrors.name = "Ingrese su nombre completo";

    // Validación de teléfono chileno básica
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!formData.phone.replace(/\s/g, '').match(/^(\+?56)?9\d{8}$/)) {
      newErrors.phone = "Formato: +56 9 XXXX XXXX";
    }

    if (formData.message.trim().length < 10) newErrors.message = "Por favor, detalle un poco más su requerimiento";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simular envío
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", phone: "", service: "Trabajos en mi Local o Empresa", message: "" });

      // Limpiar después de 5 segundos
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <main className="flex flex-col bg-black overflow-hidden">
      {/* 1. Hero Presentación */}
      <Hero />

      {/* 2. Servicios de Inmediato (Petición del usuario) */}
      <MainServices />

      {/* 3. Quiénes Somos (Autoría Técnica) */}
      <About />

      {/* 4. Barra de Experiencia Rápida */}
      <ExperienceHighlights />

      {/* 5. Galería de Proyectos Reales */}
      <Gallery />

      {/* 7. Formulario de Contacto */}
      <section id="contacto" className="py-40 relative bg-black">
        <div className="container mx-auto px-6">
          <div className="glass p-12 md:p-24 rounded-[4rem] border-white/10 relative overflow-hidden glow-blue">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-blue-400 font-black text-sm tracking-[0.3em] uppercase block mb-8 underline decoration-2 underline-offset-8">Conversémos hoy</span>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[0.9] tracking-tighter">Hagamos realidad <br /> su <span className="text-blue-500 italic">Visión.</span></h2>
                <p className="text-white/50 text-xl mb-12 font-medium">Pida su visita técnica ahora. Vamos a su empresa o domicilio para evaluar su proyecto.</p>

                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                      <Clock className="w-8 h-8" />
                    </div>
                    <span className="text-white text-lg font-bold italic">Respuesta rápida a su celular</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                      <Award className="w-8 h-8" />
                    </div>
                    <span className="text-white text-lg font-bold italic">Presupuestos detallados y honestos</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl skew-x-[-1deg] relative">
                <AnimatePresence>
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 z-10 bg-white rounded-[3rem] flex flex-col items-center justify-center text-center p-10"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-black text-black mb-2 italic">¡Solicitud Enviada!</h3>
                      <p className="text-black/50 font-medium">Lo contactaremos en menos de 24 horas.</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-black/40 text-xs font-black uppercase tracking-widest ml-2">Su Nombre</label>
                        {errors.name && <span className="text-red-500 text-[10px] font-bold uppercase">{errors.name}</span>}
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        className={`w-full bg-gray-100 border-2 rounded-2xl p-5 text-black font-bold focus:ring-2 ring-blue-500 outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-transparent'}`}
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-black/40 text-xs font-black uppercase tracking-widest ml-2">Su Teléfono / WhatsApp</label>
                        {errors.phone && <span className="text-red-500 text-[10px] font-bold uppercase">{errors.phone}</span>}
                      </div>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: "" });
                        }}
                        className={`w-full bg-gray-100 border-2 rounded-2xl p-5 text-black font-bold focus:ring-2 ring-blue-500 outline-none transition-all ${errors.phone ? 'border-red-500 bg-red-50' : 'border-transparent'}`}
                        placeholder="+56 9..."
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-black/40 text-xs font-black uppercase tracking-widest ml-2">¿Qué necesita realizar?</label>
                    <div className="relative">
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-gray-100 border-none rounded-2xl p-5 text-black font-bold focus:ring-2 ring-blue-500 outline-none appearance-none cursor-pointer px-6"
                      >
                        <option>Trabajos en mi Local o Empresa</option>
                        <option>Reparación o Arreglo Comercial</option>
                        <option>Remodelación o Ampliación en mi Casa</option>
                        <option>Otro requerimiento</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-black/20">
                        ▼
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <label className="text-black/40 text-xs font-black uppercase tracking-widest ml-2">Cuéntenos un poco más</label>
                      {errors.message && <span className="text-red-500 text-[10px] font-bold uppercase">{errors.message}</span>}
                    </div>
                    <textarea
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: "" });
                      }}
                      className={`w-full bg-gray-100 border-2 rounded-2xl p-5 text-black font-bold focus:ring-2 ring-blue-500 outline-none h-40 resize-none transition-all ${errors.message ? 'border-red-500 bg-red-50' : 'border-transparent'}`}
                      placeholder="Ej: Necesito pintar mi local y arreglar el piso..."
                    ></textarea>
                  </div>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={`w-full py-6 text-white font-black text-xl rounded-2xl transition-all shadow-xl uppercase tracking-tighter flex items-center justify-center gap-3 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-black shadow-blue-600/20'
                      }`}
                  >
                    {isSubmitting ? 'Enviando...' : 'Pedir Visita o Presupuesto'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
