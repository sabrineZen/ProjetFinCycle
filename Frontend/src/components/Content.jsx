import React from "react";
import RestaurantProfile from "./RestaurantProfile";
import RestaurantStatus from "./RestaurantStatus";
import RestaurantInfoForm from "./RestaurantInfoForm";
import OptionsPlats from "./OptionsPlats";
import ModalForm from "./ModalForm";
import Compte from "./Compte";

function Content({ currentPage, openModal }) {
  const pages = {
    dashboard: (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Tableau de bord</h2>
      </div>
    ),
    restaurant: (
      <div className="flex flex-col gap-6 p-6">
        <RestaurantProfile />
        <RestaurantStatus />
        <RestaurantInfoForm />
      </div>
    ),
    plats: (
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold total"></p>
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            onClick={openModal}
          >
            + Ajouter un plat
          </button>
        </div>

        <OptionsPlats />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 plats-container">
          <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg h-32 card-add">
            <button
              className="text-3xl font-bold text-gray-400 hover:text-orange-500 transition add"
              onClick={openModal}
            >
              +
            </button>
          </div>
        </div>
      </div>
    ),
    commandes: (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Commandes</h2>
      </div>
    ),
    compte: <Compte />,
    deconnection: (
      <div className="p-6">
        <h2 className="text-2xl font-semibold">Déconnexion</h2>
      </div>
    ),
  };

  return pages[currentPage] || null;
}

export default Content;