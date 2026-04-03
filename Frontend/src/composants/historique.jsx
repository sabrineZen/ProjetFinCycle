import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Panier from "./panier";
import { FaClock } from "react-icons/fa";

function HistoriqueAchats() {
  const [montrerPanier, setMontrerPanier] = useState(false);
  const [panier, setPanier] = useState([
    { id: 1, name: "Pizza Margherita", prix: 150 },
    { id: 2, name: "Burger Classique", prix: 80 },
    { id: 3, name: "Burger Classique", prix: 80 },
  ]);

  const [achats, setAchats] = useState([
    { id: 1, total: 150 },
    { id: 2, total: 80 },
    { id: 3, total: 200 },
    { id: 4, total: 120 },
    { id: 5, total: 60 },
    { id: 6, total: 90 },
  ]);

  const now = new Date();
  const dateStr = now.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-white shadow-lg p-4 rounded-[20px] w-[95vw] max-w-[800px] h-auto">
      
      {/* Header */}
      <div className="h-auto min-h-[80px] pl-2 sm:pl-4 pr-2 sm:pr-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-row gap-3 items-center">
          <FaClock className="text-xl sm:text-2xl text-secondary mt-1" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary underline decoration-[#FF6900] underline-offset-4">
            Historique des achats
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="p-3 rounded-full hover:bg-orange-100 transition"
            onClick={() => setMontrerPanier(!montrerPanier)}
          >
            <FaShoppingCart className="text-xl sm:text-2xl text-secondary" />
          </button>
        </div>
      </div>

      {/* Affichage Panier */}
      {montrerPanier && (
        <div className="fixed top-20 right-2 sm:right-10 z-50">
          <Panier produits={panier} />
        </div>
      )}

      {/* Container des achats */}
      <div className="w-full mt-6 border-2 border-bordure rounded-[10px] p-2 flex flex-col gap-4 overflow-y-auto scrollbar-hide max-h-[60vh]">
        {achats.map((achat, index) => (
          <div key={achat.id} className="bg-[#F9FAFB] rounded-[10px] p-3 shadow-sm">
            <div className="w-full flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-[45px] h-[45px] bg-[#FFF3E5] rounded-[10px] flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex flex-col text-base sm:text-lg font-semibold">
                  <span className="text-[#951418]">Achat # {index + 1}</span>
                  <span className="text-[13px] font-normal text-[#AFB0B3]">
                    Date: {dateStr} {timeStr}
                  </span>
                </div>
              </div>
              <span className="text-[13px] text-[#55A661] bg-[#F0FDF4] px-3 py-1 rounded-full">
                Livré
              </span>
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <div className="bg-white h-[60px] rounded-[5px] flex items-center pl-2 shadow-sm">
                <div className="h-[45px] w-[45px] bg-green-500 rounded mr-2 flex-shrink-0"></div>
                Produit 1
              </div>
              <div className="bg-white h-[60px] rounded-[5px] flex items-center pl-2 shadow-sm">
                <div className="h-[45px] w-[45px] bg-green-500 rounded mr-2 flex-shrink-0"></div>
                Produit 2
              </div>
            </div>

            <div className="mt-2 text-right font-semibold text-[#951418]">
              Total payé: {achat.total} DA
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HistoriqueAchats;