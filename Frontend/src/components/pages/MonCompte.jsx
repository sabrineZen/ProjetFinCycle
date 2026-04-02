import React, { useState } from 'react';
import { User, ShieldCheck, Bell, CreditCard, Camera, Settings } from 'lucide-react';

// IMPORTANT : Vérifie que le nom du dossier est bien 'moncompte' en minuscules
import Profil from './moncompte/Profil'; 
import Securite from './moncompte/Securite'; 
import Notifications from './moncompte/Notifications';
import Abonnement from './moncompte/Abonnement'; 

const MonCompte = () => {
  // L'onglet actif par défaut correspond à l'ID dans menuItems
  const [activeTab, setActiveTab] = useState('Profil');

  const menuItems = [
    { id: 'Profil', icon: <User size={22} />, label: 'Profil' },
    { id: 'Securite', icon: <ShieldCheck size={22} />, label: 'Sécurité' },
    { id: 'Notifications', icon: <Bell size={22} />, label: 'Notifications' },
    { id: 'Abonnement', icon: <CreditCard size={22} />, label: 'Abonnement' },
  ];

  return (
    // Ajout de w-full et overflow-hidden pour éviter les scrolls horizontaux indésirables
    <div className="flex gap-10 animate-in fade-in duration-500 p-2 bg-[#FCF8F5] min-h-screen w-full">
      
      {/* --- COLONNE GAUCHE (Sidebar) --- */}
      <div className="w-[280px] flex-shrink-0 space-y-8">
        <div className="bg-white p-10 rounded-[20px] shadow-xl border border-gray-50 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-[20px] overflow-hidden border-4 border-[#FFE8D6] shadow-sm">
              <img 
                src="https://cdn.mos.cms.futurecdn.net/HNnPBHRgfDcRwMyPAbGoDR.jpg" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute -right-2 -bottom-2 bg-[#FF843D] text-white p-2.5 rounded-2xl shadow-lg border-4 border-white hover:scale-110 transition-transform">
              <Camera size={18} fill="currentColor" />
            </button>
          </div>

          <h3 className="text-[28px] font-regular text-[#951418] mb-1 text-center">Ghanou Yns</h3>
          <p className="text-gray-400 text-sm font-regular mb-6 truncate w-full text-center">younsighanou43@gmail.com</p>
          
          <div className="bg-[#FFE3CE] px-3.5 py-3 rounded-2xl flex items-center gap-3 mb-10 shadow-xl">
            <Settings size={20} className="text-[#8B2C21]" />
            <span className="text-[#951418] text-[12px]  font-regular uppercase tracking-widest">Compte vérifié</span>
          </div>

          <div className="grid grid-cols-2 w-full pt-2  border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-regular text-[#8B2C21]">1</p>
              <p className="text-gray-400 text-[10px] font-regular uppercase tracking-tighter">Restaurant</p>
            </div>
            <div className="text-center border-l border-gray-100">
              <p className="text-3xl font-regular text-[#8B2C21]">152</p>
              <p className="text-gray-400 text-[10px] font-regular uppercase tracking-tighter">Commandes</p>
            </div>
          </div>
        </div>

        {/* MENU DE NAVIGATION */}
        <div className="bg-white p-4 rounded-[20px] shadow-xl  ">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-[20px] font-regular  text-lg transition-all ${
                activeTab === item.id 
                ? 'bg-[#FF843D] text-white shadow-xl shadow-xl scale-[1.02]' 
                : 'text-[#8B2C21]  '
              }`}
            >
              <span className={activeTab === item.id ? 'text-white' : 'text-[#8B2C21]'}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- COLONNE DROITE (Contenu) --- */}
      <div className="flex-1 min-h-[700px]">
        {/* Rendu conditionnel strict */}
        {activeTab === 'Profil' && <Profil />}
        {activeTab === 'Securite' && <Securite />}
        {activeTab === 'Notifications' && <Notifications />}
        {activeTab === 'Abonnement' && <Abonnement />}
      </div>

    </div>
  );
};

export default MonCompte;