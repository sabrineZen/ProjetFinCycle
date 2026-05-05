import { motion, AnimatePresence } from "framer-motion";
import { FaBasketShopping } from "react-icons/fa6";
import { TbReportMoney } from "react-icons/tb";
import { MdLogout, MdOutlineShoppingBag } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { IoChevronForward, IoSettingsOutline } from "react-icons/io5";
import { useState } from "react";

// Tes composants
import InfoPersonnelles from "../../composants/infospersonnelles";
import MesCommandes from "../../composants/mescommandes";
import Parametre from "../../composants/paremtre";

function ProfilPage() {
  const [pageActive, setPageActive] = useState("informations");

  // Configuration des animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const menuItems = [
    { id: "informations", label: "Informations", icon: BsPerson },
    { id: "commandes", label: "Mes Commandes", icon: MdOutlineShoppingBag },
    { id: "parmetres", label: "Paramètres", icon: IoSettingsOutline },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F5] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ── HEADER PROFIL (Adapté Orange/Noir) ── */}
        <motion.div 
          initial="hidden" animate="visible" variants={containerVariants}
          className="relative overflow-hidden bg-white rounded-[40px] shadow-[0_15px_40px_rgba(254,125,50,0.08)] border border-white p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              {/* Gradient subtil orange */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FE7D32] to-[#FFB385] rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" 
                className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                alt="Avatar"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-black text-[#1A1208] tracking-tighter uppercase">
                Sophie <span className="text-[#FE7D32]">Martin</span>
              </h1>
              <p className="text-gray-400 font-bold tracking-[3px] text-[10px] uppercase mt-1">Membre Gourmet Premium</p>
            </div>
          </div>
          
          {/* Bouton Primaire Orange */}
          <button className="bg-[#FE7D32] hover:bg-[#e66a25] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(254,125,50,0.2)] active:scale-95">
            Modifier le profil
          </button>
        </motion.div>

        {/* ── STATISTIQUES (Harmonisation des couleurs) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard 
            label="Dépenses Totales" 
            value="65.400 DA" 
            icon={<TbReportMoney />} 
            color="#FE7D32" /* Orange principal */
            delay={0.1}
          />
          <StatCard 
            label="Articles commandés" 
            value="48 Plats" 
            icon={<FaBasketShopping />} 
            color="#1A1208" /* Noir secondaire */
            delay={0.2}
          />
        </div>

        {/* ── CORPS DE PAGE (Menu + Contenu) ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Menu Latéral (Style épuré) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-80 bg-white rounded-[35px] shadow-xl shadow-black/[0.02] p-6 space-y-2 border border-gray-100"
          >
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[4px] mb-6 px-4">Mon Espace</p>
            
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setPageActive(item.id)}
                className={`w-full flex justify-between items-center p-4 rounded-2xl transition-all duration-300 group
                  ${pageActive === item.id 
                    ? "bg-[#FE7D32] text-white shadow-[0_10px_20px_rgba(254,125,50,0.25)] translate-x-2" 
                    : "hover:bg-[#FFF9F5] text-[#1A1208]"}`}
              >
                <div className="flex items-center gap-4">
                  <item.icon className={`text-xl ${pageActive === item.id ? "text-white" : "text-[#FE7D32]"}`} />
                  <span className={`font-bold text-sm tracking-tight ${pageActive === item.id ? "text-white" : "text-[#1A1208]"}`}>
                    {item.label}
                  </span>
                </div>
                <IoChevronForward className={`transition-transform opacity-50 ${pageActive === item.id ? "rotate-90" : "group-hover:translate-x-1"}`} />
              </button>
            ))}

            <div className="pt-6 mt-6 border-t border-gray-100">
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-50 transition-colors group">
                <MdLogout className="text-xl group-hover:rotate-12 transition-transform" />
                <span className="font-black text-xs uppercase tracking-widest">Se déconnecter</span>
              </button>
            </div>
          </motion.div>

          {/* Zone de Contenu Dynamique */}
          <motion.div 
            key={pageActive}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 w-full bg-white rounded-[40px] shadow-2xl shadow-black/[0.02] p-6 md:p-10 border border-gray-100 min-h-[500px]"
          >
            <AnimatePresence mode="wait">
              {pageActive === "informations" && <InfoPersonnelles key="info" />}
              {pageActive === "commandes" && <MesCommandes key="orders" />}
              {pageActive === "parmetres" && <Parametre key="settings" />}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

// Composant interne pour les cartes de stats
function StatCard({ label, value, icon, color, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-[35px] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-50 flex justify-between items-center hover:shadow-md transition-shadow group"
    >
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-60" style={{ color }}>{label}</p>
        <p className="text-2xl font-black text-[#1A1208]">{value}</p>
      </div>
      <div 
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}15`, color: color }}
      >
        {icon}
      </div>
    </motion.div>
  );
}

export default ProfilPage;