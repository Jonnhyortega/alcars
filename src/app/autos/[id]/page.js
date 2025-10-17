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
      <section className="p-8 text-center from-gray-900 via-gray-800 to-gray-900">
        <p className="text-red-500 font-semibold">Vehículo no encontrado.</p>
        <Link href="/" className="text-blue-600 underline">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-12 px-6 from-gray-900 via-gray-800 to-gray-900">
      <Link href="/" className="text-blue-600 underline mb-4 block">
        ← Volver al catálogo
      </Link>

      <h1 className="text-2xl font-bold mb-4">
        {auto.marca} {auto.model} {auto.version}
      </h1>

      <p className="text-gray-700">
        Año {auto.año} • {auto.km} km • Motor {auto.motor}
      </p>

      <p className="text-2xl font-bold text-green-700 mt-2">
        US$ {auto.precio}
      </p>

      <button
        className="p-4 bg-blue-600 hover:bg-blue-400 cursor-pointer rounded-md mt-2"
        onClick={() => enviarWhatsApp(auto)}
      >
        Consultar con asesor
      </button>

      <small className="text-red-600">
        {!auto.disponible && "Vendido"}
      </small>

      <GalleryViewer images={auto.imgs} />
    </section>
  );
}
