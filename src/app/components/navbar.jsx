"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-around absolute top-0 right-0 w-[100%]">
      <h1 className="font-bold text-xl text-blue-500 text-center bg-transparent"> Catalogo de vehiculos </h1>
      <img src="https://res.cloudinary.com/do87isqjr/image/upload/v1760550481/logo-removebg-preview_m5ji7p.png" width={"100px"} alt="Logo alcars" />
      {/* <div className="flex gap-4">
        <Link href="/">Inicio</Link>
        <Link href="/">Financiación</Link>
        <Link href="/">Contacto</Link>
      </div> */}
    </nav>
  );
}
