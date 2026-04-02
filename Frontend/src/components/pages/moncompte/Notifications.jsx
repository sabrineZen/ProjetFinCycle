import React, { useState } from 'react';
import { Bell, Download } from 'lucide-react';

const Notifications = () => {
  // État pour gérer les interrupteurs (toggles)
  const [prefs, setPrefs] = useState({
    nouvelleCommande: true,
    commandePrete: true,
    evaluationClient: true,
    resumeEmail: true,
    alerteSMS: true,
    offresRestoPro: false,
  });

  const togglePref = (key) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationItems = [
    { id: 'nouvelleCommande', title: 'Nouvelle commande', desc: 'Soyez alerté instantanément à chaque nouvelle commande' },
    { id: 'commandePrete', title: 'Commande prete pour livraison', desc: 'Notification quand commande est prete à etre livrée' },
    { id: 'evaluationClient', title: 'Nouvelle évaluation client', desc: 'Recevez les avis notes laissé par vos clients' },
    { id: 'resumeEmail', title: 'Résumé quotidien par email', desc: 'Recevez un récapitulation de vos ventes chaque soir' },
    { id: 'alerteSMS', title: 'Alertes par SMS', desc: 'Recevoir les alertes critiques par SMS' },
    { id: 'offresRestoPro', title: 'Offres et promotions RestoPro', desc: 'Offres spéciales,nouvelles fonctionnalités de la plateforme' },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-5 duration-500">
      
      {/* --- CARTE PRINCIPALE --- */}
      <div className="bg-white p-12 rounded-[20px] shadow-2xl ">
        
        {/* EN-TÊTE */}
        <div className="flex items-center gap-4 mb-6 pb-5 ">
          <Bell className="text-[#951418]" size={35} />
          <h2 className="text-3xl font-regular text-[#951418]">Préférences de notifications</h2>
        </div>

        {/* LISTE DES NOTIFICATIONS */}
        <div className="space-y-10">
          {notificationItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between group">
              <div className="flex gap-4">
                {/* Point décoratif rouge */}
                <div className="mt-2 w-3 h-3 rounded-full bg-[#951418]" />
                <div>
                  <h3 className="text-2xl font-regular text-[#951418]">{item.title}</h3>
                  <p className="text-gray-400 font-regular text-sm">{item.desc}</p>
                </div>
              </div>

              {/* TOGGLE SWITCH CUSTOM (Style RestoPro) */}
              <button 
                onClick={() => togglePref(item.id)}
                className={`relative w-15 h-8 rounded-full border-2 border-[#8B2C21] transition-colors duration-300 ${
                  prefs[item.id] ? 'bg-[#FF843D]' : 'bg-[#FFF4EC]'
                }`}
              >
                <div className={`absolute top-0.5  w-6 h-6 rounded-full border-2 border-[#8B2C21] transition-transform duration-300 ${
                  prefs[item.id] ? 'translate-x-8 bg-white' : 'translate-x-0 bg-[#FFF4EC]'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- BOUTON DE SAUVEGARDE --- */}
      <div className="flex justify-end mt-2">
         <button className="bg-[#FF843D] text-white px-10 py-4 rounded-2xl font-regular text-xl flex items-center gap-2 shadow-md shadow-[#FF843D] hover:scale-105 active:scale-95 transition-all ">
              <Download size={26} />
               Sauvegarder les préférences
           </button>
      </div>

    </div>
  );
};

export default Notifications;