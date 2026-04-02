import { useState } from "react";
import { FaHistory } from "react-icons/fa";
import AnnulerButton from "./buttonAnnuler";
import ValiderButton from "./buttonValider";
import HistoriqueAchats from "./historique";
import { FaShoppingCart} from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import App from "../App";


function Panier({ produits }) {
  const [montrerHistorique, setMontrerHistorique] = useState(false);

  // Calcul du sous-total
  const sousTotal = produits.reduce((total, produit) => total + produit.prix, 0);

  // Livraison : gratuite au-dessus de 100DA
  const livraison = sousTotal > 100 ? 0 : 10;

  // Total final
  const prixTotal = sousTotal + livraison;

  return (
    <div className="bg-white shadow-lg p-4 rounded-[20px] w-[800px] h-[800px]">
      
      {/* Header avec titre et bouton historique */}
      <div className=" h-20 pl-6 flex items-center justify-between pr-4">
        <div className="flex flex-row gap-4">
            <FaShoppingCart className="text-2xl text-secondary mr-2 mt-2" />
            <h2 className="text-3xl font-semibold text-secondary underline decoration-[#FF6900] underline-offset-12">
            Mon panier
            </h2>
        </div>
      
        <button
          className="p-3 rounded-full hover:bg-orange-100 transition "
          onClick={() => setMontrerHistorique(!montrerHistorique)}
        >
          <FaHistory className="text-2xl text-secondary" />
        </button>
      </div>

      {/* Liste des produits */}
      <div className="overflow-y-auto mt-4 pl-0 pt-2 h-[400px] ">
        {produits.map((produit) => (
            <div
            key={produit.id}
            className= " w-[750px] h-25  ml-2 flex  justify-between p-4 bg-white rounded-lg mb-4 flex-row pb-6 text-xl font-semibold text-secondary"
            style={{ boxShadow: "0 0 7px 2px rgba(0,0,0,0.1)" }}
            >
            <span className="flex flex-col">
                <span>{produit.name}</span>
                <span className="text-button">{produit.prix}DA</span>
            </span>
            <div className="bg-[#FEF2F2] h-[40px] w-[40px] rounded-[10px] flex items-center justify-center mt-5">
                <FaTrash className="text-[#FB2C36] text-xl cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      {/* Ligne séparatrice */}
      <div className="h-0.5 w-full bg-[#D5D1CE] mt-4"></div>

      {/* Totaux */}
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-light text-secondary pt-3">Sous-total</h2>
        <span className="pt-4">{sousTotal}DA</span>
      </div>

      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-light text-secondary pt-6">Livraison</h2>
        <span className="pt-8 text-[#8BAF50]">
          {livraison === 0 ? "Gratuite" : livraison + "DA"}
        </span>
      </div>

      <div className="h-0.5 w-full bg-[#D5D1CE] my-4"></div>

      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold text-secondary pt-3">Total</h2>
        <span className="pt-4 text-[#FF6900] font-bold text-2xl">{prixTotal}DA</span>
      </div>

      {/* Boutons */}
      <div className="flex flex-row gap-15 pt-0">
        <AnnulerButton />
        <ValiderButton />
      </div>

      {/* Historique des achats */}
      {montrerHistorique && (
        <div className="fixed top-20 right-150 z-50">
          <HistoriqueAchats />
        </div>
      )}
    </div>
  );
}

export default Panier;