"use client";

import { use } from "react";
import { stock } from "@/data/stock";
import GalleryViewer from "@/app/components/galleryViewer";
import Link from "next/link";
import { enviarWhatsApp } from "@/app/utils/redireccionarAwhatsapp";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AutoPage({ params }) {
  // ✅ Desempaquetar correctamente los parámetros (Next.js 15+)
  const { id } = use(params);

  const auto = stock.find((a) => a.id === Number(id));

  if (!auto) {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
        <p className="text-red-500 text-xl font-semibold mb-4">
          🚫 Vehículo no encontrado
        </p>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-400 underline text-lg transition-colors"
        >
          ← Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/*  Volver */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-4 font-medium transition-all"
        >
           🔙 Volver al catálogo
        </Link>

        {/* 🧾 Info principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="g-neutral-900/80 border border-neutral-800 rounded-3xl p-8 shadow-lg backdrop-blur-sm"
        >
          <div className="flex justify-between items-center flex-wrap gap-6">
            <div className="space-y-3 flex-1 flex flex-col justify-between items-center ">
              <h1 className="text-4xl font-extrabold text-white tracking-tight flex flex-col justify-between items-center gap-3">
                {auto.marca}{" "}
                <span className="text-gray-300">{auto.model}</span>{" "}
                <span className="text-blue-400">{auto.version}</span>
                <img
                  src={auto.make_logo}
                  alt={auto.marca}
                  className="object-contain opacity-90 hover:opacity-100 transition-all"
                />
              </h1>

              <p className="text-neutral-400 text-lg">
                <span className="text-gray-200 font-medium">
                  Año {auto.año}
                </span>{" "}
                • {auto.km} km • Motor {auto.motor}
              </p>

              <div className="flex items-center gap-4 mt-4">
                <p
                  className={`text-3xl font-extrabold ${
                    auto.precio > 0 ? "text-green-400" : "text-gray-500"
                  }`}
                >
                  US$ {auto.precio || "Consultar"}
                </p>

                {!auto.disponible && (
                  <span className="text-red-500 font-semibold text-sm bg-red-500/10 px-3 py-1 rounded-lg border border-red-500/30">
                    🔴 Vendido
                  </span>
                )}
              </div>

              {/* 🟩 Botón principal */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => enviarWhatsApp(auto)}
                className="mt-6 px-7 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 active:from-green-700 transition-all text-white rounded-xl font-semibold text-lg shadow-md flex items-center gap-2"
              >
                💬 Consultar con asesor
              </motion.button>
            </div>

          </div>
        </motion.div>

        {/* 🖼️ Galería */}
        
          <GalleryViewer images={auto.imgs} />

        <p className="text-center text-neutral-500 text-sm mt-12">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-white">Alcars</span> – Ficha técnica digital
        </p>
      </div>
    </section>
  );
}
