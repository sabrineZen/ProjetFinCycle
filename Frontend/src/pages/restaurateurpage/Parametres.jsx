import React, { useState } from 'react';
import { User, ShieldCheck, Bell, CreditCard, Camera, Settings } from 'lucide-react';

 
import Securite from './les_parametres/Securite'; 
import Notifications from './les_parametres/Notifications';


const MonCompte = () => {
  const [activeTab, setActiveTab] = useState('Securite');

  const menuItems = [
    { id: 'Securite', icon: <ShieldCheck size={22} />, label: 'Sécurité' },
    { id: 'Notifications', icon: <Bell size={22} />, label: 'Notifications' }    
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in duration-500 p-2 bg-[#FCF8F5] min-h-screen w-full">

      {/* SIDEBAR → en haut sur mobile, à gauche sur desktop */}
      <div className="w-full lg:w-[280px] flex-shrink-0 space-y-8 order-1 lg:order-1">

        {/* CARD PROFIL */}
        <div className="bg-white p-10 rounded-[20px] shadow-md border border-gray-50 flex flex-col items-center">
          
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-[20px] overflow-hidden border-4 border-[#FFE8D6] shadow-sm">
              <img 
                src="https://cdn.mos.cms.futurecdn.net/HNnPBHRgfDcRwMyPAbGoDR.jpg" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -right-2 -bottom-2 bg-[#FF843D] text-white p-2.5 rounded-2xl shadow-md border-4 border-white">
              <Camera size={18} />
            </button>
          </div>

          <h3 className="text-[28px] text-[#951418] mb-1 text-center">Ghanou Yns</h3>
          <p className="text-gray-400 text-sm mb-6 text-center truncate w-full">
            younsighanou43@gmail.com
          </p>

          <div className="bg-[#FFE3CE] px-3.5 py-3 rounded-2xl flex items-center gap-3 mb-10 shadow-sm">
            <Settings size={20} className="text-[#8B2C21]" />
            <span className="text-[#951418] text-[12px] uppercase">
              Compte vérifié
            </span>
          </div>

          <div className="grid grid-cols-2 w-full pt-2">
            <div className="text-center">
              <p className="text-3xl text-[#8B2C21]">1</p>
              <p className="text-gray-400 text-[10px] uppercase">Restaurant</p>
            </div>
            <div className="text-center border-l border-gray-100">
              <p className="text-3xl text-[#8B2C21]">152</p>
              <p className="text-gray-400 text-[10px] uppercase">Commandes</p>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className="bg-white p-4 rounded-[20px] shadow-md">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-[20px] text-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-[#FF843D] text-white scale-[1.02]' 
                  : 'text-[#8B2C21]'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENU → passe en dessous sur mobile */}
      <div className="flex-1 order-2 lg:order-2 min-h-[700px]">
        {activeTab === 'Securite' && <Securite />}
        {activeTab === 'Notifications' && <Notifications />}
      </div>

    </div>
  );
};

export default MonCompte;