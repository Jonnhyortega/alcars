"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AutoCard({ auto }) {
  const [index, setIndex] = useState(0);
  const isSold = !auto.disponible;

  const next = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % auto.imgs.length);
  };

  const prev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((prev) =>
      prev === 0 ? auto.imgs.length - 1 : prev - 1
    );
  };

  return (
    <Link
      href={`/autos/${auto.id}`}
      className="group block bg-neutral-900/80 border border-neutral-800 hover:border-blue-500/50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Slider */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={auto.imgs[index]}
          alt={auto.marca}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
        />

        {/* Flecha izquierda */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 
                    bg-neutral-900/70 backdrop-blur-sm text-white 
                    p-2 rounded-full shadow-lg hover:bg-neutral-800/90
                    transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>


        {/* Flecha derecha */}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 
                    bg-neutral-900/70 backdrop-blur-sm text-white 
                    p-2 rounded-full shadow-lg hover:bg-neutral-800/90
                    transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicadores */  }
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {auto.imgs.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${
                i === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Badge VENDIDO */}
        {isSold && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow-lg">
            Vendido
          </span>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="p-4 space-y-1">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white tracking-wide group-hover:text-blue-400 transition-colors">
            {auto.marca} {auto.model}
          </h2>

          {auto.make_logo && (
            <img
              src={auto.make_logo}
              alt={auto.marca}
              className="w-8 h-8 opacity-80 group-hover:opacity-100 transition-all"
            />
          )}
        </div>

        <p className="text-neutral-400 text-sm">
          {auto.año} • Motor {auto.motor}
        </p>

        <p className="text-neutral-400 text-sm">{auto.km} km</p>

        <p
          className={`font-bold text-xl pt-1 ${
            isSold ? "text-red-500" : "text-blue-400 group-hover:text-green-400"
          }`}
        >
          {isSold ? "Vendido" : `US$ ${auto.precio}`}
        </p>

        <span className="text-blue-300 underline text-sm opacity-70 group-hover:opacity-100">
          Ver detalles →
        </span>
      </div>
    </Link>
  );
}
