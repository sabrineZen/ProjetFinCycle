import React, { useState } from "react";
import './style.css';

function OptionsPlats() {
  // Les différentes options
  const options = ["Tous", "Burger", "Pizza", "Salade", "Desserts", "Boissons"];

  // State pour garder l'option active
  const [activeOption, setActiveOption] = useState("Tous");

  return (
    <div className="ligne2">
      <ul>
        {options.map(option => (
          <li
            key={option}
            className={`options ${activeOption === option ? "active" : ""}`}
            onClick={() => setActiveOption(option)} // Met à jour l'option active
          >
            {option}
          </li>
        ))}
      </ul>
      <input type="search" className="search" placeholder="Rechercher un plat" />
    </div>
  );
}

export default OptionsPlats;