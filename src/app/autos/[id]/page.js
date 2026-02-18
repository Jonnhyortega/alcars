"use client";

import { use } from "react";
import { stock } from "@/data/stock";
import GalleryViewer from "@/app/components/galleryViewer";
import Link from "next/link";
import { enviarWhatsApp } from "@/app/utils/redireccionarAwhatsapp";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, MessageCircle } from "lucide-react";

export default function AutoPage({ params }) {
  // ✅ Desempaquetar correctamente los parámetros (Next.js 15+)
  const { id } = use(params);

  const auto = stock.find((a) => a.id === Number(id));

  if (!auto || !auto.disponible) {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center bg-background text-foreground">
        <p className="text-destructive text-xl font-semibold mb-4">
          🚫 Vehículo no encontrado
        </p>
        <Link
          href="/"
          className="text-primary hover:text-primary/80 underline text-lg transition-colors"
        >
          ← Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background text-foreground py-12 px-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        {/*  Volver */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/70 mb-4 font-medium transition-all group"
        >
           <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
           Volver al catálogo
        </Link>

        {/* 🧾 Info principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border rounded-3xl p-8 shadow-xl backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-4 flex-1 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-3 justify-center md:justify-start">
                    <h2 className="text-xl font-bold text-primary tracking-wider uppercase">
                        {auto.marca}
                    </h2>
                    {auto.make_logo && (
                        <div className="w-8 h-8 opacity-80">
                        <Image
                            src={auto.make_logo}
                            alt={auto.marca}
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                        />
                        </div>
                    )}
                 </div>
                 <h1 className="text-4xl md:text-5xl font-extrabold text-card-foreground">
                    {auto.model} <span className="text-muted-foreground font-light">{auto.version}</span>
                 </h1>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start text-muted-foreground font-medium text-lg">
                 <span className="px-3 py-1 bg-secondary rounded-full border border-border">Año {auto.año}</span>
                 <span className="px-3 py-1 bg-secondary rounded-full border border-border">{auto.km} km</span>
                 <span className="px-3 py-1 bg-secondary rounded-full border border-border">Motor {auto.motor}</span>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 mt-4 bg-secondary/50 p-4 rounded-xl border border-border w-full md:w-auto">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground font-semibold uppercase">Precio</span>
                    <p
                    className={`text-3xl font-extrabold ${
                        auto.precio > 0 ? "text-foreground" : "text-muted-foreground"
                    }`}
                    >
                    US$ {auto.precio || "Consultar"}
                    </p>
                </div>

                {!auto.disponible && (
                  <span className="bg-destructive/10 text-destructive font-semibold text-sm px-3 py-1 rounded-lg border border-destructive/20">
                    🔴 Vendido
                  </span>
                )}
              </div>

              {/* 🟩 Botón principal */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => enviarWhatsApp(auto)}
                className="mt-4 px-8 py-4 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-green-500/30 flex items-center gap-2 transition-all"
              >
                <MessageCircle className="w-6 h-6" />
                Consultar con asesor
              </motion.button>
            </div>
            
            {/* Can add a featured image or something here if desired, otherwise standard layout works */}

          </div>
        </motion.div>

        {/* 🖼️ Galería */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
            <GalleryViewer images={auto.imgs} />
        </div>

        <footer className="text-center text-muted-foreground text-sm pt-12 pb-6 border-t border-border mt-12">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">Alcars</span> – Automotors
        </footer>
      </div>
    </section>
  );
}
