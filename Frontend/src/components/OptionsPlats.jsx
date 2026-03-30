import React, { useState } from "react";

function OptionsPlats() {
  const options = ["Tous", "Burger", "Pizza", "Salade", "Desserts", "Boissons"];
  const [activeOption, setActiveOption] = useState("Tous");

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
      {/* Les boutons d'options */}
      <ul className="flex flex-wrap gap-2">
        {options.map(option => (
          <li
            key={option}
            className={`px-4 py-2 rounded-full cursor-pointer transition-colors duration-200
              ${activeOption === option 
                ? "bg-orange-500 text-white" 
                : "bg-gray-200 text-gray-700 hover:bg-orange-200"
              }`}
            onClick={() => setActiveOption(option)}
          >
            {option}
          </li>
        ))}
      </ul>

      {/* Barre de recherche */}
      <input
        type="search"
        placeholder="Rechercher un plat"
        className="border border-gray-300 rounded-md p-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
    </div>
  );
}

export default OptionsPlats;