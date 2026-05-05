import React from "react";
import { motion } from "framer-motion";

function PlatPopular({ plat, onAjouter }) {
  return (
    <motion.div
      // On définit "group" ici pour que l'image à l'intérieur puisse réagir au survol du parent
      className="group bg-white w-full max-w-[400px] rounded-[30px] overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-300 relative cursor-pointer"
      whileHover={{ y: -10 }}
    >
      {/* ─── PARTIE HAUTE : IMAGE AVEC EFFET ZOOM (Comme Restaurant) ─── */}
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src={plat.image || "/burger-demo.png"} 
          alt={plat.name}
          // "group-hover:scale-110" : l'image zoom quand on survole la carte
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </div>

      {/* ─── PARTIE BASSE : INFOS ─── */}
      <div className="p-5 flex flex-col gap-0.5 relative">
        <h3 className="text-lg font-bold text-[#A64B2A] leading-tight">
          {plat.name}
        </h3>
        <p className="text-[10px] text-gray-400 font-medium">
          burger house
        </p>
        <p className="text-[10px] text-gray-300 leading-relaxed mt-1 mb-4">
          Burger artisanal fait maison avec frite
        </p>

        <div className="flex justify-between items-end mt-2">
          <span className="text-base font-bold text-gray-600">
            {plat.prix} DA
          </span>

          {/* BOUTON ORANGE CARRÉ ARRONDI */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
                e.stopPropagation(); // Évite de déclencher le clic de la carte
                onAjouter();
            }}
            className="bg-[#FF7D32] text-white w-7 h-7 rounded-lg flex items-center justify-center text-lg font-medium shadow-sm hover:bg-[#e66a21] transition-colors relative z-10"
          >
            +
          </motion.button>
        </div>

        {/* EFFET DE REFLET LUXURY (Le rectangle horizontal qui passe) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ x: "-150%" }}
            whileHover={{ x: "150%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default PlatPopular;