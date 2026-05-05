import React, { useState } from "react";
import { FaBox, FaChevronRight } from "react-icons/fa";

function HistoriqueAchats() {
  // Simulation de données plus réalistes
  const [achats] = useState([
    { id: 101, prix: 1550, date: "04 Mai 2026", articles: 3 },
    { id: 102, prix: 850, date: "02 Mai 2026", articles: 1 },
    { id: 103, prix: 2400, date: "28 Avr 2026", articles: 5 },
    { id: 104, prix: 1200, date: "25 Avr 2026", articles: 2 },
  ]);

  return (
    <div className="flex flex-col gap-4 py-2">
      {achats.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-gray-400 italic text-sm">Aucun achat récent</p>
        </div>
      ) : (
        achats.map((achat, index) => (
          <div 
            key={achat.id} 
            className="group bg-gray-50 hover:bg-white hover:shadow-md border border-gray-100 rounded-2xl p-4 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Icône stylisée */}
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:bg-orange-500 transition-colors duration-300">
                  <FaBox className="text-orange-500 group-hover:text-white transition-colors" size={18} />
                </div>

                <div className="flex flex-col">
                  <span className="text-sm font-black text-gray-800 uppercase tracking-tight">
                    Commande #{achat.id}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {achat.date} • {achat.articles} article{achat.articles > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Livré
                </span>
                <span className="text-sm font-black text-[#8B2A1B]">
                  {achat.prix} DA
                </span>
              </div>
            </div>

            {/* Petit indicateur de détail au survol */}
            <div className="mt-3 pt-3 border-t border-dashed border-gray-200 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
               <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Voir les détails</span>
               <FaChevronRight className="text-gray-300" size={10} />
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default HistoriqueAchats;