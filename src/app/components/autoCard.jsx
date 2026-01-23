"use client";

import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AutoCard({ auto, index = 0 }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const isSold = !auto.disponible;
  const hasImages = auto.imgs && auto.imgs.length > 0;

  const next = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasImages) {
        setCurrentImgIndex((prev) => (prev + 1) % auto.imgs.length);
    }
  };

  const prev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hasImages) {
        setCurrentImgIndex((prev) =>
        prev === 0 ? auto.imgs.length - 1 : prev - 1
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
        <Link
        href={`/autos/${auto.id}`}
        className="group flex flex-col h-full bg-card border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-3xl overflow-hidden transition-all duration-300 relative"
        >
        {/* Slider */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted">
            {hasImages ? (
                <>
                <Image
                    src={auto.imgs[currentImgIndex]}
                    alt={`${auto.marca} ${auto.model}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {auto.imgs.length > 1 && (
                    <>
                    <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                                bg-black/50 backdrop-blur-md text-white 
                                p-2 rounded-full shadow-lg hover:bg-black/80
                                transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100
                                bg-black/50 backdrop-blur-md text-white 
                                p-2 rounded-full shadow-lg hover:bg-black/80
                                transition-all duration-300 transform translate-x-2 group-hover:translate-x-0"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Indicadores */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {auto.imgs.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 transition-all duration-300 rounded-full shadow-sm ${
                            i === currentImgIndex ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                            }`}
                        />
                        ))}
                    </div>
                    </>
                )}
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                    Sin imágenes
                </div>
            )}

            {/* Badge ESTADO */}
            <div className="absolute top-3 left-3 flex gap-2">
                {isSold ? (
                    <span className="bg-red-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        VENDIDO
                    </span>
                ) : (
                    <span className="bg-green-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        DISPONIBLE
                    </span>
                )}
            </div>
        </div>

        {/* CONTENIDO */}
        <div className="p-5 flex flex-col flex-grow bg-card transition-colors">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                        {auto.marca}
                    </h3>
                    <h2 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {auto.model}
                    </h2>
                </div>
                {auto.make_logo && (
                    <div className="w-10 h-10 p-1 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 flex items-center justify-center">
                        <img
                        src={auto.make_logo}
                        alt={auto.marca}
                        className="w-full h-full object-contain opacity-80"
                        />
                    </div>
                )}
            </div>

            <p className="text-muted-foreground text-sm font-medium mb-4 line-clamp-1">
                {auto.version} • {auto.año} • {auto.motor}
            </p>

            <div className="mt-auto pt-4 border-t border-dashed border-border flex items-center justify-between">
                <div className="flex flex-col">
                     <span className="text-xs text-muted-foreground uppercase font-semibold">Precio</span>
                     <span className={`text-xl font-bold ${isSold ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {isSold ? "Vendido" : `US$ ${auto.precio}`}
                     </span>
                </div>
                
                <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                    Ver más <ChevronRight className="w-3 h-3" />
                </div>
            </div>
        </div>
        </Link>
    </motion.div>
  );
}
