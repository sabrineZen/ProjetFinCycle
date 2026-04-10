function CategoryCard({ couleur, category, hoverClass,onClick }) {
  {/* j'ai ajouter onclick pour quand il clique sur une categrie dans home il passe vers categorie page  */}
  return (
    <div onClick={onClick} className={`shadow-lg p-4 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] rounded-[30px] flex justify-center items-center flex-shrink-0 flex-col ${hoverClass}`} style={{ background: couleur }}>
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-white"></div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 pt-8 sm:pt-12 md:pt-20 text-secondary">{category.name}</h2>
    </div>
  );
}
export default CategoryCard;