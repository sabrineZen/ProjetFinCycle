import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Building, Download } from 'lucide-react';

const Profil = () => {
  // État pour les données du formulaire
  const [formData, setFormData] = useState({
    prenom: 'Ghanou',
    nom: 'Yns',
    email: 'younsighanou43@gmail.com',
    telephone: '0777777 513',
    ville: 'Alger',
    rib: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* SECTION BLANCHE : INFORMATIONS PERSONNELLES */}
      <div className="bg-white p-8 rounded-[20px] shadow-2xl ">
        
        {/* EN-TÊTE AVEC ICÔNE ET TITRE */}
        <div className="flex items-center gap-2 mb-6 pb-5 ">
          <div className="p-1 text-[#951418]">
            <User size={35} strokeWidth={2} />
          </div>
          <h2 className="text-3xl font-regular text-[#951418]">Informations personnelles</h2>
        </div>

        {/* GRILLE DES INPUTS (2 COLONNES) */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-10">
          
          {/* Prénom */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">Prénom</label>
            <input 
              type="text" 
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="w-full  border-1 bg-[#FFE3CE] border-[#C0A0A0] rounded-2xl py-4 px-8 font-regular text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" 
            />
          </div>

          {/* Nom */}
          <div className="space-y-3 ">
            <label className="text-[#951418] font-regular text-xl ml-2 ">Nom</label>
            <input 
              type="text" 
              name="nom"
              value={formData.nom}
              onChange={handleChange}
             className="w-full  border-1  bg-[#FFE3CE] border-[#C0A0A0] rounded-2xl py-4 px-8 font-regular text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none"  
            />
          </div>

          {/* Adresse Email */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">Adresse email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full  border-1 bg-[#FFE3CE] border-[#C0A0A0] rounded-2xl py-4 px-8 font-regular text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none"  
            />
          </div>

          {/* Téléphone */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">Téléphone</label>
            <input 
              type="text" 
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full  border-1 bg-[#FFE3CE] border-[#C0A0A0] rounded-2xl py-4 px-8 font-regular text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" 
            />
          </div>

          {/* Ville */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">Ville</label>
            <input 
              type="text" 
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              className="w-full  border-1 bg-[#FFE3CE] border-[#C0A0A0] rounded-2xl py-4 px-8 font-regular text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none"  
            />
          </div>

          {/* RIB Bancaire */}
          <div className="space-y-3">
            <label className="text-[#951418] font-regular text-xl ml-2">RIB banquire</label>
            <input 
              type="text" 
              name="rib"
              value={formData.rib}
              onChange={handleChange}
              className="w-full  border-1 bg-[#FFE3CE] border-[#C0A0A0] rounded-2xl py-4 px-8 font-regular text-[#951418] focus:ring-2 focus:ring-[#FF843D] transition-all outline-none" 
            />
          </div>

        </div>
      </div>

      {/* BOUTON SAUVEGARDER POSITIONNÉ À DROITE */}
      <div className="flex justify-end mt-2">
        <button className="bg-[#FF843D] text-white px-8 py-4.5 rounded-[18px] font-regular text-xl flex items-center gap-3 shadow-md shadow-[#FF843D] hover:scale-[1.03] active:scale-[0.98] transition-all">
          <Download size={26} />
          Sauvegarder
        </button>
      </div>

    </div>
  );
};

export default Profil;