import { motion } from "framer-motion";

function CategoryCard({ couleur, category, hoverClass, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-3 w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px] rounded-[25px] flex justify-center items-center flex-col flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-500 ${hoverClass}`}
      style={{ background: couleur }}
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center overflow-hidden group">
        {category.image ? (
          <img
            src={`http://localhost:5000${category.image}`}
            alt={category.nom}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <span className="text-3xl md:text-4xl">🍽️</span>
        )}
      </div>

      <h2 
        className="text-sm sm:text-base md:text-lg font-bold mt-4 text-center uppercase tracking-tight"
        style={{ color: "#8B2A1B" }}
      >
        {category.nom}
      </h2>

      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default CategoryCard;