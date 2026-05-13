import { useState } from "react";
import { FaHistory, FaShoppingCart, FaTrash, FaTimes, FaArrowLeft, FaPlus, FaMinus } from "react-icons/fa";
import AnnulerButton from "./buttonAnnuler";
import HistoriqueAchats from "./historique";

function Panier({ produits, setPanier, onClose }) {
  const [vueActuelle, setVueActuelle] = useState("panier");
  const [adresse, setAdresse] = useState("");
  const [commandeEnCours, setCommandeEnCours] = useState(false);

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
  const sousTotal = produits.reduce((total, p) => total + parseFloat(p.prix || 0), 0);
  const fraisLivraison = sousTotal > 1000 || produits.length === 0 ? 0 : 150;
  const prixTotal = sousTotal + fraisLivraison;

  // --- ACTIONS ---
  const ajouterUn = (produitCible) => {
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

  // --- COMMANDE ---
  const handleCommande = async () => {
    if (!adresse.trim()) {
      alert("Veuillez entrer une adresse de livraison !");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vous devez être connecté !");
      return;
    }

    const produitsGroupes = produits.reduce((acc, p) => {
      const ex = acc.find(x => x.id === p.id);
      if (ex) ex.quantite += 1;
      else acc.push({ ...p, quantite: 1 });
      return acc;
    }, []);

    setCommandeEnCours(true);
    try {
      const res = await fetch("/api/commandes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          adresseLivraison: adresse,
          produits: produitsGroupes
        })
      });

      if (res.ok) {
        alert("Commande passée avec succès !");
        setPanier([]);
        onClose();
      } else {
        const data = await res.json();
        alert("Erreur : " + data.message);
      }
    } catch (e) {
      console.error("Erreur commande:", e);
      alert("Erreur lors de la commande");
    } finally {
      setCommandeEnCours(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center md:items-start md:justify-end p-4 bg-black/40 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[420px] flex flex-col shadow-2xl rounded-[32px] overflow-hidden md:mt-24 md:mr-10 animate-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >

        {/* HEADER */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2.5 rounded-xl text-white shadow-lg shadow-orange-200">
              {vueActuelle === "panier" ? <FaShoppingCart size={18} /> : <FaHistory size={18} />}
            </div>
            <h2 className="text-lg font-black text-secondary uppercase tracking-tight">
              {vueActuelle === "panier" ? "Mon Panier" : "Historique"}
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

        {/* ZONE SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[60vh] min-h-[150px]">
          {vueActuelle === "panier" ? (
            <>
              {produitsRegroupes.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="text-gray-300 mb-4 flex justify-center"><FaShoppingCart size={48} /></div>
                  <p className="text-gray-400 font-medium italic text-sm">Votre panier est encore vide...</p>
                </div>
              ) : (
                produitsRegroupes.map((produit) => (
                  <div
                    key={produit.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl mb-3 border border-gray-100 hover:border-orange-100 transition"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-secondary text-sm">{produit.nom}</span>
                      <span className="text-orange-600 font-black text-xs">
                        {(parseFloat(produit.prix) * produit.quantite).toFixed(2)} DA
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => enleverUn(produit.id)}
                        className="w-8 h-8 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-500 transition-all"
                      >
                        {produit.quantite > 1 ? <FaMinus size={10} /> : <FaTrash size={10} />}
                      </button>

                      <span className="text-sm font-black text-secondary min-w-[12px] text-center">
                        {produit.quantite}
                      </span>

                      <button
                        onClick={() => ajouterUn(produit)}
                        className="w-8 h-8 rounded-full bg-[#FE7D32] flex items-center justify-center text-white hover:scale-110 transition-all shadow-md shadow-orange-100"
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
        {vueActuelle === "panier" && produits.length > 0 && (
          <div className="p-6 bg-gray-50/50 border-t border-gray-100">

            {/* Adresse livraison */}
            <input
              type="text"
              placeholder="Adresse de livraison..."
              value={adresse}
              onChange={e => setAdresse(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm mb-4 outline-none focus:border-orange-400"
            />

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span>Sous-total</span>
                <span>{sousTotal.toFixed(2)} DA</span>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span>Livraison</span>
                <span className={fraisLivraison === 0 ? "text-green-500" : ""}>
                  {fraisLivraison === 0 ? "OFFERTE" : `${fraisLivraison} DA`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-black text-secondary uppercase">Total à payer</span>
                <span className="text-2xl font-black text-orange-600 tracking-tighter">
                  {prixTotal.toFixed(2)} DA
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 h-12">
              <AnnulerButton onClick={() => setPanier([])} />
              <button
                onClick={handleCommande}
                disabled={commandeEnCours}
                className="bg-[#FF7D32] text-white rounded-xl text-sm font-bold hover:bg-orange-500 transition disabled:opacity-60"
              >
                {commandeEnCours ? "..." : "Commander"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Panier;