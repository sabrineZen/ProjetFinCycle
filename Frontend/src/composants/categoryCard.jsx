import { motion } from "framer-motion";

function CategoryCard({ couleur, category, hoverClass, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      /* MODIFICATION DES TAILLES (w et h) :
         - Mobile : 180px
         - Tablettes : 200px
         - Desktop : 220px 
      */
      className={`relative p-3 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] rounded-[25px] flex justify-center items-center flex-col flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-500 ${hoverClass}`}
      style={{ background: couleur }}
    >
      {/* --- CERCLE IMAGE PLUS PETIT --- */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center overflow-hidden group">
        <img
          src={category.image || "/default.png"}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* --- TITRE AJUSTÉ --- */}
      <h2 className="text-sm sm:text-base md:text-lg font-bold mt-4 text-white text-center uppercase tracking-tight">
        {category.name}
      </h2>

      {/* --- EFFET DE BRILLANCE --- */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default CategoryCard;