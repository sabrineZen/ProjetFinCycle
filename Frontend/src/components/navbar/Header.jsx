import React from 'react';
import { Utensils, Bell, ChevronDown } from 'lucide-react';
import { UtensilsCrossed } from 'lucide-react';

const Header = ({ title }) => {
        const dateAujourdhui = new Date().toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
        });
  return (
    // 'fixed top-0 left-0 w-full' pour qu'il prenne tout le haut
    <header className="fixed top-0 left-0 w-full h-24 bg-[#FFF4EC] flex items-center justify-between px-10  border-b border-gray-100 z-50 font-sans shadow-lg shadow-gray-300  ">
      
      {/* Section Logo (Couverts croisés comme sur la photo) */}
      <div className="flex items-center gap-5 min-w-[200px]">
        <div className="text-[#951418]">
          <UtensilsCrossed size={60} strokeWidth={1}  />
        </div>
        <div className="flex flex-col">
          <span className="text-[15px] text-[#951418] font-regular uppercase tracking-wider leading-tight">Espace</span>
          <span className="text-[19px]  font-regular text-[#951418] leading-tight">RestoPro</span>
        </div>
      </div>

      {/* Section Titre et Date */}
      <div className="flex-1 px-45 text-left">
        <h1 className="text-[28px] font-regular text-[#951418]">{title}</h1>
        <p className="text-base text-gray-400 capitalize mt-1">{dateAujourdhui}</p>
      </div>

      {/* Section Notifications et Profil */}
      <div className="flex items-center gap-6">
        {/* Icône Cloche */}
        <button className="relative p-2 text-[#951418]  hover:text-[#B23B2B] transition-colors">
          <Bell size={38} strokeWidth={1.5}/>
          {/* Point de notification rouge */}
          <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-[#B23B2B] rounded-full border-2 border-white"></span>
        </button>

        {/* Profil Utilisateur (Bouton orange) */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-11 h-11 rounded-full bg-[#FF843D] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="text-sm text-[#951418] font-bold  uppercase tracking-tight group-hover:text-[#B23B2B]">
            YOUNSI Ghanou
          </span>
          <ChevronDown size={18} className="text-gray-400 ml-1 group-hover:text-[#951418]" />
        </div>
      </div>
    </header>
  );
};

export default Header;