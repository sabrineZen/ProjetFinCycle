import React, { useState } from "react";

export default function RestaurantInfoForm() {
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState("");
  const [tel, setTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ouverture, setOuverture] = useState("");
  const [fermeture, setFermeture] = useState("");
  const [savedData, setSavedData] = useState({});

  const handleSave = () => {
    setSavedData({ nom, categorie, tel, adresse, ouverture, fermeture });
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Formulaire informations générales */}
      <div className="bg-white w-[628px] rounded-[15px] p-6">
        <div className="flex items-center mb-5">
          <span className="w-[43px] h-[43px] bg-[#ff7d31] rounded-full mr-4" />
          <span className="text-[#951418] text-[25px]">Informations générales</span>
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-[#951418] ml-1">Nom de Restaurant</label>
          <input
            type="text"
            className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] w-full h-[45px] px-3 mt-2"
            value={nom}
            onChange={e => setNom(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-[#951418] ml-1">Description</label>
          <textarea
            className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] w-full h-[93px] px-3 mt-2"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex flex-col flex-1">
            <label className="text-[#951418]">Catégorie</label>
            <select
              className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] h-[45px] px-3 mt-2"
              value={categorie}
              onChange={e => setCategorie(e.target.value)}
            >
              <option value="">-- Choisir une catégorie --</option>
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="Salade">Salade</option>
              <option value="Desserts">Desserts</option>
              <option value="Boissons">Boissons</option>
            </select>
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-[#951418]">Email</label>
            <input
              type="email"
              className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] h-[40px] px-3 mt-2"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <label className="text-[#951418]">Téléphone</label>
            <input
              type="tel"
              className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] h-[45px] px-3 mt-2"
              value={tel}
              onChange={e => setTel(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-[#951418]">Adresse</label>
            <input
              type="text"
              className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] h-[45px] px-3 mt-2"
              value={adresse}
              onChange={e => setAdresse(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Formulaire horaires & livraison */}
      <div className="bg-white w-[628px] rounded-[15px] p-6">
        <p className="text-[#951418] text-[25px] mb-4">Horaires & livraison</p>

        <div className="flex gap-4 mb-4">
          <div className="flex flex-col flex-1">
            <label className="text-[#951418]">Heure d'ouverture</label>
            <input
              type="text"
              className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] h-[46px] px-3 mt-2"
              value={ouverture}
              onChange={e => setOuverture(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-[#951418]">Heure de fermeture</label>
            <input
              type="text"
              className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] h-[46px] px-3 mt-2"
              value={fermeture}
              onChange={e => setFermeture(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-[#951418]">Délai de livraison</label>
            <input
              type="text"
              className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] h-[46px] px-3 mt-2"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <label className="text-[#951418]">Commande min</label>
            <input
              type="text"
              className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] h-[46px] px-3 mt-2"
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-[#951418]">Frais de livraison</label>
            <input
              type="text"
              className="bg-[#ffe3ce] rounded-[15px] border border-[#c0a0a0] h-[46px] px-3 mt-2"
            />
          </div>
        </div>
      </div>

      {/* Bouton sauvegarder */}
      <button
        onClick={handleSave}
        className="w-[339px] h-[59px] bg-[#ff7d31] text-white rounded-[15px]"
      >
        Sauvegarder
      </button>

      {/* Informations sauvegardées */}
      <div className="bg-white w-full max-w-[628px] rounded-[15px] flex flex-col items-center p-4 space-y-2">
        <p className="text-[#951418] text-[20px]">Informations rapides</p>
        <p>Téléphone: {savedData.tel}</p>
        <p>Adresse: {savedData.adresse}</p>
        <div className="text-gray-500">
          {savedData.ouverture} - {savedData.fermeture}
        </div>
      </div>
    </div>
  );
}