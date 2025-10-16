"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-400 text-white px-6 py-3 flex items-center justify-around absolute top-0 right-0 w-[100%]">
      <h1 className="font-bold text-xl text-gray-900 text-center"> Catalogo de vehiculos </h1>
      <img src="https://res.cloudinary.com/do87isqjr/image/upload/v1760550481/logo-removebg-preview_m5ji7p.png" width={"100px"} alt="Logo alcars" />
      {/* <div className="flex gap-4">
        <Link href="/">Inicio</Link>
        <Link href="/">Financiación</Link>
        <Link href="/">Contacto</Link>
      </div> */}
    </nav>
  );
}
