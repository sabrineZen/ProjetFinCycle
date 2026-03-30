import React, { useState } from "react";

function OptionsPlats() {
  const options = ["Tous", "Burger", "Pizza", "Salade", "Desserts", "Boissons"];
  const [activeOption, setActiveOption] = useState("Tous");

  return (
    <div className="w-[1180px] relative top-[50px] left-[38px] bg-white flex flex-row gap-5 rounded-[15px] p-4">
      <ul className="flex gap-4">
        {options.map((option) => (
          <li
            key={option}
            onClick={() => setActiveOption(option)}
            className={`cursor-pointer px-3 py-1 rounded-lg ${
              activeOption === option
                ? "bg-orange-200 text-orange-800 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {option}
          </li>
        ))}
      </ul>
      <input
        type="search"
        placeholder="Rechercher un plat"
        className="bg-[#ffe3ce] text-gray-500 w-[140px] h-[41px] rounded-[15px] flex justify-center items-center absolute top-[20px] left-[460px] px-3"
      />
    </div>
  );
}

export default OptionsPlats;