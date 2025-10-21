"use client";

import { stock } from "@/data/stock";
import GalleryViewer from "@/app/components/galleryViewer";
import Link from "next/link";
import { enviarWhatsApp } from "@/app/utils/redireccionarAwhatsapp";
import React from "react";

export default function AutoPage({ params }) {
  const { id } = React.use(params);
  const auto = stock.find((a) => a.id === Number(id));

  if (!auto) {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <p className="text-red-500 text-xl font-semibold mb-4">
          🚫 Vehículo no encontrado
        </p>
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300 underline text-lg"
        >
          ← Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* 🔙 Volver */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6 font-medium"
        >
          ← Volver al catálogo
        </Link>

        {/* 🧾 Info principal */}
        <div className="bg-gray-800/60 rounded-2xl p-6 shadow-xl backdrop-blur-sm border border-gray-700">
          <h1 className="text-3xl font-bold text-white mb-2">
            {auto.marca} {auto.model} {auto.version}
          </h1>

          <p className="text-gray-300 text-lg mb-2">
            Año {auto.año} • {auto.km.toLocaleString("es-AR")} km • Motor{" "}
            {auto.motor}
          </p>

          <div className="flex items-center gap-3 mt-4">
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
          <button
            onClick={() => enviarWhatsApp(auto)}
            className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-500 active:bg-green-700 transition-colors text-white rounded-xl font-semibold text-lg shadow-md"
          >
            💬 Consultar con asesor
          </button>
        </div>

        {/* 🖼️ Galería */}
        <div className="mt-8 bg-gray-800/40 rounded-2xl shadow-md border border-gray-700 p-4">
          <GalleryViewer images={auto.imgs} />
        </div>
      </div>
    </section>
  );
}
