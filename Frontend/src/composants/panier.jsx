import { useState } from "react";
import { FaHistory, FaShoppingCart, FaTrash, FaTimes, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import AnnulerButton from "./buttonAnnuler";
import ValiderButton from "./buttonValider";
import HistoriqueAchats from "./historique";

function Panier({ produits, setPanier, onClose }) {
  const [vueActuelle, setVueActuelle] = useState("panier");

  // --- LOGIQUE DE REGROUPEMENT ---
  const produitsRegroupes = produits.reduce((acc, produit) => {
    const existant = acc.find((item) => item.id === produit.id);
    if (existant) {
      existant.quantite += 1;
    } else {
      acc.push({ ...produit, quantite: 1 });
    }
    return acc;
  }, []);

  // --- CALCULS DES PRIX ---
  const sousTotal = produits.reduce((total, p) => total + p.prix, 0);
  const fraisLivraison = sousTotal > 1000 || produits.length === 0 ? 0 : 150; // Petit ajustement ici
  const prixTotal = sousTotal + fraisLivraison;

  // --- ACTIONS ---
  const ajouterUn = (produitCible) => {
    // On ajoute simplement une copie du produit au tableau global
    setPanier([...produits, { ...produitCible }]);
  };

  const enleverUn = (id) => {
    const index = produits.findLastIndex((p) => p.id === id);
    if (index !== -1) {
      const nouveauPanier = [...produits];
      nouveauPanier.splice(index, 1);
      setPanier(nouveauPanier);
    }
  };

  return (
    /* L'OVERLAY (FOND SOMBRE) */
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center md:items-start md:justify-end p-4 bg-black/40 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      
      {/* LE PANIER FLOTTANT */}
      <div 
        className="bg-white w-full max-w-[420px] flex flex-col shadow-2xl rounded-[32px] overflow-hidden md:mt-24 md:mr-10"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* HEADER FIXE */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2.5 rounded-xl text-white shadow-lg shadow-orange-200">
              {vueActuelle === "panier" ? <FaShoppingCart size={18} /> : <FaHistory size={18} />}
            </div>
            <h2 className="text-lg font-black text-secondary uppercase">
              {vueActuelle === "panier" ? `Mon Panier` : "Historique"}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {vueActuelle === "panier" ? (
              <button 
                className="p-2 text-gray-400 hover:text-orange-500 transition-colors" 
                onClick={() => setVueActuelle("historique")}
                title="Historique"
              >
                <FaHistory size={20} />
              </button>
            ) : (
              <button 
                className="flex items-center gap-1 p-2 text-orange-500 font-bold text-xs" 
                onClick={() => setVueActuelle("panier")}
              >
                <FaArrowLeft size={14} /> <span>RETOUR</span>
              </button>
            )}
            <button 
              onClick={onClose} 
              className="p-2 bg-gray-100 text-gray-400 rounded-full hover:bg-red-500 hover:text-white transition-all"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* ZONE DE CONTENU SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[60vh]">
          {vueActuelle === "panier" ? (
            <>
              {produitsRegroupes.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="text-gray-300 mb-4 flex justify-center"><FaShoppingCart size={48} /></div>
                  <p className="text-gray-400 font-medium">Votre panier est encore vide...</p>
                </div>
              ) : (
                produitsRegroupes.map((produit) => (
                  <div key={produit.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl mb-3 border border-gray-100 transition-hover hover:border-orange-100">
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary text-sm">{produit.name}</span>
                      <span className="text-orange-600 font-black text-xs">{produit.prix} DA</span>
                    </div>

                    <div className="flex items-center gap-3 bg-white rounded-xl px-2 py-1 shadow-sm border border-gray-100">
                      <button 
                        onClick={() => enleverUn(produit.id)} 
                        className={`p-1.5 transition-colors ${produit.quantite > 1 ? 'text-gray-400 hover:text-secondary' : 'text-red-300 hover:text-red-600'}`}
                      >
                        {produit.quantite > 1 ? <FaMinus size={10} /> : <FaTrash size={10} />}
                      </button>
                      
                      <span className="text-sm font-black text-secondary min-w-[12px] text-center">
                        {produit.quantite}
                      </span>
                      
                      <button 
                        onClick={() => ajouterUn(produit)} 
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

        {/* FOOTER FIXE */}
        {vueActuelle === "panier" && produits.length > 0 && (
          <div className="p-6 bg-gray-50/50 border-t border-gray-100">
            <div className="space-y-2 mb-4">
               <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                  <span>Sous-total</span>
                  <span>{sousTotal} DA</span>
               </div>
               <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                  <span>Livraison</span>
                  <span className={fraisLivraison === 0 ? "text-green-500" : ""}>
                    {fraisLivraison === 0 ? "OFFERTE" : `${fraisLivraison} DA`}
                  </span>
               </div>
               <div className="flex justify-between items-center pt-2">
                  <span className="text-sm font-black text-secondary uppercase">Total</span>
                  <span className="text-2xl font-black text-orange-600 tracking-tighter">{prixTotal} DA</span>
               </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <AnnulerButton onClick={() => setPanier([])} />
              <ValiderButton onClick={() => alert("Commande en cours de traitement...")} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Panier;