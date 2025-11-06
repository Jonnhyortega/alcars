"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black via-neutral-950 to-black z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.9, 1.05, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        {/* 🧠 Logo con animación profesional */}
        <Image
          src="https://res.cloudinary.com/do87isqjr/image/upload/v1760550481/logo-removebg-preview_m5ji7p.png"
          alt="Logo Alcars"
          width={120}
          height={120}
          className="drop-shadow-[0_0_25px_rgba(59,130,246,0.4)] select-none"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-6 text-gray-400 text-sm tracking-widest uppercase font-medium"
        >
          Cargando experiencia...
        </motion.p>
      </motion.div>
    </div>
  );
}
