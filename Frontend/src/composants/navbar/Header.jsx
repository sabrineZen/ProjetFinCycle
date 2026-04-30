import React from 'react';
import { Bell, Menu, UtensilsCrossed } from 'lucide-react';

const Header = ({ title, onMenuClick }) => {
  const dateAujourdhui = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="fixed top-0 left-0 w-full h-20 md:h-23 bg-[#FFF4EC] flex items-center justify-between px-4 md:px-10 border-b border-gray-100 z-50 font-sans shadow-md shadow-gray-300">
      
      {/* ZONE GAUCHE : Bouton Burger + Titre Desktop */}
      <div className="flex-1 flex items-center">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 bg-white border border-gray-100 rounded-xl shadow-sm text-[#951418] hover:bg-[#FFF5F1] transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="hidden lg:block ml-6 text-left">
          <h1 className="text-[28px] text-[#951418] font-regular">
            {title}
          </h1>
          <p className="text-base text-gray-400 capitalize mt-1">
            {dateAujourdhui}
          </p>
        </div>
      </div>

      {/* ZONE CENTRE : Logo Centré */}
      <div className="flex-1 flex justify-center items-center gap-3 md:gap-5 min-w-30 md:min-w-50">
        <div className="text-[#951418]">
          <UtensilsCrossed size={40} className="md:size-15" strokeWidth={1} />
        </div>

        <div className="hidden lg:flex flex-col text-left">
          <span className="text-[15px] text-[#951418] uppercase tracking-wider leading-tight">
            Espace
          </span>
          <span className="text-[19px] text-[#951418] leading-tight font-regular">
            RestoPro
          </span>
        </div>
      </div>

      {/* ZONE DROITE : Notifications + Profil */}
      <div className="flex-1 flex justify-end items-center gap-3 md:gap-6">
        <button className="relative p-2 text-[#951418] hover:text-[#B23B2B] transition-colors">
          <Bell size={28} className="md:size-9.5" strokeWidth={1.5} />
          <span className="absolute top-1 right-1 md:top-2 md:right-2.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#B23B2B] rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-2 md:gap-3 cursor-pointer group">
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#FF843D] flex items-center justify-center text-white font-regular text-lg md:text-xl shadow-md group-hover:scale-105 transition-transform">
            G
          </div>
          <span className="hidden lg:block text-sm text-[#951418] font-regular uppercase tracking-tight group-hover:text-[#B23B2B]">
            YOUNSI Ghanou
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;