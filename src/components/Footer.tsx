import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-navy-dark text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-8">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                                <Image
                                    src="/img/logo/logo.jpg"
                                    alt="IMCS Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="font-bold text-2xl tracking-tight text-white uppercase">
                                IMC <span className="text-blue-500">SERVICIOS SPA</span>
                            </span>
                        </Link>
                        <p className="text-white/50 text-lg mb-8 max-w-sm">
                            Líderes en Chile brindando soluciones de ingeniería, mantenimiento y construcción con un estándar de excelencia inigualable.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/imc_servicios_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="https://web.facebook.com/profile.php?id=61587094988723" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook className="w-5 h-5" /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">Servicios</h4>
                        <ul className="space-y-4">
                            <li><Link href="/empresas" className="text-white/60 hover:text-blue-400 transition-colors">Mantención Industrial</Link></li>
                            <li><Link href="/empresas" className="text-white/60 hover:text-blue-400 transition-colors">Obras Comerciales</Link></li>
                            <li><Link href="/hogar" className="text-white/60 hover:text-blue-400 transition-colors">Remodelaciones Hogar</Link></li>
                            <li><Link href="/hogar" className="text-white/60 hover:text-blue-400 transition-colors">Ampliaciones</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">Contacto</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                                <span className="text-white/60">Santiago, Región Metropolitana, Chile</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                                <span className="text-white/60">+56 9 7974 9131</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                                <span className="text-white/60">imcs.spa@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="relative w-6 h-6 rounded-md overflow-hidden opacity-50">
                            <Image
                                src="/img/logo/logo.jpg"
                                alt="Logo Icon"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="text-white/30 text-sm">
                            © {new Date().getFullYear()} IMC SERVICIOS SPA. Todos los derechos reservados.
                        </p>
                    </div>
                    <div className="flex gap-8">
                        <Link href="#" className="text-white/30 hover:text-white text-sm transition-colors">Privacidad</Link>
                        <Link href="#" className="text-white/30 hover:text-white text-sm transition-colors">Términos</Link>
                        <Link href="#" className="text-white/30 hover:text-white text-sm transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
