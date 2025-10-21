import Image from "next/image";
import AutoCard from "./components/autoCard";
import { stock } from "@/data/stock";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* 🔹 Navbar fijo arriba */}
      <div className="absolute mb-2 top-0 left-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <Navbar />
      </div>

      {/* 🔹 Contenido principal con padding para evitar solapamiento */}
      <main className="pt-28 px-6 pb-20 max-w-7xl mx-auto mt-4">

        {/* 🔹 Grilla responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stock.map((auto) => (
            <AutoCard key={auto.id} auto={auto} />
          ))}
        </div>
      </main>

      {/* Footer opcional */}
      <footer className="text-center text-gray-400 text-sm py-8 border-t border-gray-800">
        © {new Date().getFullYear()} Alcars
      </footer>
    </div>
  );
}
