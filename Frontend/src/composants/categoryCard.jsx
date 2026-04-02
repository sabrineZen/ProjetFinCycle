function CategoryCard({ couleur,category,hoverClass }) {
  return (
    <div className={`shadow-lg p-4 w-[400px] h-[400px] rounded-[30px] flex justify-center items-center flex-shrink-0 flex-col ${hoverClass}`}  style={{ background: couleur }}>
        <div className="w-40 h-40 rounded-[100%] bg-white"></div>
      <h2 className="text-3xl font-semibold mb-2 pt-20 text-secondary">{category.name}</h2>
    </div>
  );
}
export default CategoryCard;