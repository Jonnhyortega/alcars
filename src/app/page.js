"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import AutoCard from "./components/autoCard";
import Navbar from "./components/navbar";
import { stock } from "@/data/stock";
import { Search, MapPin, Phone, Clock, ShieldCheck, Banknote, ThumbsUp, Car, ChevronDown } from "lucide-react";
import WhatsAppButton from "./components/whatsappButton";
import { motion } from "framer-motion";

export default function Home() {
  const [search, setSearch] = useState("");
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);
  const catalogRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 10) {
        setIsNavbarVisible(false); // Hide upon scrolling down
      } else {
        setIsNavbarVisible(true); // Show upon scrolling up
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredStock = stock.filter((auto) => {
    if (!auto.disponible) return false;
    const text = search.toLowerCase();
    return (
      auto.marca?.toLowerCase().includes(text) ||
      auto.model?.toLowerCase().includes(text) ||
      auto.version?.toLowerCase().includes(text) ||
      auto.motor?.toLowerCase().includes(text) ||
      auto.año?.toLowerCase().includes(text) ||
      auto.km?.toLowerCase().includes(text) ||
      (auto.moto && "moto".includes(text)) ||
      (auto.moneda && auto.moneda.toLowerCase().includes(text))
    );
  });

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans bg-background text-foreground transition-colors duration-300">
      {/* 🔹 Navbar */}
      <div 
        className={`fixed w-full top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Navbar />
      </div>

      <main className="flex flex-col">
        
        {/* 🔹 Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 pt-24 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-primary/30 blur-[100px] rounded-full"></div>
            <img
              src="https://res.cloudinary.com/do87isqjr/image/upload/v1760550481/logo-removebg-preview_m5ji7p.png"
              alt="Alcars Logo"
              className="relative z-10 w-48 md:w-64 drop-shadow-2xl bg-white rounded-full p-4"
            />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent max-w-4xl"
          >
            Tu próximo vehículo te está esperando
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
          >
            En Alcars te ofrecemos la mejor selección de autos, con la confianza y el respaldo que necesitás para tomar la mejor decisión.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={scrollToCatalog}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-lg hover:shadow-primary/25"
          >
            <Car className="w-6 h-6" />
            Ver Catálogo
          </motion.button>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
            className="absolute bottom-10 text-muted-foreground"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </section>

        {/* 🔹 Beneficios Section */}
        <section className="py-24 px-6 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                ¿Por qué elegir <span className="text-primary">Alcars</span>?
              </motion.h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Nos destacamos por brindarte una experiencia de compra segura, transparente y adaptada a tus necesidades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, title: "Confianza Total", desc: "Vehículos rigurosamente seleccionados y revisados para tu tranquilidad." },
                { icon: Banknote, title: "Financiación a Medida", desc: "Múltiples opciones de pago y planes de financiación que se ajustan a tu bolsillo." },
                { icon: ThumbsUp, title: "Atención Personalizada", desc: "Te acompañamos en cada paso, desde la elección hasta la entrega de tu auto." }
              ].map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 🔹 Contacto Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Estamos para ayudarte</h2>
                <p className="text-muted-foreground text-lg mb-10">
                  Vení a visitarnos, conocé nuestro stock en persona y sacate todas las dudas con nuestros asesores comerciales.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Dirección</h4>
                      <p className="text-muted-foreground">Avenida Asamblea 6, Parque Chacabuco, Ciudad Autonoma Buenos Aires</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Teléfono / WhatsApp</h4>
                      <a target="_blank" href={`https://wa.me/${1150109592}?text=${encodeURIComponent("Hola! Quisiera saber mas información sobre los vehiculos.")}`} className="text-muted-foreground">+54 9 11 5010-9592</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Horarios de Atención</h4>
                      <p className="text-muted-foreground">Lunes a Sabados: 11:00 hs a 19:00 hs<br/>Sábados: 8:00 a 12:30</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-border"
              >
                {/* Embedded Google Maps */}
                <iframe                 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.9104269232357!2d-58.4259777!3d-34.6317038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccbad1e6c0001%3A0xe835b61706950b35!2sAv.%20Asamblea%206%2C%20C1424CON%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1779201701344!5m2!1ses!2sar" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale-[0.2] contrast-125 hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 🔹 Catálogo Section */}
        <section ref={catalogRef} className="py-24 px-6 bg-secondary/20 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-6 mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold tracking-tight"
              >
                Nuestro Catálogo
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground text-lg max-w-2xl"
              >
                Buscá y encontrá el auto perfecto para vos.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative w-full max-w-2xl"
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar por marca, modelo, año..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-background border border-border rounded-full py-4 pl-12 pr-6 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
                />
              </motion.div>
            </div>

            {/* Resultados */}
            {filteredStock.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredStock.map((auto, index) => (
                  <AutoCard key={auto.id} auto={auto} index={index} />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-muted-foreground text-xl">
                  No se encontraron resultados para <span className="text-foreground font-semibold">&quot;{search}&quot;</span>.
                </p>
              </motion.div>
            )}
          </div>
        </section>

      </main>

      <WhatsAppButton />

      <footer className="text-center py-10 border-t border-border bg-card/30 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6">
          {/* 🔗 WhatsApp */}
          <a
            href="https://wa.me/5491150109592?text=Hola!%20Estoy%20interesado%20en%20consultar%20por%20un%20veh%C3%ADculo."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-green-500/10 hover:text-green-600 transition-all duration-300 group"
          >
            <Image width={24} height={24} src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp" className="group-hover:scale-110 transition-transform"/>
            <span className="font-medium">WhatsApp</span>
          </a>

          {/* 🔗 Instagram */}
          <a
            href="https://www.instagram.com/alcars.chacabuco/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-pink-500/10 hover:text-pink-600 transition-all duration-300 group"
          >
            <Image width={24} height={24} src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram" className="group-hover:scale-110 transition-transform"/>
            <span className="font-medium">Instagram</span>
          </a>
        </div>

        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} <span className="font-bold text-foreground">Alcars</span> • Todos los derechos reservados
        </p>
      </footer>

    </div>
  );
}
