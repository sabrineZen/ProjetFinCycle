import React, { useState } from "react";

export default function RestaurantStatus() {
  const [active, setActive] = useState(true);

  const toggleStatus = () => setActive(!active);

  return (
    <div className="relative -top-30 left-6 space-y-4">
      {/* Stat box */}
      <div className="flex items-center justify-center gap-7 w-[242px] h-[39px] rounded-[25px] text-[#2e7d32] bg-[#d4f5df] mb-4">
        <span
          className="w-[10px] h-[10px] rounded-full shadow-[0_0_8px] inline-block"
          style={{ backgroundColor: active ? "#ff0000" : "red", boxShadow: active ? "0 0 8px #ff0000" : "0 0 8px red" }}
        />
        <span className="text-sm">
          {active ? "Restaurant actif" : "Restaurant désactivé"}
        </span>
      </div>

      {/* Bouton */}
      <button
        onClick={toggleStatus}
        className="flex items-center justify-center w-[242px] h-[39px] bg-[#ff7d31] rounded-[10px] text-white"
      >
        {active ? "Désactiver le restaurant" : "Activer le restaurant"}
      </button>
    </div>
  );
}