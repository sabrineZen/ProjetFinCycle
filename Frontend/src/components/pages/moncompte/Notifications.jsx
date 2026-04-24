import React, { useState } from 'react';
import { Bell, Download } from 'lucide-react';

const Notifications = () => {
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
    { id: 'nouvelleCommande', title: 'Nouvelle commande', desc: 'Alertes instantanées des commandes' },
    { id: 'commandePrete', title: 'Commande prête', desc: 'Quand la commande est prête à livrer' },
    { id: 'evaluationClient', title: 'Évaluation client', desc: 'Avis et notes des clients' },
    { id: 'resumeEmail', title: 'Résumé email', desc: 'Rapport quotidien des ventes' },
    { id: 'alerteSMS', title: 'Alertes SMS', desc: 'Alertes importantes par SMS' },
    { id: 'offresRestoPro', title: 'Offres RestoPro', desc: 'Promotions et nouveautés' },
  ];

  return (
    <div className="flex flex-col gap-6">

      {/* CARD */}
      <div className="bg-white p-5 sm:p-12 rounded-[20px] shadow-md">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <Bell className="text-[#951418]" size={28} />
          <h2 className="text-xl sm:text-3xl text-[#951418]">
            Notifications
          </h2>
        </div>

        {/* LIST */}
        <div className="space-y-6 sm:space-y-10">

          {notificationItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4"
            >

              {/* TEXT */}
              <div className="flex gap-3 sm:gap-4 flex-1">
                <div className="mt-2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#951418]" />

                <div className="flex-1">
                  <h3 className="text-base sm:text-2xl text-[#951418]">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* TOGGLE FIX MOBILE */}
              <button
                onClick={() => togglePref(item.id)}
                className={`relative w-12 sm:w-17 h-6 sm:h-8 rounded-full border-2 border-[#8B2C21] transition-all ${
                  prefs[item.id] ? 'bg-[#FF843D]' : 'bg-[#FFF4EC]'
                }`}
              >

                <div
                  className={`absolute top-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-[#8B2C21] transition-transform duration-300 ${
                    prefs[item.id]
                      ? 'translate-x-6 sm:translate-x-8 bg-white'
                      : 'translate-x-0 bg-[#FFF4EC]'
                  }`}
                />

              </button>

            </div>
          ))}

        </div>
      </div>

      {/* BUTTON */}
      <div className="flex justify-end">
        <button className="bg-[#FF843D] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-2xl flex items-center gap-2 text-sm sm:text-xl hover:scale-105 transition-all">
          <Download size={20} />
          Sauvegarder
        </button>
      </div>

    </div>
  );
};

export default Notifications;