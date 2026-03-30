import React, { useState } from "react";

export default function RestaurantStatus() {
  const [active, setActive] = useState(true);

  const toggleStatus = () => setActive(!active);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto space-y-4">
      {/* Stat box */}
      <div className="flex items-center gap-3">
        <span
          className={`w-4 h-4 rounded-full ${
            active ? "bg-green-500" : "bg-red-500"
          } transition-colors`}
        ></span>
        <span className="text-gray-700 font-medium">
          {active ? "Restaurant actif" : "Restaurant désactivé"}
        </span>
      </div>

      {/* Bouton pour changer le statut */}
      <button
        onClick={toggleStatus}
        className={`px-4 py-2 rounded-md font-semibold transition-colors ${
          active
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {active ? "Désactiver le restaurant" : "Activer le restaurant"}
      </button>
    </div>
  );
}