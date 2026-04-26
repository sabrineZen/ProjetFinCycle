import { useNavigate } from "react-router-dom";
import CategoryCard from "../../composants/categoryCard";
import { categories as categoriesData } from "../../data/categories";

function AllCategories() {
  const navigate = useNavigate();
  const categories = categoriesData;

  return (
    <div className="px-4 py-8">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <div className="mb-8 text-center justify-start flex items-start flex-col">
        <h1 className="text-4xl font-bold mb-4 text-secondary">Toutes les catégories</h1>
        <p className="text-lg text-gray-600 text-secondary">Voici toutes les catégories disponibles.</p>
            </div>
        <div className="mt-4 sm:mt-0">
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
            onClick={() => navigate(-1)}
          >
            Retour
          </button>
        </div>
        </div>
    {/* Grille des catégories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {categories.map((cat) => (
          <CategoryCard 
            key={cat.id}
            category={cat}
            couleur={cat.couleur}
            hoverClass="hover:scale-105 transition-transform duration-300"
            onClick={() => navigate("/categoriesPage", { state: cat })}
          />
        ))}
      </div>
    </div>
  );
}

export default AllCategories;