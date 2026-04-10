import { useState } from "react";
import { FaHistory } from "react-icons/fa";
import AnnulerButton from "./buttonAnnuler";
import ValiderButton from "./buttonValider";
import HistoriqueAchats from "./historique";
import { FaShoppingCart } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function Panier({ produits }) {
  const [montrerHistorique, setMontrerHistorique] = useState(false);

  const sousTotal = produits.reduce((total, produit) => total + produit.prix, 0);
  const livraison = sousTotal > 100 ? 0 : 10;
  const prixTotal = sousTotal + livraison;

  return (
    <div className="bg-white shadow-lg p-4 rounded-[20px] w-[95vw] max-w-[800px] h-auto">
      
      {/* Header */}
      <div className="min-h-[80px] px-2 sm:px-6 flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-row gap-3 items-center">
          <FaShoppingCart className="text-xl sm:text-2xl text-secondary mt-1" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary underline decoration-[#FF6900] underline-offset-4">
            Mon panier
          </h2>
        </div>
        <button
          className="p-3 rounded-full hover:bg-orange-100 transition"
          onClick={() => setMontrerHistorique(!montrerHistorique)}
        >
          <FaHistory className="text-xl sm:text-2xl text-secondary" />
        </button>
      </div>

      {/* Liste des produits */}
      <div className="overflow-y-auto mt-4 pt-2 max-h-[35vh] scrollbar-hide">
        {produits.map((produit) => (
          <div
            key={produit.id}
            className="w-full flex justify-between p-3 sm:p-4 bg-white rounded-lg mb-4 text-base sm:text-xl font-semibold text-secondary"
            style={{ boxShadow: "0 0 7px 2px rgba(0,0,0,0.1)" }}
          >
            <span className="flex flex-col">
              <span>{produit.name}</span>
              <span className="text-button">{produit.prix}DA</span>
            </span>
            <div className="bg-[#FEF2F2] h-[40px] w-[40px] rounded-[10px] flex items-center justify-center flex-shrink-0 self-center">
              <FaTrash className="text-[#FB2C36] text-xl cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      {/* Ligne séparatrice */}
      <div className="h-0.5 w-full bg-[#D5D1CE] mt-4"></div>

      {/* Totaux */}
      <div className="flex justify-between mb-2 pt-3">
        <h2 className="text-base sm:text-xl font-light text-secondary">Sous-total</h2>
        <span>{sousTotal}DA</span>
      </div>

      <div className="flex justify-between mb-2 pt-3">
        <h2 className="text-base sm:text-xl font-light text-secondary">Livraison</h2>
        <span className="text-[#8BAF50]">
          {livraison === 0 ? "Gratuite" : livraison + "DA"}
        </span>
      </div>

      <div className="h-0.5 w-full bg-[#D5D1CE] my-4"></div>

      <div className="flex justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-secondary">Total</h2>
        <span className="text-[#FF6900] font-bold text-xl sm:text-2xl">{prixTotal}DA</span>
      </div>

      {/* Boutons */}
      <div className="flex flex-row gap-4 sm:gap-8 pt-2 flex-wrap">
        <AnnulerButton />
        <ValiderButton />
      </div>

      {/* Historique */}
      {montrerHistorique && (
        <div className="fixed top-20 right-2 sm:right-10 z-50">
          <HistoriqueAchats onClose={() => setMontrerHistorique(false)} />
        </div>
      )}
    </div>
  );
}
export default Panier;