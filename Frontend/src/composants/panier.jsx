import { useState } from "react";
import { FaHistory, FaShoppingCart, FaTrash, FaTimes, FaArrowLeft } from "react-icons/fa";
import AnnulerButton from "./buttonAnnuler";
import ValiderButton from "./buttonValider";
import HistoriqueAchats from "./historique";

function Panier({ produits, setPanier, onClose }) {
  // État pour savoir si on affiche le panier ou l'historique
  const [vueActuelle, setVueActuelle] = useState("panier");

  const sousTotal = produits.reduce((total, produit) => total + produit.prix, 0);
  const livraison = sousTotal > 100 || produits.length === 0 ? 0 : 10;
  const prixTotal = sousTotal + livraison;

  return (
    <div className="bg-white p-5 md:p-6 w-full flex flex-col shadow-2xl border border-gray-100 rounded-[32px]">
      
      {/* HEADER DYNAMIQUE AVEC BOUTON X INTÉGRÉ */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-xl shadow-sm text-white">
            {vueActuelle === "panier" ? <FaShoppingCart size={18} /> : <FaHistory size={18} />}
          </div>
          <h2 className="text-lg font-black text-gray-800 uppercase tracking-tight">
            {vueActuelle === "panier" ? "Mon Panier" : "Historique"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Bouton pour basculer vers l'Historique (uniquement visible dans le panier) */}
          {vueActuelle === "panier" ? (
            <button
              className="p-2 rounded-full hover:bg-orange-50 text-gray-400 hover:text-orange-600 transition-all active:scale-90"
              onClick={() => setVueActuelle("historique")}
            >
              <FaHistory size={20} />
            </button>
          ) : (
            <button
              className="flex items-center gap-1 p-2 rounded-full hover:bg-gray-100 text-gray-500 font-bold text-xs transition-all"
              onClick={() => setVueActuelle("panier")}
            >
              <FaArrowLeft size={14} />
              <span className="hidden sm:inline">RETOUR</span>
            </button>
          )}

          {/* BOUTON X DE SORTIE (Toujours là et bien aligné) */}
          <button
            onClick={onClose}
            className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
          >
            <FaTimes size={18} />
          </button>
        </div>
      </div>

      {/* CONTENU VARIABLE (SCROLLABLE) */}
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide max-h-[350px] min-h-[200px]">
        {vueActuelle === "panier" ? (
          /* --- VUE : PANIER --- */
          <>
            {produits.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-gray-400 italic text-sm">Votre panier est vide</p>
              </div>
            ) : (
              produits.map((produit) => (
                <div
                  key={produit.instanceId}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl mb-3 border border-gray-100 transition-all group"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800 text-sm group-hover:text-orange-700 transition-colors">
                      {produit.name}
                    </span>
                    <span className="text-orange-600 font-black text-xs">
                      {produit.prix} DA
                    </span>
                  </div>
                  <button 
                    onClick={() => setPanier(produits.filter(p => p.instanceId !== produit.instanceId))}
                    className="bg-white p-2.5 rounded-xl shadow-sm text-red-400 hover:text-red-600 hover:bg-red-50 transition-all active:scale-90"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))
            )}
          </>
        ) : (
          /* --- VUE : HISTORIQUE --- */
          <HistoriqueAchats />
        )}
      </div>

      {/* FOOTER (Uniquement visible si on est dans le panier) */}
      {vueActuelle === "panier" && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-gray-500 text-xs font-bold uppercase tracking-widest">
              <span>Sous-total</span>
              <span>{sousTotal} DA</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-sm font-black text-gray-400 uppercase">Total</span>
              <span className="text-2xl font-black text-orange-600 tracking-tighter">
                {prixTotal} DA
              </span>
            </div>
          </div>

          {/* Boutons d'action en grille 50/50 */}
          <div className="grid grid-cols-2 gap-3 h-12">
            <div className="w-full h-full flex"><AnnulerButton /></div>
            <div className="w-full h-full flex"><ValiderButton /></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Panier;