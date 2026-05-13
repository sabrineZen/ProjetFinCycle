import React, { useState, useEffect } from "react";
import { FaBox } from "react-icons/fa";

function HistoriqueAchats() {
  const [commandes, setCommandes] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setChargement(false); return; }

        const res = await fetch("/api/commandes/client", {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setCommandes(data);
        }
      } catch (e) {
        console.error("Erreur historique:", e);
      } finally {
        setChargement(false);
      }
    };

    fetchHistorique();
  }, []);

  const getLabelStatut = (statut) => {
    switch (statut) {
      case 'en_attente':     return { label: 'En attente',      color: 'text-orange-600 bg-orange-50'  };
      case 'confirmee':      return { label: 'Confirmée',       color: 'text-blue-600 bg-blue-50'      };
      case 'en_preparation': return { label: 'En préparation',  color: 'text-purple-600 bg-purple-50'  };
      case 'livree':         return { label: 'Livrée',          color: 'text-green-600 bg-green-50'    };
      case 'annulee':        return { label: 'Annulée',         color: 'text-red-600 bg-red-50'        };
      default:               return { label: statut,            color: 'text-gray-600 bg-gray-50'      };
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

  if (chargement) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-2">
      {commandes.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-400 italic text-sm">Aucun achat récent</p>
        </div>
      ) : (
        commandes.map((commande) => {
          const statut     = getLabelStatut(commande.statut);
          const nbArticles = commande.LigneCommandes?.reduce((sum, l) => sum + l.quantite, 0) || 0;

          return (
            <div
              key={commande.id}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <FaBox className="text-orange-500" size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-800 uppercase tracking-tight">
                      Commande #{commande.id}
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      {formatDate(commande.dateCommande)} • {nbArticles} article{nbArticles > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${statut.color}`}>
                    {statut.label}
                  </span>
                  <span className="text-sm font-black text-[#8B2A1B]">
                    {parseFloat(commande.total).toLocaleString()} DA
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default HistoriqueAchats;