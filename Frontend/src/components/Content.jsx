import React from "react"; 
import RestaurantProfile from "./RestaurantProfile";
import RestaurantStatus from "./RestaurantStatus";
import RestaurantInfoForm from "./RestaurantInfoForm";
import OptionsPlats from "./OptionsPlats";
import Compte from "./Compte";

function Content({ currentPage, openModal }) {
  const pages = {
    dashboard: <h2 className="text-lg font-semibold">Tableau de bord</h2>,

    restaurant: (
      <div className="absolute top-2 left-12 space-y-4">
        <RestaurantProfile />
        <RestaurantStatus />
        <RestaurantInfoForm />
      </div>
    ),

    plats: (
      <>
        {/* Ligne1 */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500 relative top-5 left-9"></p>
          <button
            className="bg-[#ff7d31] text-white w-[140px] h-[41px] rounded-[15px] cursor-pointer relative top-7"
            onClick={openModal}
          >
            + Ajouter un plat
          </button>
        </div>

        {/* Options */}
        <OptionsPlats />

        {/* Container des plats */}
        <div className="relative top-20 left-9 flex gap-5 flex-wrap">
          <div className="w-[231px] h-[300px] bg-white rounded-[15px] p-4 shadow-md flex justify-center items-center">
            <button
              className="bg-[#ff7d31] text-white w-[100px] h-[100px] rounded-[10px] text-4xl cursor-pointer"
              onClick={openModal}
            >
              +
            </button>
          </div>
        </div>
      </>
    ),

    commandes: <h2 className="text-lg font-semibold">Commandes</h2>,

    compte: <Compte />,

    deconnection: <h2 className="text-lg font-semibold">Déconnexion</h2>,
  };

  return pages[currentPage];
}

export default Content;