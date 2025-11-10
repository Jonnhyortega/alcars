"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryViewer({ images }) {
  const [index, setIndex] = useState(null);
  const [direction, setDirection] = useState(0);

  const close = () => setIndex(null);
  const next = useCallback(() => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  }, [images]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images]);

  // 🔹 Navegación por teclado
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

   // 🔹 Bloquear scroll cuando se abre el visor
   useEffect(() => {
    if (index !== null) {
      const scrollBarCompensation =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarCompensation}px`; // evita salto

      return () => {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }
  }, [index]);

  // 🔹 Sensibilidad al arrastre (en píxeles)
  const SWIPE_CONFIDENCE_THRESHOLD = 80;

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
      <AnimatePresence custom={direction}>
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
              initial={{ x: direction * 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;

                if (offset.x > SWIPE_CONFIDENCE_THRESHOLD) {
                  prev();
                } else if (offset.x < -SWIPE_CONFIDENCE_THRESHOLD) {
                  next();
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Botón cerrar */}
            <button
              onClick={close}
              className="absolute top-6 right-6 text-white text-3xl font-bold hover:scale-110 transition-transform"
            >
              ✕
            </button>

            {/* Flechas */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-6 text-white text-4xl font-bold hover:scale-125 transition-transform select-none"
            >
              ‹
            </button>
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
