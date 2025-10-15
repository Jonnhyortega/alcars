"use client";
import Link from "next/link";

export default function AutoCard({ auto }) {
  return (
    <Link href={`/autos/${auto.id}`}>
      <div className="relative hover:shadow-2xl hover:bg-gray-400 transition-all cursor-pointer h-[150px] bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 shadow-lg">
        <h2 className="text-xl font-semibold">
          {auto.marca} {auto.model} {auto.version}
        </h2>
        <p className="text-gray-600">{auto.año} • Motor {auto.motor}</p>
        <p className="text-gray-500">{auto.km} km</p>
        <p className="text-blue-600 font-bold mt-2">
          US$ {auto.precio}
        </p>
        <small className="text-red-600">{!auto.disponible && "Vendido"}</small>

        <img src={auto.miniatura} alt="Foto en miniatura de vehiculo" width="100px" className="absolute right-0 bottom-0" />
      </div>
    </Link>
  );
}
