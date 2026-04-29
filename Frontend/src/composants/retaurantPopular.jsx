function RestaurantPopular({ restaurant, hoverClass }) {
  return (
    <div className={`
      shadow-xl bg-white w-full rounded-[30px] 
      flex flex-col overflow-hidden transition-all duration-500
      ${hoverClass}
    `}>
      
      {/* Container Image : On retire rounded-full pour un look plus moderne sur une carte */}
      <div className="w-full aspect-video bg-gray-200 overflow-hidden">
        <img
          src={restaurant.image || "/default.png"}
          alt={restaurant.name}
          /* L'image remplit tout le haut de la carte */
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Contenu Texte */}
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tight">
            {restaurant.name}
          </h2>
          {/* Petit badge de note par exemple */}
          <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
            ★ 4.8
          </span>
        </div>
        
        <p className="text-gray-500 text-sm font-medium mb-6">Cuisine Gastronomique • 20-30 min</p>

        <button className="mt-auto w-full py-4 border-2 border-orange-600 text-orange-600 font-bold rounded-2xl hover:bg-orange-600 hover:text-white transition-colors duration-300">
          Découvrir la carte
        </button>
      </div>
    </div>
  );
}

export default RestaurantPopular;