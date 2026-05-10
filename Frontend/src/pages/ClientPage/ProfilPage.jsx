import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiUser, FiShoppingBag, FiMapPin, FiSettings, FiLogOut, FiMail, FiPhone, FiEdit2, FiChevronRight } from "react-icons/fi";
import { LuWallet } from "react-icons/lu"; 
import { BiBasket } from "react-icons/bi"; 

// Tes imports réels
import InfoPersonnelles from "../../composants/infospersonnelles";
import MesCommandes from "../../composants/mescommandes";
import Parametre from "../../composants/paremtre";

function ProfilPage() {
  // L'état qui gère quelle page est affichée à droite
  const [pageActive, setPageActive] = useState("informations");

  const menuItems = [
    { id: "informations", label: "Informations", icon: FiUser },
    { id: "commandes", label: "mes commandes", icon: FiShoppingBag },
   
    { id: "parametres", label: "Paramètres", icon: FiSettings },
  ];

  // Fonction pour afficher le bon composant à droite
  const renderContent = () => {
    switch (pageActive) {
      case "informations":
        return <InfoPersonnelles />;
      case "commandes":
        return <MesCommandes />;
      case "parametres":
        return <Parametre />;
      case "adresses":
        return <div className="p-4 text-gray-500 italic">Section Adresses en cours de développement...</div>;
      default:
        return <InfoPersonnelles />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF1EB] p-4 md:p-10 font-sans text-[#6D2829]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* ── HEADER PROFIL ── */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm border border-white"
        >
          <div className="flex items-center gap-5">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
              className="w-20 h-20 rounded-full object-cover border-2 border-[#FDF1EB]"
              alt="Avatar"
            />
            <h1 className="text-2xl font-bold">Sophie Martin</h1>
          </div>
          <button className="bg-[#FF7A30] hover:bg-[#e66a25] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-lg shadow-[#FF7A30]/20">
            modifier profil
          </button>
        </motion.div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard label="Depense" value="654DA" icon={LuWallet} iconBg="#FDF1EB" iconColor="#9C6D57" />
          <StatCard label="Panier" value="48" icon={BiBasket} iconBg="#E6FAF5" iconColor="#3CDFB0" />
        </div>

        {/* ── NAVIGATION ET CONTENU ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* MENU GAUCHE */}
          <div className="w-full lg:w-72 bg-white rounded-[32px] p-5 shadow-sm border border-white">
            <div className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setPageActive(item.id)} // C'est ici que la magie opère
                  className={`w-full flex justify-between items-center p-4 rounded-2xl transition-all duration-300
                    ${pageActive === item.id 
                      ? "bg-[#FF7A30] text-white shadow-md" 
                      : "hover:bg-[#FFF5F0] text-[#6D2829]"}`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={`text-xl ${pageActive === item.id ? "text-white" : "text-[#FF7A30]"}`} />
                    <span className="font-semibold text-sm capitalize">{item.label}</span>
                  </div>
                  <FiChevronRight className={`${pageActive === item.id ? "rotate-90" : "opacity-30"}`} />
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-50">
              <button className="w-full flex items-center gap-4 p-4 text-[#FF7A30] font-bold hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all">
                <FiLogOut className="text-xl" />
                <span className="text-sm">Se deconnecter</span>
              </button>
            </div>
          </div>

          {/* CONTENU DROITE (Dynamique) */}
          <motion.div 
            key={pageActive} // Oblige Framer Motion à rejouer l'anim au changement de page
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 w-full bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-white min-h-[500px]"
          >
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="bg-white p-6 rounded-[32px] shadow-sm border border-white flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-400 capitalize">{label}</p>
        <p className="text-3xl font-extrabold text-[#6D2829]">{value}</p>
      </div>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner" style={{ backgroundColor: iconBg, color: iconColor }}>
        <Icon />
      </div>
    </div>
  );
}

export default ProfilPage;