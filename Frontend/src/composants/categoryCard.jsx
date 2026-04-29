function CategoryCard({ couleur, category, hoverClass, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`
        shadow-xl p-6 w-full rounded-[40px] 
        flex justify-center items-center flex-col 
        transition-all duration-500 cursor-pointer 
        aspect-square md:aspect-auto md:h-[400px]
        ${hoverClass}
      `}
     // Remplace ta ligne background par celle-ci :
style={{ 
  // On utilise la couleur reçue en paramètre
  // On ajoute un dégradé vers le noir pour que ça soit plus "Luxe" que sur ta capture
  background: `linear-gradient(145deg, ${couleur}, #000000)`,
  borderRadius: "40px",
  border: "none"
}}
    >
      {/* Cercle pour l'image : Adaptatif avec aspect-ratio */}
      <div className="w-1/2 aspect-square rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden border-4 border-white/30 shadow-inner">
        <img
          src={category.image || "/default.png"}
          alt={category.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-8 text-white text-center uppercase tracking-tighter">
        {category.name}
      </h2>
      
      {/* Petit indicateur visuel optionnel */}
      <div className="mt-4 px-4 py-1 bg-white/20 rounded-full text-[10px] text-white font-bold uppercase tracking-widest backdrop-blur-sm">
        Explorer
      </div>
    </div>
  );
}

export default CategoryCard;