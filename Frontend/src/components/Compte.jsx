import React, { useState } from "react";

function Compte() {
  const [activeTab, setActiveTab] = useState("Profil");

  const renderContent = () => {
    switch (activeTab) {
      case "Profil":
        return (
          <>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-4">Informations personnelles</p>
              <form className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Prénom</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Téléphone</label>
                    <input type="tel" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Ville</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Nom</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">Email</label>
                    <input type="email" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium">RIB bancaire</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                  </div>
                </div>
              </form>
            </div>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Sauvegarder</button>
          </>
        );

      case "Sécurité":
        return (
          <>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-4">Changer le mot de passe</p>
              <form className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Mot de passe</label>
                  <input type="password" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Nouveau mot de passe</label>
                  <input type="password" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Confirmer le nouveau mot de passe</label>
                  <input type="password" className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
                </div>
              </form>
            </div>

            <div className="mb-6 p-4 border border-gray-200 rounded-lg flex flex-col md:flex-row justify-between items-center">
              <div>
                <p className="font-semibold">Authentification à deux facteurs</p>
                <p className="text-sm text-gray-600">Ajouter une couche de sécurité supplémentaire à votre compte</p>
              </div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition mt-2 md:mt-0">Activer</button>
            </div>

            <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">Sauvegarder les préférences</button>
          </>
        );

      case "Notification":
        return <p>Notifications</p>;

      case "Abonnement":
        return <h2>Abonnement</h2>;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 min-h-screen">
      {/* PROFIL */}
      <div className="md:w-1/4 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
          <p className="font-semibold text-lg">Ghanou Yns</p>
          <p className="text-sm text-gray-500">younsighanou43@gmail.com</p>
          <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Compte vérifié</div>
        </div>

        <div className="flex justify-around mt-4">
          <div className="text-center">
            <p className="font-bold text-xl">1</p>
            <span className="text-gray-500 text-sm">restaurant</span>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">154</p>
            <span className="text-gray-500 text-sm">commandes</span>
          </div>
        </div>
      </div>

      {/* MENU + CONTENU */}
      <div className="md:w-3/4">
        <ul className="flex space-x-4 mb-6 border-b border-gray-200">
          {["Profil", "Sécurité", "Notification", "Abonnement"].map(item => (
            <li
              key={item}
              className={`pb-2 cursor-pointer ${activeTab === item ? "border-b-2 border-orange-500 font-semibold" : "text-gray-500"}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>

        <div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Compte;