"use client";
import { useEffect, useState } from "react";

export default function AutoCard({ auto }) {
  const [formattedPrice, setFormattedPrice] = useState(auto.precio.toString());

  useEffect(() => {
    setFormattedPrice(auto.precio.toLocaleString("es-AR"));
  }, [auto.precio]);

  return (
    <div className="relative p-4 border rounded-xl shadow hover:shadow-lg transition-all bg-white cursor-pointer h-[200px]">
      <h2 className="text-xl font-semibold">
        {auto.marca} {auto.model} {auto.version}
      </h2>
      <p className="text-gray-600">{auto.año} • Motor {auto.motor}</p>
      <p className="text-gray-500">{auto.km} km</p>
      <p className="text-blue-600 font-bold mt-2">
        {auto.moneda === "usd" ? "US$" : "$"} {formattedPrice}
      </p>
      <img src={auto.miniatura} alt="Foto en miniatura de vehiculo" width="140px" className="absolute bottom-0 right-0" />

    </div>
  );
}
