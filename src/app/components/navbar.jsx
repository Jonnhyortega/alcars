"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4">
      <h1 className="font-bold text-2xl text-white tracking-wide">
        <span className="text-blue-500">Al</span>cars
      </h1>

      {/* <div className="flex items-center gap-6">
        <a href="/" className="text-gray-300 hover:text-white transition-colors">
          Catálogo
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          Financiación
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          Contacto
        </a>
      </div> */}

      <img
        src="https://res.cloudinary.com/do87isqjr/image/upload/v1760550481/logo-removebg-preview_m5ji7p.png"
        alt="Logo Alcars"
        width={80}
        height={80}
        className="drop-shadow-[0_0_5px_rgba(255,255,255,0.9)]"
      />

    </nav>
  );
}
