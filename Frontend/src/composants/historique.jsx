import React, { useState, useEffect } from "react";
import { FaBox, FaChevronRight } from "react-icons/fa";
import api from "../api";

function HistoriqueAchats() {
  const [achats, setAchats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/commandes');
        setAchats(res.data || []);
      } catch (err) {
        console.error('Erreur historique:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <div className="py-8 text-center">Chargement...</div>;

  return (
    <div className="flex flex-col gap-4 py-2">
      {achats.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-400 italic text-sm">Aucun achat récent</p>
        </div>
      ) : (
        achats.map((achat) => (
          <div 
            key={achat.id} 
            className="group bg-gray-50 hover:bg-white hover:shadow-md border border-gray-100 rounded-2xl p-4 transition-all duration-300 cursor-pointer"
            role="button"
            aria-label={`Détails de la commande ${achat.id}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-orange-500 transition-colors duration-300">
                  <FaBox className="text-orange-500 group-hover:text-white transition-colors" size={18} />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-black text-gray-800 uppercase tracking-tight">
                    Commande #{achat.id}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {new Date(achat.dateCommande).toLocaleDateString('fr-FR')} • {achat.LigneCommandes?.reduce((s,l)=>s+ (l.quantite||0),0) || 0} article(s)
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {achat.statut}
                </span>
                <span className="text-sm font-black text-[#8B2A1B]">
                  {(achat.total || 0).toLocaleString()} DA
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Voir les détails</span>
                <FaChevronRight className="text-gray-300 group-hover:text-orange-500 transition-colors" size={10} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoriqueAchats;