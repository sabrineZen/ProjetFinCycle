import React from 'react';
import { Camera, MapPin, Phone, Clock, Info, Truck, Save, Mail } from 'lucide-react';

const MonRestaurant = ({ estActif, setEstActif }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 pb-20">
      
      {/* --- COLONNE GAUCHE (Profil & Infos rapides) --- */}
      <div className="w-full lg:w-[280px] space-y-6">
        
        {/* Carte Profil */}
        <div className="bg-white p-11 rounded-[20px] shadow-md  flex flex-col items-center text-center">
          <div className="relative">
            <img 
              src="https://cdn.mos.cms.futurecdn.net/HNnPBHRgfDcRwMyPAbGoDR.jpg" //Remplace par ton image de 
              alt="Logo" 
              className="w-28 h-28 rounded-xl object-cover border-4 border-orange-50"
            />
            <button className="absolute -bottom-2 -right-2 bg-[#FF843D] p-2 rounded-xl text-white shadow-lg">
              <Camera size={20} />
            </button>
          </div>
          
          <h2 className="mt-4 text-2xl font-regular text-[#951418]">Chez les Berbers</h2>
          <p className="text-[#951418]/70 font-regular text-sm">Numéro registre de commerce</p>

          {/* Badge Statut Dynamique */}
          <div className={`mt-4 px-6 py-3 rounded-[14px] flex items-center gap-2 border ${
            estActif ? 'bg-green-50 border-green-100 text-green-600' : 'bg-red-50 border-red-100 text-red-600'
          }`}>
            <span className={`w-3 h-3 rounded-full ${estActif ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            <span className="font-bold text-sm">{estActif ? 'Restaurant actif' : 'Restaurant inactif'}</span>
          </div>

          {/* Bouton Action Dynamique */}
          <button 
            onClick={() => setEstActif(!estActif)}
            className={`mt-6 w-full py-3 rounded-[14px] font-regular text-white text-sm transition-all shadow-lg ${
              estActif ? 'bg-[#FF843D] shadow-orange-100' : 'bg-green-500 shadow-green-100'
            }`}
          >
            {estActif ? 'Désactiver le restaurant' : 'Activer le restaurant'}
          </button>
        </div>

        {/* Carte Infos Rapides */}
        <div className="bg-white p-8 rounded-[20px] shadow-md ">
          <h3 className="text-xl font-regular text-[#951418] mb-6">Informations rapides</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[#951418]/70 font-regular">
              <MapPin className="text-[#951418]" size={20} /> Hellouane, Bejaia
            </div>
            <div className="flex items-center gap-4 text-[#951418]/70 font-regular">
              <Phone className="text-[#951418]" size={20} /> 0791876979
            </div>
           <div className="flex items-center gap-4 text-[#951418]/70 font-regular">
            <Mail className="text-[#951418]" size={20} />
            <span>contact@exemple.com</span>
           </div>
          </div>
        </div>
      </div>

      {/* --- COLONNE DROITE (Formulaires) --- */}
      <div className="lg:w-2/3 space-y-8">
        
        {/* Section Informations Générales */}
        <div className="bg-white p-10 rounded-[20px] shadow-md ">
          <div className="flex items-center gap-3 mb-8">
            <Info className="text-[#951418] "  size={28}/>
            <h3 className="text-3xl font-regular text-[#951418]">Informations générales</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-6">

            <div className="space-y-2">
              <label className="text-xl font-regular text-[#951418] ml-2">Nom du restaurant</label>
              <input type="text" className="w-full bg-[#FFF7F4] border-1 border-[#C0A0A0] rounded-xl p-3 focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" />
            </div>

            <div className="w-full relative">
                    <input type="file" id="file-upload-mobile" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
                    <label htmlFor="file-upload-mobile" className="text-[#951418] block p-3 border border-[#BD897D] rounded-xl bg-[#FFF7F4] text-center cursor-pointer text-sm">
                      Télécharger document officiel
                    </label>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-xl font-regular text-[#951418] ml-2">Numéro registre de commerce</label>
                 <input type="text" className="w-full bg-[#FFF7F4] border-1 border-[#C0A0A0] rounded-xl p-3 focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" placeholder="Numéro de registre de commerce" />
               </div>

               <div className="space-y-2">
                 <label className="text-xl font-regular text-[#951418] ml-2">Email</label>
                 <input type="email" className="w-full bg-[#FFF7F4] border-1 border-[#C0A0A0] rounded-xl p-3 focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" placeholder="contact@berbers.dz " />
               </div>

               <div className="space-y-2">
                 <label className="text-xl font-regular text-[#951418] ml-2">Telephone</label>
                 <input type="tel" className="w-full bg-[#FFF7F4] border-1 border-[#C0A0A0] rounded-xl p-3 focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" placeholder="+213 ... " />
               </div>

               <div className="space-y-2">
                 <label className="text-xl font-regular text-[#951418] ml-2">Adresse</label>
                 <input type="text" className="w-full bg-[#FFF7F4] border-1 border-[#C0A0A0] rounded-xl p-3 focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" />
               </div>

            </div>
          </div>
        </div>

       

        {/* Bouton Sauvegarder (Fixé en bas à droite ou en fin de page) */}
        <div className="flex justify-end">
          <button className="bg-[#FF843D] text-white px-10 py-5 rounded-3xl font-regular shadow-lg shadow-orange-100 hover:scale-105 transition-all flex items-center gap-3">
            <Save size={24} /> Sauvegarder les modifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonRestaurant;