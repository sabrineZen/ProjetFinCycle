import React from "react";
import { motion } from "framer-motion";

function RestaurantPopular({ restaurant }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white w-full max-w-[450px] rounded-[30px] overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.05)] border border-gray-100 transition-all duration-300 cursor-pointer"
    >
      {/* IMAGE */}
      <div className="w-full h-[200px] overflow-hidden bg-orange-50 flex items-center justify-center">
        <span className="text-6xl">🍽️</span>
      </div>

      {/* INFOS */}
      <div className="p-5 flex flex-col gap-0.5 relative">
        <h3 className="text-lg font-bold text-[#A64B2A] leading-tight">
          {restaurant.nomRestaurant || "Restaurant"}
        </h3>

        <p className="text-[10px] text-gray-400 font-medium">
          {restaurant.adresseRestaurant || "—"}
        </p>

        <p className="text-[10px] text-gray-300 leading-relaxed mt-1 mb-4">
          {restaurant.totalCommandes} commande(s)
        </p>

        <div className="flex justify-center mt-2">
          <div className="w-4 h-1 bg-gray-100 rounded-full" />
        </div>

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