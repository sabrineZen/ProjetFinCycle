function CategoryCard({ couleur, category, hoverClass, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`shadow-lg p-4 w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[400px] md:h-[400px] rounded-[30px] flex justify-center items-center flex-col flex-shrink-0 cursor-pointer ${hoverClass}`}
      style={{ background: couleur }}
    >
      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center overflow-hidden">
        {/*dans le back image: "http://localhost:5000/uploads/pizza.png" */}
        <img
          src={category.image || "/default.png"}
          alt={category.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-6 text-secondary text-center">
        {category.name}
      </h2>
    </div>
  );
}

export default CategoryCard;