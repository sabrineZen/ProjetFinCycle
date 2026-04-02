import React from 'react';
import { RefreshCw, AlertTriangle, Info, Trash2 } from 'lucide-react';

const Abonnement = () => {
  const plans = [
    {
      name: "Starter",
      price: "900",
      commission: "15%",
      restaurants: "1 restaurant",
      support: "Support standard",
      buttonText: "Choisir ce plan",
      current: false
    },
    {
      name: "Pro",
      price: "2900",
      commission: "8%",
      restaurants: "1 restaurant",
      support: "Support prioritaire",
      buttonText: "Plan actuel",
      current: true
    },
    {
      name: "Businnes",
      price: "6500",
      commission: "5%",
      restaurants: "5 restaurants",
      support: "Support dédié 24/7",
      buttonText: "Choisir ce plan",
      current: false
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-5 duration-500 pb-10">
      
      {/* --- PLAN ACTUEL --- */}
      <div className="bg-white p-7 rounded-[20px] shadow-xl ">
        <div className="flex justify-between items-start mb-7">
          <div>
            <p className="text-[#951418] font-regular text-md">Plan actuel</p>
            <h2 className="text-3xl font-regular text-[#951418]">Pro Mensuel</h2>
            <p className="text-[#951418] font-regular text-md">Expire 30 Mars 2026</p>
          </div>
          <div className="text-right">
            <span className="text-5xl font-regular text-[#951418]">2900</span>
            <span className="text-[#951418] font-regular ml-2">DA / mois</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 border-t border-gray-400 pt-6">
          <div className="text-center">
            <p className="text-2xl font-regular text-[#951418]">8%</p>
            <p className="text-gray-500 text-xs font-regular uppercase">Commissions</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-2xl font-regular text-[#951418]">1 max</p>
            <p className="text-gray-500 text-xs font-regular uppercase">Restaurants</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-regular text-[#951418]">Prioritaire</p>
            <p className="text-gray-500 text-xs font-regular uppercase">Support</p>
          </div>
        </div>
      </div>

      {/* --- CHANGER DE PLAN --- */}
      <div className="bg-white p-8 rounded-[20px] shadow-2xl ">
        <div className="flex items-center gap-2 mb-8">
          <RefreshCw className="text-[#951418]" size={30} />
          <h2 className="text-3xl font-regular text-[#951418]">Changer de plan</h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className={`p-6 rounded-[20px] border-1 flex flex-col items-center shadow-xl text-center transition-all ${plan.current ? 'border-1 border-[#951418] bg-[#FFE3CE]' : 'border-1 border-[#C0A0A0] bg-[#FFE3CE]/50'}`}>
              <div className="flex justify-between w-full items-start mb-4">
                <h3 className="text-2xl font-regular text-[#951418]">{plan.name}</h3>
                {plan.current && <span className="bg-[#951418] text-white text-[10px] px-3 py-1 rounded-full font-regular shadow-md shadow-[#951418]">Actuel</span>}
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-regular text-[#951418]/70">{plan.price}</span>
                <span className="text-[#951418]/60 text-xs font-regular ml-1">DA/mois</span>
              </div>

              <div className="space-y-2 mb-7 w-full text-sm font-regular text-[#951418]/50">
                <p>Commision {plan.commission}</p>
                <p>{plan.restaurants}</p>
                <p>{plan.support}</p>
              </div>

              <button className={`w-full py-2.5 rounded-2xl font-regular transition-all  bg-[#FF843D] text-white shadow-lg shadow-sm shadow-[#FF843D] hover:scale-105 ${plan.current ? ' ' : ''}`} disabled={plan.current}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* --- ZONE DE DANGER --- */}
      <div className="bg-white p-10 rounded-[20px] shadow-2xl ">
        <div className="flex items-center gap-3.5 mb-8">
          <AlertTriangle className="text-[#951418]" size={35} />
          <h2 className="text-3xl font-regular text-[#951418]">Zone de danger</h2>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-2xl font-regular text-[#951418]">Résilier l'abonnement</h4>
              <p className="text-[#951418]/60 font-regular text-sm">Votre compte sera désactivé à la fin de la période en cours</p>
            </div>
            <button className="bg-[#FF843D] text-white px-6 py-3 rounded-2xl font-regular flex items-center gap-2 shadow-sm shadow-[#FF843D] hover:scale-105 transition-all">
              <Info size={20} />
              Résilier
            </button>
          </div>

          <div className="flex items-center justify-between pt-6 ">
            <div>
              <h4 className="text-2xl font-regular text-[#951418]">Supprimer le compte</h4>
              <p className="text-[#951418]/60 font-regular text-sm">Action irréversible-toutes vos données seront supprimées</p>
            </div>
            <button className="bg-[#FF843D] text-white px-6 py-3 rounded-2xl font-regular flex items-center gap-2 shadow-sm shadow-[#FF843D] hover:scale-105 transition-all">
              <Trash2 size={20} />
              Supprimer
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Abonnement;