import React, { useState, useEffect } from 'react';
import { ShieldCheck, Bell, Settings } from 'lucide-react';
import api from '../../api';

import Securite from './Parametres/Securite';
import Notifications from './Parametres/Notifications';

const MonCompte = () => {
  const [activeTab, setActiveTab]   = useState('Securite');
  const [profil, setProfil]         = useState({ nomRestaurant: '', email: '' });
  const [nbCommandes, setNbCommandes] = useState(0);
  const [photoUrl, setPhotoUrl]     = useState(
    localStorage.getItem('photo_profil') || "https://cdn.mos.cms.futurecdn.net/HNnPBHRgfDcRwMyPAbGoDR.jpg"
  );

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const { data } = await api.get('/restaurateurs/profil');
        setProfil(data);

        // ── Nombre de commandes ──
        const token = localStorage.getItem('token');
        const resCmd = await fetch('/api/commandes/restaurateur', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const commandes = await resCmd.json();
        setNbCommandes(Array.isArray(commandes) ? commandes.length : 0);

      } catch (error) {
        console.error('Erreur chargement profil:', error);
      }
    };

    fetchProfil();

    const photo = localStorage.getItem('photo_profil');
    if (photo) setPhotoUrl(photo);
  }, []);

  const menuItems = [
    { id: 'Securite',      icon: <ShieldCheck size={22} />, label: 'Sécurité' },
    { id: 'Notifications', icon: <Bell size={22} />,        label: 'Notifications' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-10 animate-in fade-in duration-500 p-2 bg-[#FCF8F5] min-h-screen w-full">

      <div className="w-full lg:w-70 shrink-0 space-y-8 order-1 lg:order-1">

        <div className="bg-white p-10 rounded-[20px] shadow-md border border-gray-50 flex flex-col items-center">

          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-[20px] overflow-hidden border-4 border-[#FFE8D6] shadow-sm">
              <img src={photoUrl} alt="Profile Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

          <h3 className="text-[28px] text-[#951418] mb-1 text-center">
            {profil.nomRestaurant || 'Chargement...'}
          </h3>
          <p className="text-gray-400 text-sm mb-6 text-center truncate w-full">
            {profil.email || 'Chargement...'}
          </p>

          <div className="bg-[#FFE3CE] px-3.5 py-3 rounded-2xl flex items-center gap-3 mb-10 shadow-sm">
            <Settings size={20} className="text-[#8B2C21]" />
            <span className="text-[#951418] text-[12px] uppercase">Compte vérifié</span>
          </div>

          <div className="grid grid-cols-2 w-full pt-2">
            <div className="text-center">
              <p className="text-3xl text-[#8B2C21]">1</p>
              <p className="text-gray-400 text-[10px] uppercase">Restaurant</p>
            </div>
            <div className="text-center border-l border-gray-100">
              <p className="text-3xl text-[#8B2C21]">{nbCommandes}</p>
              <p className="text-gray-400 text-[10px] uppercase">Commandes</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-[20px] shadow-md">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-[20px] text-lg transition-all ${
                activeTab === item.id ? 'bg-[#FF843D] text-white scale-[1.02]' : 'text-[#8B2C21]'
              }`}>
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 order-2 lg:order-2 min-h-screen">
        {activeTab === 'Securite'      && <Securite />}
        {activeTab === 'Notifications' && <Notifications />}
      </div>

    </div>
  );
};

export default MonCompte;