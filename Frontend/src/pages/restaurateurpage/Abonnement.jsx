import React from 'react';
import { FaSyncAlt, FaExclamationTriangle, FaInfoCircle, FaTrashAlt } from 'react-icons/fa';

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
      name: "Business",
      price: "6500",
      commission: "5%",
      restaurants: "5 restaurants",
      support: "Support dédié 24/7",
      buttonText: "Choisir ce plan",
      current: false
    }
  ];

  return (
    <div className="flex flex-col gap-6 pb-10">

      {/* PLAN ACTUEL */}
      <div className="bg-white p-5 sm:p-7 rounded-[20px] shadow-md">
        
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-7">
          
          <div>
            <p className="text-[#951418] text-sm sm:text-md">Plan actuel</p>
            <h2 className="text-xl sm:text-3xl font-regular text-[#951418]">
              Pro Mensuel
            </h2>
            <p className="text-[#951418] text-sm sm:text-md">
              Expire le 30 Mars 2026
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-3xl sm:text-5xl font-regular text-[#951418]">
              2900
            </span>
            <span className="text-[#951418] ml-2 text-sm sm:text-base">
              DA / mois
            </span>
          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 border-t border-gray-200 pt-6 text-center">

          <div>
            <p className="text-xl sm:text-2xl text-[#951418]">8%</p>
            <p className="text-gray-500 text-[10px] uppercase">Commissions</p>
          </div>

          <div className="sm:border-x border-gray-100">
            <p className="text-xl sm:text-2xl text-[#951418]">1 max</p>
            <p className="text-gray-500 text-[10px] uppercase">Restaurants</p>
          </div>

          <div>
            <p className="text-xl sm:text-2xl text-[#951418]">Prioritaire</p>
            <p className="text-gray-500 text-[10px] uppercase">Support</p>
          </div>

        </div>
      </div>

      {/* CHANGER PLAN */}
      <div className="bg-white p-5 sm:p-8 rounded-[20px] shadow-md">

        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <FaSyncAlt className="text-[#951418]" size={24} />
          <h2 className="text-xl sm:text-3xl text-[#951418]">
            Changer de plan
          </h2>
        </div>

        {/* RESPONSIVE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">

          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-5 rounded-[20px] flex flex-col items-center text-center transition-all ${
                plan.current
                  ? 'border border-[#951418] bg-[#FFE3CE]'
                  : 'border border-[#C0A0A0] bg-[#FFE3CE]/50'
              }`}
            >
              
              <h3 className="text-lg sm:text-2xl text-[#951418]">
                {plan.name}
              </h3>

              <div className="my-4">
                <span className="text-2xl sm:text-3xl text-[#951418]/70">
                  {plan.price}
                </span>
                <span className="text-xs text-[#951418]/60 ml-1">
                  DA/mois
                </span>
              </div>

              <div className="text-xs sm:text-sm text-[#951418]/60 space-y-1 mb-5">
                <p>Commission {plan.commission}</p>
                <p>{plan.restaurants}</p>
                <p>{plan.support}</p>
              </div>

              <button
                disabled={plan.current}
                className="w-full py-2 rounded-xl bg-[#FF843D] text-white text-sm hover:scale-105 transition-all disabled:opacity-60"
              >
                {plan.buttonText}
              </button>

            </div>
          ))}

        </div>
      </div>

      {/* ZONE DANGER */}
      <div className="bg-white p-5 sm:p-10 rounded-[20px] shadow-md">

        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <FaExclamationTriangle className="text-[#951418]" size={28} />
          <h2 className="text-xl sm:text-3xl text-[#951418]">
            Zone de danger
          </h2>
        </div>

        <div className="space-y-6">

          {/* Résilier */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <h4 className="text-lg sm:text-2xl text-[#951418]">
                Résilier l'abonnement
              </h4>
              <p className="text-sm text-[#951418]/60">
                Désactivation à la fin de la période
              </p>
            </div>

            <button className="bg-[#FF843D] text-white px-5 py-2 rounded-xl flex items-center gap-2 text-sm">
              <FaInfoCircle size={18} />
              Résilier
            </button>
          </div>

          {/* Supprimer */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-4">

            <div>
              <h4 className="text-lg sm:text-2xl text-[#951418]">
                Supprimer le compte
              </h4>
              <p className="text-sm text-[#951418]/60">
                Action irréversible
              </p>
            </div>

            <button className="bg-[#FF843D] text-white px-5 py-2 rounded-xl flex items-center gap-2 text-sm">
              <FaTrashAlt size={18} />
              Supprimer
            </button>

          </div>

        </div>
      </div>

    </div>
  );
};

export default Abonnement;