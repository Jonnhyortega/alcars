"use client";
import Link from "next/link";

export default function AutoCard({ auto }) {
  return (
    <Link href={`/autos/${auto.id}`}>
      <div className="group relative hover:shadow-2xl hover:bg-gray-800 hover:border-[1px_solid_gold] transition-all cursor-pointer h-[150px] bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-4 shadow-lg">
        <h2 className="text-xl font-semibold text-blue-600">
          {auto.marca} {auto.model} {auto.version}
        </h2>
        <p className="text-gray-200">{auto.año} • Motor {auto.motor}</p>
        <p className="text-gray-400 group-hover:drop-shadow-xl">{auto.km} km</p>
        <p className="text-blue-600 font-bold mt-2 group-hover:text-green-500 group-hover:drop-shadow-lg">
          US$ {auto.precio}
        </p>
        <small className="text-red-600 group-hover:font-extrabold group-hover:drop-shadow-lg">{!auto.disponible && "Vendido"}</small>

        <img src={auto.make_logo} alt="Foto en miniatura de vehiculo" width={`${auto.marca == "Bajaj" ? "80px" :
         auto.marca == "Renault" ? 
         "40px": "60px"}`} className={`group-hover:drop-shadow-xl absolute ${auto.marca == "Bajaj" ? "right-2 bottom-4" : auto.marca == "Renault" ? "right-5 bottom-4" : "right-5 bottom-2"}`} />
        {/* <img src={auto.miniatura} alt="Foto en miniatura de vehiculo" width="100px" className="absolute right-0 bottom-0" /> */}
      </div>
    </Link>
  );
}
