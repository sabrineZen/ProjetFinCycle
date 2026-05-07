import { useState } from "react";
import { FaHistory, FaShoppingCart, FaTrash } from "react-icons/fa";
import AnnulerButton from "./buttonAnnuler";
import ValiderButton from "./buttonValider";
import HistoriqueAchats from "./historique";

function Panier() {
  const [montrerHistorique, setMontrerHistorique] = useState(false);

  const [produits, setProduits] = useState([
    { id: 1, name: "Pizza", prix: 150, quantite: 1 },
    { id: 2, name: "Burger", prix: 80, quantite: 1 },
    { id: 3, name: "Pâtes", prix: 200, quantite: 1 },
    { id: 4, name: "Salade", prix: 120, quantite: 1 },
  ]);

  const sousTotal = produits.reduce((total, p) => total + p.prix * p.quantite, 0);
  const livraison = sousTotal > 100 ? 0 : 10;
  const prixTotal = sousTotal + livraison;

  const augmenterQuantite = (id) =>
    setProduits((prev) => prev.map((p) => p.id === id ? { ...p, quantite: p.quantite + 1 } : p));

  const diminuerQuantite = (id) =>
    setProduits((prev) => prev.map((p) => p.id === id && p.quantite > 1 ? { ...p, quantite: p.quantite - 1 } : p));

  const supprimerProduit = (id) =>
    setProduits((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="bg-white shadow-lg p-4 rounded-[20px] w-[95vw] max-w-200 h-auto">

      {montrerHistorique ? (
        //  Historique s'affiche  dans la même div blanche
        <HistoriqueAchats onClose={() => setMontrerHistorique(false)} />
      ) : (
        //  Panier normal
        <>
          {/* Header */}
          <div className="min-h-20 px-2 sm:px-6 flex items-center justify-between flex-wrap gap-2">
            <div className="flex gap-3 items-center">
              <FaShoppingCart className="text-xl sm:text-2xl text-secondary" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary underline decoration-valider underline-offset-4">
                Mon panier
              </h2>
            </div>
            <button
              className="p-3 rounded-full hover:bg-orange-100 transition"
              onClick={() => setMontrerHistorique(true)}
            >
              <FaHistory className="text-xl sm:text-2xl text-secondary" />
            </button>
          </div>

          {/* Produits */}
          <div className="overflow-y-auto mt-4 pt-2 max-h-[35vh] scrollbar-hide">
            {produits.map((produit) => (
              <div
                key={produit.id}
                className="w-full flex justify-between p-3 sm:p-4 bg-white rounded-lg mb-4 text-base sm:text-xl font-semibold text-secondary"
                style={{ boxShadow: "0 0 7px 2px rgba(0,0,0,0.1)" }}
              >
                <span className="flex flex-col">
                  <span>{produit.name}</span>
                  <span className="text-button">{produit.prix} DA / unité</span>
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button className="px-2 py-1 bg-gray-100" onClick={() => diminuerQuantite(produit.id)}>-</button>
                    <span className="px-3">{produit.quantite}</span>
                    <button className="px-2 py-1 bg-gray-100" onClick={() => augmenterQuantite(produit.id)}>+</button>
                  </div>
                  <span className="text-valider font-bold">{produit.prix * produit.quantite} DA</span>
                  <div
                    className="bg-[#FEF2F2] h-10 w-10 rounded-[10px] flex items-center justify-center cursor-pointer"
                    onClick={() => supprimerProduit(produit.id)}
                  >
                    <FaTrash className="text-[#FB2C36]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Totaux */}
          <div className="h-0.5 w-full bg-[#D5D1CE] mt-4"></div>
          <div className="flex justify-between pt-3">
            <span className="text-secondary">Sous-total</span>
            <span>{sousTotal} DA</span>
          </div>
          <div className="flex justify-between pt-3">
            <span className="text-secondary">Livraison</span>
            <span className="text-[#8BAF50]">{livraison === 0 ? "Gratuite" : livraison + " DA"}</span>
          </div>
          <div className="h-0.5 w-full bg-[#D5D1CE] my-4"></div>
          <div className="flex justify-between font-bold text-xl">
            <span className="text-secondary">Total</span>
            <span className="text-[#FF6900]">{prixTotal} DA</span>
          </div>

          {/* Boutons */}
          <div className="flex gap-4 pt-4 flex-wrap">
            <AnnulerButton />
            <ValiderButton />
          </div>
        </>
      )}
    </div>
  );
}

export default Panier;