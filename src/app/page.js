"use client";

import { useState } from "react";
import AutoCard from "./components/autoCard";
import Navbar from "./components/navbar";
import { stock } from "@/data/stock";
import { Search } from "lucide-react";
import WhatsAppButton from "./components/whatsappButton";

export default function Home() {
  const [search, setSearch] = useState("");

  const filteredStock = stock.filter((auto) => {
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

  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-black via-neutral-950 to-black text-white">
      {/* 🔹 Navbar */}
      <div className="absolute top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-neutral-800 shadow-md">
        <Navbar />
      </div>

      <main className="pt-28 px-6 pb-20 max-w-7xl mx-auto space-y-10">
        {/* 🔍 Buscador */}
        <div className="relative max-w-xl mx-auto mt-9">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por marca, modelo, año, motor, versión..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-2xl py-3 pl-12 pr-4 text-gray-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/70 transition-all shadow-lg"
          />
        </div>

        {/* 🔹 Resultados */}
        {filteredStock.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStock.map((auto) => (
              <AutoCard key={auto.id} auto={auto} />
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-400 text-lg mt-12">
            No se encontraron resultados para{" "}
            <span className="text-white font-semibold">"{search}"</span>.
          </p>
        )}

        
      </main>
       <WhatsAppButton />
       <footer className="text-center text-neutral-400 text-sm py-8 border-t border-neutral-800 bg-black/70 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-3">
            {/* 🔗 WhatsApp */}
            <a
              href="https://wa.me/5491150109592?text=Hola!%20Estoy%20interesado%20en%20consultar%20por%20un%20veh%C3%ADculo."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-400 transition-colors"
            >
              <img width="28" height="28" src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="whatsapp--v1"/>
              WhatsApp
            </a>

            {/* 🔗 Instagram */}
            <a
              href="https://www.instagram.com/alcars.chacabuco/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-pink-500 transition-colors"
            >
              <img width="28" height="28" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new"/>
              Instagram
            </a>
          </div>

          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">Alcars</span> • Todos los derechos reservados
          </p>
        </footer>

    </div>
  );
}
