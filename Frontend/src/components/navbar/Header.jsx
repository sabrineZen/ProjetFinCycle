import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import { UtensilsCrossed } from 'lucide-react';

const Header = ({ title }) => {
  const dateAujourdhui = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="absolute top-0 left-0 w-full h-20 md:h-24 bg-[#FFF4EC] flex items-center justify-between px-4 md:px-10 border-b border-gray-100 z-50 font-sans shadow-md shadow-gray-300">
      
      {/* Logo */}
      <div className="flex items-center gap-3 md:gap-5 min-w-[120px] md:min-w-[200px]">
        <div className="text-[#951418]">
          <UtensilsCrossed size={40} className="md:size-[60px]" strokeWidth={1} />
        </div>

        {/* ❌ Caché mobile + tablette */}
        <div className="hidden lg:flex flex-col">
          <span className="text-[15px] text-[#951418] uppercase tracking-wider leading-tight">
            Espace
          </span>
          <span className="text-[19px] text-[#951418] leading-tight">
            RestoPro
          </span>
        </div>
      </div>

      {/* ✅ Visible tablette + desktop (caché seulement mobile) */}
      <div className="hidden md:block flex-1 px-10 lg:px-20 text-left">
        <h1 className="text-[20px] md:text-[24px] lg:text-[28px] text-[#951418]">
          {title}
        </h1>
        <p className="text-sm md:text-base text-gray-400 capitalize mt-1">
          {dateAujourdhui}
        </p>
      </div>

      {/* Notifications + Profil */}
      <div className="flex items-center gap-3 md:gap-6">
        
        {/* Cloche */}
        <button className="relative p-2 text-[#951418] hover:text-[#B23B2B] transition-colors">
          <Bell size={28} className="md:size-[38px]" strokeWidth={1.5} />
          <span className="absolute top-1 right-1 md:top-2 md:right-2.5 w-2 h-2 md:w-2.5 md:h-2.5 bg-[#B23B2B] rounded-full border-2 border-white"></span>
        </button>

        {/* Profil */}
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer group">
          <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-[#FF843D] flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md group-hover:scale-105 transition-transform">
            G
          </div>

          {/* ❌ Caché mobile + tablette */}
          <span className="hidden lg:block text-sm text-[#951418] font-bold uppercase tracking-tight group-hover:text-[#B23B2B]">
            YOUNSI Ghanou
          </span>

          <ChevronDown size={16} className="md:size-[18px] text-gray-400 ml-1 group-hover:text-[#951418]" />
        </div>
      </div>
    </header>
  );
};

export default Header;