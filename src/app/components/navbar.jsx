"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="relative group">
         <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
         <img
            src="https://res.cloudinary.com/do87isqjr/image/upload/v1760550481/logo-removebg-preview_m5ji7p.png"
            alt="Logo Alcars"
            width={120}
            className="relative z-10 drop-shadow-md hover:scale-105 transition-transform duration-300 bg-white rounded-full p-2"
          />
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </nav>
  );
}
