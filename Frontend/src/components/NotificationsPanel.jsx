import React, { useState } from "react";

export default function NotificationsPanel() {
  const [settings, setSettings] = useState({
    commande: true,
    livraison: true,
    evaluation: true,
    resume: true,
    sms: true,
    promo: false,
  });

  const toggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const Toggle = ({ active, onClick }) => (
    <div
      onClick={onClick}
      className={`w-12 h-6 flex items-center rounded-full cursor-pointer transition ${
        active ? "bg-orange-500" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          active ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  );

  const Item = ({ title, desc, value, onClick }) => (
    <div className="flex justify-between items-center py-3 ml-20 mt-4">
      <div>
        <p className="text-[#951418] font-semibold">{title}</p>
        <p className="text-gray-500 text-sm">{desc}</p>
      </div>
      <Toggle active={value} onClick={onClick} />
    </div>
  );

  return (
    <>
    <div className="bg-white rounded-[15px]  w-[697px] h-[600px] absolute left-[250px] top-[0px] pr-10">
      <h2 className="text-xl text-[#951418] font-semibold mb-4 mt-[30px] ml-12 mb-10">🔔 Notifications</h2>

      <Item
        title="Nouvelle commande"
        desc="Soyez alerté instantanément"
        value={settings.commande}
        onClick={() => toggle("commande")}
      />
      <Item
        title="Commande prête"
        desc="Notification quand commande prête"
        value={settings.livraison}
        onClick={() => toggle("livraison")}
      />
      <Item
        title="Nouvelle évaluation"
        desc="Recevez les avis clients"
        value={settings.evaluation}
        onClick={() => toggle("evaluation")}
      />
      <Item
        title="Résumé quotidien"
        desc="Recevoir un récapitulatif chaque soir"
        value={settings.resume}
        onClick={() => toggle("resume")}
      />
      <Item
        title="Alertes SMS"
        desc="Recevoir alertes critiques par SMS"
        value={settings.sms}
        onClick={() => toggle("sms")}
      />
      <Item
        title="Promotions"
        desc="Offres spéciales et nouveautés"
        value={settings.promo}
        onClick={() => toggle("promo")}
      />
    </div>
        <button className="bg-[#ff7d31] text-white h-[51px] w-[309px] rounded-[15px] absolute left-[640px] top-[620px]">
          Sauvegarder les preférences
        </button>
    </>
    
  );
}