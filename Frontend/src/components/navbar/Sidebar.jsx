import React from 'react';
import { LayoutDashboard, UtensilsCrossed, Soup, ClipboardList, UserCircle, LogOut } from 'lucide-react';

const Sidebar = ({ currentPage, setPage,estActif }) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={22} />, label: 'Tableau de bord' },
    { id: 'restaurant', icon: <UtensilsCrossed size={22} />, label: 'Mon restaurant' },
    { id: 'plats', icon: <Soup size={22} />, label: 'Mes plats' },
    { id: 'commandes', icon: <ClipboardList size={22} />, label: 'Commandes' },
    { id: 'compte', icon: <UserCircle size={22} />, label: 'Mon compte' },
  ];

  return (
    // Conteneur de la Sidebar (Positionné sous le Header)
    // 'fixed left-8 top-32' pour qu'il flotte à gauche sous le Header
    <aside className="fixed left-8 top-30 w-75 flex flex-col items-start z-40 font-sans ">
      
      {/* 1. Badge Statut "Restaurant actif" (Au-dessus de la carte) */}
            <div className="mb-5 self-start pl-16">
            <div className={`inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl border shadow-md transition-all ${
                estActif ? 'bg-[#E6F9ED] border-[#D1F2DD]' : 'bg-[#FFF1F1] border-[#FEE2E2]'
            }`}>
                
                {/* Point avec animation constante */}
                <span className="relative flex h-3 w-3">
                {/* Le cercle qui pulse (change de couleur selon l'état) */}
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    estActif ? 'bg-[#10B981]' : 'bg-[#FA0D15]'
                }`}></span>
                
                {/* Le point fixe au centre */}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${
                    estActif ? 'bg-[#10B981]' : 'bg-[#FA0D15]'
                }`}></span>
                </span>

                {/* Texte qui change de couleur */}
                <span className={`font-semibold text-sm transition-colors duration-300 ${
                estActif ? 'text-[#10B981]' : 'text-[#FA0D15]'
                }`}>
                {estActif ? 'Restaurant actif' : 'Restaurant inactif'}
                </span>
            </div>
            </div>

      {/* 2. La Carte du Menu (Rectangle blanc arrondi) */}
      {/* 'bg-white rounded-[32px] shadow-2xl' pour l'effet carte */}
      <nav className="w-full bg-white flex flex-col p-6 rounded-[20px] shadow-2xl shadow-gray-300 ">
        
        {/* Liens de Navigation */}
        <div className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)} // Change la page active
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                ${currentPage === item.id 
                  ? 'bg-[#FF843D] text-white shadow-lg shadow-orange-100 translate-x-1' 
                  : 'text-[#8B2C21] hover:bg-[#FFF5F1] hover:translate-x-1'
                }`}
            >
              <span className={`${currentPage === item.id ? 'text-white' : 'text-[#8B2C21]'}`}>
                {item.icon}
              </span>
              <span className="font-bold text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Séparateur et Déconnexion */}
        <div className="pt-6 mt-6 border-t border-gray-100 text-[#8B2C21]">
          <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl hover:bg-red-50 transition-all group font-bold text-sm">
            <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
            Déconnexion
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;