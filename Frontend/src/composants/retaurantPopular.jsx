import React from "react";
import { motion } from "framer-motion";

function RestaurantPopular({ restaurant }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white w-full max-w-[450px] rounded-[30px] overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-300 cursor-pointer"
    >
      {/* ─── PARTIE HAUTE : IMAGE BANNIÈRE ─── */}
      <div className="w-full h-[200px] overflow-hidden">
        <img
          src={restaurant.image || "/resto-demo.jpg"}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* ─── PARTIE BASSE : INFOS (Style Figma) ─── */}
      <div className="p-5 flex flex-col gap-0.5 relative">
        <h3 className="text-lg font-bold text-[#A64B2A] leading-tight">
          {restaurant.name || "Maison Opera"}
        </h3>
        
        <p className="text-[10px] text-gray-400 font-medium">
          situe a bejaia ville
        </p>
        
        <p className="text-[10px] text-gray-300 leading-relaxed mt-1 mb-4">
          Burger artisanal fait maison avec frite
        </p>

        {/* Petit indicateur visuel en bas (comme sur Figma) */}
        <div className="flex justify-center mt-2">
           <div className="w-4 h-1 bg-gray-100 rounded-full" />
        </div>

        {/* --- EFFET DE RÉFLEXION HORIZONTALE (Luxury) --- */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ x: "-150%" }}
            whileHover={{ x: "150%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-[35%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default RestaurantPopular;