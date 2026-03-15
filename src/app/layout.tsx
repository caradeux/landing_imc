import type { Metadata } from "next";
import { Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UXWrapper from "@/components/UXWrapper";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IMC SERVICIOS SPA | Especialistas en Construcción y Mantenimiento",
  description: "Tranquilidad para su empresa y su hogar. Reparaciones, remodelaciones y servicios técnicos con maestros expertos en todo Chile. Calidad certificada.",
  keywords: ["construcción", "mantenimiento industrial", "remodelación de casas", "servicios eléctricos", "IMC SERVICIOS SPA"],
  icons: {
    icon: "/img/logo/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${outfit.variable} ${geistMono.variable} antialiased bg-black mesh-gradient noise min-h-screen`}>
        <UXWrapper>
          <Navbar />
          {children}
          <Footer />
        </UXWrapper>
      </body>
    </html>
  );
}
