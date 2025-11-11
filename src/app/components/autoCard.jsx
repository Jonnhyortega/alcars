"use client";
import Link from "next/link";
import Image from "next/image";

export default function AutoCard({ auto }) {
  const isSold = !auto.disponible;

  return (
    <Link href={`/autos/${auto.id}`} className="group relative">
      <div className="relative h-[180px] bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 shadow-md hover:shadow hover:border-blue-500/40 transition-all duration-300 backdrop-blur-sm cursor-pointer">
        {/* Encabezado */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-white tracking-wide group-hover:text-blue-400 transition-colors">
              {auto.marca} {auto.model} {auto.version}
            </h2>
            <p className="text-neutral-400 text-sm">
              {auto.año} • Motor {auto.motor}
            </p>
          </div>
          {auto.make_logo && (
            <img
              src={auto.make_logo}
              alt={auto.marca}
              width={45}
              height={45}
              className="opacity-80 group-hover:opacity-100 transition-all"
            />
          )}
        </div>

        {/* Info */}
        <div className="mt-3">
          <p className="text-neutral-300 text-sm">{auto.km} km</p>
          <p
            className={`mt-1 font-bold text-lg ${
              isSold ? "text-red-500" : "text-blue-400 group-hover:text-green-400"
            }`}
          >
            {isSold ? "Vendido" : `US$ ${auto.precio}`}
          </p>
        </div>
        <span className="absolute bottom-2.5 right-2.5 text-white font-extralight text-sm transform transition duration-100 group-hover:scale-105">🔍 Ver fotos</span>
        {/* Efecto inferior */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/60 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
    </Link>
  );
}
