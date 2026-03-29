import React from "react";
import "./style.css";
import RestaurantProfile from "./RestaurantProfile";
import RestaurantStatus from "./RestaurantStatus";
import RestaurantInfoForm from "./RestaurantInfoForm";
import OptionsPlats from "./OptionsPlats";
import ModalForm from "./ModalForm";
import Compte from "./Compte";
function Content({ currentPage ,openModal}) {
  const pages = {
    dashboard: <h2>Tableau de bord</h2>,
    restaurant: (
      <div className="pose">
        <RestaurantProfile />
        <RestaurantStatus />
        <RestaurantInfoForm />
      </div>
    ),
    plats: (
      <>
        <div className="ligne1">
          <p className="total"></p>
          <button className="btn-add" onClick={openModal}>
            + Ajouter un plat
          </button>
        </div>
        <OptionsPlats />
        <div className="plats-container">
          <div className="card-add">
            <button className="add" onClick={openModal}>+</button>
          </div>
        </div>
      </>
    ),
    commandes: <h2>Commandes</h2>,
    compte: <Compte />,
    deconnection: <h2>Déconnexion</h2>,
  };

  return pages[currentPage];
}

export default Content;