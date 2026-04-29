import React, { useState } from "react";
import { FaBox } from "react-icons/fa";

function HistoriqueAchats() {
  const [achats] = useState([
    { id: 1, prix: 150, date: "23 avr. 2026", time: "21:30" },
    { id: 2, prix: 80, date: "23 avr. 2026", time: "21:35" },
    { id: 3, prix: 200, date: "22 avr. 2026", time: "12:00" },
  ]);

  return (
    <div className="w-full space-y-4">
      {achats.map((achat, index) => (
        <div key={achat.id} className="bg-gray-50 rounded-3xl p-4 border border-gray-100 shadow-sm">
          {/* Header de l'achat */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFF3E5] rounded-xl flex items-center justify-center">
                <FaBox className="text-[#FF6900]" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-800 text-sm">Achat #{index + 1}</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase">{achat.date}</span>
              </div>
            </div>
            <span className="text-[10px] font-black text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase">Livré</span>
          </div>

          {/* Liste des produits (Exemple statique) */}
          <div className="space-y-2">
            <div className="bg-white p-3 rounded-xl flex justify-between items-center border border-gray-50">
              <span className="text-sm font-bold text-gray-700 italic">Produit commandé</span>
              <span className="text-sm font-black text-orange-600">{achat.prix} DA</span>
            </div>
          </div>

          {/* Total de la commande */}
          <div className="mt-3 text-right pt-2 border-t border-dashed border-gray-200">
            <p className="text-xs font-bold text-gray-400 italic">Total payé: <span className="text-red-900 font-black text-sm">{achat.prix} DA</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoriqueAchats;