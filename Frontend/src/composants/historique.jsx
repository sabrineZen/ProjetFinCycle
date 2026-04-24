import { useState } from "react";
import { FaShoppingCart, FaClock, FaBox } from "react-icons/fa";

function HistoriqueAchats({ onClose }) {
  const [achats] = useState([
    { id: 1, prix: 150 },
    { id: 2, prix: 80 },
    { id: 3, prix: 200 },
    { id: 4, prix: 120 },
    { id: 5, prix: 60 },
    { id: 6, prix: 90 },
  ]);

  const now = new Date();
  const dateStr = now.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    //  Pas de div bg-white ici, on utilise celle du Panier
    <>
      {/* Header */}
      <div className="h-auto min-h-[80px] pl-2 sm:pl-4 pr-2 sm:pr-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex flex-row gap-3 items-center">
          <FaClock className="text-xl sm:text-2xl text-secondary mt-1" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-secondary underline decoration-[#FF6900] underline-offset-4">
            Historique des achats
          </h2>
        </div>
        <button
          className="p-3 rounded-full hover:bg-orange-100 transition"
          onClick={onClose}
        >
          <FaShoppingCart className="text-xl sm:text-2xl text-secondary" />
        </button>
      </div>

      {/* Liste des achats */}
      <div className="w-full mt-6 border-2 border-bordure rounded-[10px] p-2 flex flex-col gap-4 overflow-y-auto scrollbar-hide max-h-[60vh]">
        {achats.map((achat, index) => (
          <div key={achat.id} className="bg-[#F9FAFB] rounded-[10px] p-3 shadow-sm">
            <div className="w-full flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-[45px] h-[45px] bg-[#FFF3E5] rounded-[10px] flex items-center justify-center font-bold flex-shrink-0">
                  <FaBox className="text-[#FF6900] text-xl" />
                </div>
                <div className="flex flex-col text-base sm:text-lg font-semibold">
                  <span className="text-[#951418]">Achat #{index + 1}</span>
                  <span className="text-[13px] font-normal text-[#AFB0B3]">
                    Date: {dateStr} {timeStr}
                  </span>
                </div>
              </div>
              <span className="text-[13px] text-[#55A661] bg-[#F0FDF4] px-3 py-1 rounded-full">
                Livré
              </span>
            </div>
            <div className="mt-2 text-right font-semibold text-[#951418]">
              Total payé: {achat.prix} DA
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default HistoriqueAchats;