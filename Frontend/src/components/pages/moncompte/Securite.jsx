import React from 'react';
import { ShieldCheck, Fingerprint, Download } from 'lucide-react';

const Securite = () => {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-5 duration-500">
      
      {/* --- SECTION : CHANGEMENT DE MOT DE PASSE --- */}
      <div className="bg-white p-8 rounded-[20px] shadow-2xl ">
        <div className="flex items-center gap-4 mb-6 pb-5">
          <ShieldCheck className="text-[#951418]" size={35} />
          <h2 className="text-3xl font-regular text-[#951418]">Changer le mot de passe</h2>
        </div>

        <div className="space-y-8 max-w-3xl">
          {/* Mot de passe actuel */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">Mot de passe actuel</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full  border-1 bg-[#FFE3CE] border-[#C0A0A0] rounded-2xl py-4 px-8 font-regular text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" 
            />
          </div>

          {/* Nouveau mot de passe */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">Nouveau mot de passe</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full  border-1 bg-[#FFE3CE] border-[#C0A0A0] rounded-2xl py-4 px-8 font-regular text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" 
            />
          </div>

          {/* Confirmation */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">Confirmer le nouveau mot de passe</label>
            <input 
              type="password" 
              placeholder="••••••••"
             className="w-full border-1 bg-[#FFE3CE] border-[#C0A0A0] rounded-2xl py-4 px-8 font-regular text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" 
            />
          </div>
        </div>
      </div>

      {/* --- SECTION : AUTHENTIFICATION 2FA --- */}
      <div className="bg-white p-8 rounded-[20px] shadow-2xl   flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="bg-[#FF843D] p-4 rounded-2xl shadow-xl shadow-orange-100">
            <Fingerprint className="text-white" size={33} />
          </div>
          <div>
            <h3 className="text-[#951418] font-regular text-2xl">Authentification à deux facteurs</h3>
            <p className="text-[#951418] text-sm font-regular">Ajouter une couche de sécurité supplémentaire à votre compte</p>
          </div>
        </div>
        <button className="bg-[#FF843D] text-white px-9 py-3 rounded-2xl font-regular text-lg shadow-sm shadow-[#FF843D] hover:scale-105 transition-transform">
          Activé
        </button>
      </div>

      {/* --- BOUTON DE SAUVEGARDE FINAL --- */}
      <div className="flex justify-end mt-1">
        <button className="bg-[#FF843D] text-white px-10 py-4 rounded-2xl font-regular text-xl flex items-center gap-2 shadow-md shadow-[#FF843D] hover:scale-105 active:scale-95 transition-all ">
          <Download size={26} />
          Sauvegarder les préférences
        </button>
      </div>

    </div>
  );
};

export default Securite;