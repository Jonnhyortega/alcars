"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryViewer({ images }) {
  const [index, setIndex] = useState(null);

  const close = () => setIndex(null);
  const next = useCallback(() => setIndex((prev) => (prev + 1) % images.length), [images]);
  const prev = useCallback(() => setIndex((prev) => (prev - 1 + images.length) % images.length), [images]);

  // 🔹 Permite navegar con las flechas del teclado
  useEffect(() => {
    if (index === null) return;
    const handleKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index, next, prev]);

  return (
    <div className="my-8">
      {/* Miniaturas */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((url, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="overflow-hidden rounded-xl cursor-pointer shadow-md"
            onClick={() => setIndex(i)}
          >
            <img
              src={url}
              alt={`Foto ${i + 1}`}
              className="w-full h-56 object-cover transition-all duration-200"
            />
          </motion.div>
        ))}
      </div>

      {/* Modal fullscreen */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            {/* Imagen actual */}
            <motion.img
              key={index}
              src={images[index]}
              alt={`Foto ${index + 1}`}
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg object-contain select-none"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Botón cerrar */}
            <button
              onClick={close}
              className="absolute top-6 right-6 text-white text-3xl font-bold hover:scale-110 transition-transform"
            >
              ✕
            </button>

            {/* Flecha anterior */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-6 text-white text-4xl font-bold hover:scale-125 transition-transform select-none"
            >
              ‹
            </button>

            {/* Flecha siguiente */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-6 text-white text-4xl font-bold hover:scale-125 transition-transform select-none"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
