import React, { useState } from "react";
import "./style.css";

export default function RestaurantStatus() {
  const [active, setActive] = useState(true);

  const toggleStatus = () => setActive(!active);

  return (
    <div className="restaurant-status">
      {/* Stat box */}
      <div className="stat-box" id="statBox">
        <span
          className="led"
          style={{ backgroundColor: active ? "#ff0000" : "red" }}
        />
        <span className="text">
          {active ? "Restaurant actif" : "Restaurant désactivé"}
        </span>
      </div>

      {/* Bouton séparé */}
      <button className="switch" onClick={toggleStatus}>
        {active ? "Désactiver le restaurant" : "Activer le restaurant"}
      </button>
    </div>
  );
}