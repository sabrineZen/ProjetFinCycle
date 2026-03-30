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
    <div className="space-y-6">
      {/* Informations générales */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 bg-gray-200 rounded-full" />
          <h3 className="text-lg font-semibold">Informations générales</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nom de Restaurant</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={nom}
              onChange={e => setNom(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Catégorie</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Téléphone</label>
              <input
                type="tel"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={tel}
                onChange={e => setTel(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Adresse</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={adresse}
                onChange={e => setAdresse(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Horaires & Livraison */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h3 className="text-lg font-semibold">Horaires & livraison</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Heure d'ouverture</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={ouverture}
              onChange={e => setOuverture(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Heure de fermeture</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={fermeture}
              onChange={e => setFermeture(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Délai de livraison</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Commande min</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Frais de livraison</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      <button
        className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
        onClick={handleSave}
      >
        Sauvegarder
      </button>

      {/* Informations rapides */}
      {savedData.tel && (
        <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
          <h4 className="font-semibold text-gray-700">Informations rapides</h4>
          <p className="text-gray-600">Téléphone: {savedData.tel}</p>
          <p className="text-gray-600">Adresse: {savedData.adresse}</p>
          <p className="text-gray-600">
            Horaires: {savedData.ouverture} - {savedData.fermeture}
          </p>
        </div>
      )}
    </div>
  );
}