import { useState } from "react";
import { FaHistory, FaShoppingCart, FaTrash, FaTimes, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import AnnulerButton from "./buttonAnnuler";
import ValiderButton from "./buttonValider";
import HistoriqueAchats from "./historique";

function Panier({ produits, setPanier, onClose }) {
  const [vueActuelle, setVueActuelle] = useState("panier");

  // --- LOGIQUE DE REGROUPEMENT ---
  // On transforme la liste plate en une liste d'objets avec une propriété 'quantite'
  const produitsRegroupes = produits.reduce((acc, produit) => {
    const existant = acc.find((item) => item.id === produit.id);
    if (existant) {
      existant.quantite += 1;
    } else {
      acc.push({ ...produit, quantite: 1 });
    }
    return acc;
  }, []);

  const sousTotal = produits.reduce((total, produit) => total + produit.prix, 0);
  const livraison = sousTotal > 100 || produits.length === 0 ? 0 : 10;
  const prixTotal = sousTotal + livraison;

  // Fonctions pour modifier la quantité directement depuis le panier
  const ajouterUn = (id) => {
    const produitOriginal = produits.find(p => p.id === id);
    setPanier([...produits, { ...produitOriginal, instanceId: Date.now() + Math.random() }]);
  };

  const enleverUn = (id) => {
    const index = produits.findLastIndex(p => p.id === id);
    if (index !== -1) {
      const nouveauPanier = [...produits];
      nouveauPanier.splice(index, 1);
      setPanier(nouveauPanier);
    }
  };

  return (
    <div className="bg-white p-5 md:p-6 w-full flex flex-col shadow-2xl border border-gray-100 rounded-[32px]">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-xl shadow-sm text-white">
            {vueActuelle === "panier" ? <FaShoppingCart size={18} /> : <FaHistory size={18} />}
          </div>
          <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">
            {vueActuelle === "panier" ? `Panier (${produits.length})` : "Historique"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {vueActuelle === "panier" ? (
            <button className="p-2 rounded-full hover:bg-orange-50 text-gray-400 hover:text-orange-600 transition-all" onClick={() => setVueActuelle("historique")}>
              <FaHistory size={20} />
            </button>
          ) : (
            <button className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 text-gray-500 font-bold text-xs" onClick={() => setVueActuelle("panier")}>
              <FaArrowLeft size={14} /> <span>RETOUR</span>
            </button>
          )}
          <button onClick={onClose} className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-all">
            <FaTimes size={18} />
          </button>
        </div>
      </div>

      {/* CONTENU AVEC COMPTEUR */}
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide max-h-[350px] min-h-[200px]">
        {vueActuelle === "panier" ? (
          <>
            {produitsRegroupes.length === 0 ? (
              <div className="py-12 text-center text-gray-400 italic text-sm">Votre panier est vide</div>
            ) : (
              produitsRegroupes.map((produit) => (
                <div key={produit.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl mb-3 border border-gray-100 group">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800 text-sm">
                      {produit.name} <span className="text-orange-500 ml-1">x{produit.quantite}</span>
                    </span>
                    <span className="text-orange-600 font-black text-xs">{produit.prix * produit.quantite} DA</span>
                  </div>

                  {/* CONTROLEUR DE QUANTITÉ */}
                  <div className="flex items-center gap-2 bg-white rounded-xl p-1 shadow-sm border border-gray-100">
                    <button 
                      onClick={() => enleverUn(produit.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      {produit.quantite > 1 ? <FaMinus size={10} /> : <FaTrash size={10} />}
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{produit.quantite}</span>
                    <button 
                      onClick={() => ajouterUn(produit.id)}
                      className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          <HistoriqueAchats />
        )}
      </div>

      {/* FOOTER */}
      {vueActuelle === "panier" && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-black text-gray-400 uppercase">Total</span>
            <span className="text-2xl font-black text-orange-600 tracking-tighter">{prixTotal} DA</span>
          </div>
          <div className="grid grid-cols-2 gap-3 h-12">
            <AnnulerButton />
            <ValiderButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default Panier;