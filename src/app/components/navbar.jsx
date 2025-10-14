"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-6 py-3 flex justify-between absolute top-0 left-0 w-[100%]">
      <h1 className="font-bold text-xl"> 🟡 Garage de AlCars </h1>
      {/* <div className="flex gap-4">
        <Link href="/">Inicio</Link>
        <Link href="/">Financiación</Link>
        <Link href="/">Contacto</Link>
      </div> */}
    </nav>
  );
}
