import React, { useState } from "react";

function Compte() {
  const [activeTab, setActiveTab] = useState("Profil");

  const renderContent = () => {
    switch (activeTab) {
      case "Profil":
        return (
          <>
            <div className="bg-white text-[#951418] rounded-[15px] w-[697px] h-[366px]">
              <p className="text-[20px] ml-16 mt-8">Informations personnelles</p>
              <form className="flex gap-8 mt-10 px-4">
                <div className="flex flex-col gap-5">
                  <label>Prénom</label>
                  <input type="text" className="w-[313px] h-[44px] rounded-[15px] bg-[#ffe3ce] border border-[#c0a0a0] p-2" />

                  <label>Téléphone</label>
                  <input type="tel" className="w-[313px] h-[44px] rounded-[15px] bg-[#ffe3ce] border border-[#c0a0a0] p-2" />

                  <label>Ville</label>
                  <input type="text" className="w-[313px] h-[44px] rounded-[15px] bg-[#ffe3ce] border border-[#c0a0a0] p-2" />
                </div>

                <div className="flex flex-col gap-5">
                  <label>Nom</label>
                  <input type="text" className="w-[313px] h-[44px] rounded-[15px] bg-[#ffe3ce] border border-[#c0a0a0] p-2" />

                  <label>Email</label>
                  <input type="email" className="w-[313px] h-[44px] rounded-[15px] bg-[#ffe3ce] border border-[#c0a0a0] p-2" />

                  <label>RIB bancaire</label>
                  <input type="text" className="w-[313px] h-[44px] rounded-[15px] bg-[#ffe3ce] border border-[#c0a0a0] p-2" />
                </div>
              </form>
            </div>
            <button className="bg-[#ff7d31] text-white rounded-[15px] w-[185px] h-[53px] mt-5 ml-[512px]">
              Sauvegarder
            </button>
          </>
        );

      case "Sécurité":
        return (
          <>
            <div className="bg-white text-[#951418] rounded-[15px] w-[697px] h-[366px]">
              <p className="text-[20px] ml-16 mt-8">Changer le mot de passe</p>
              <form className="flex flex-col gap-5 mt-16 ml-8">
                <label>Mot de passe</label>
                <input type="text" className="w-[483px] h-[44px] rounded-[15px] bg-[#ffe3ce] border border-[#c0a0a0] p-2" />
                
                <label>Nouveau mot de passe</label>
                <input type="password" className="w-[483px] h-[44px] rounded-[15px] bg-[#ffe3ce] border border-[#c0a0a0] p-2" />
                
                <label>Confirmer le nouveau mot de passe</label>
                <input type="password" className="w-[483px] h-[44px] rounded-[15px] bg-[#ffe3ce] border border-[#c0a0a0] p-2" />
              </form>
            </div>

            <div className="bg-white rounded-[15px] w-[697px] h-[105px] mt-5 flex items-center justify-between px-8">
              <div className="text-[#951418]">
                <p className="text-[20px] mb-1">Authentification à deux facteurs</p>
                <p>Ajouter une couche de sécurité supplémentaire à votre compte</p>
              </div>
              <button className="bg-[#ff7d31] text-white w-[91px] h-[39px] rounded-[15px]">Activer</button>
            </div>

            <button className="bg-[#ff7d31] text-white rounded-[15px] w-[309px] h-[51px] mt-5 ml-[388px]">
              Sauvegarder les préférences
            </button>
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
    <div className="flex">
      {/* Profil latéral */}
      <div className="bg-white rounded-[15px] w-[218px] h-[340px] flex flex-col items-center justify-center space-y-2">
        <div className="relative w-[100px] h-[100px] rounded-[15px] bg-white">
          <div className="w-[87px] h-[87px] bg-[#ffe3ce] rounded-[15px] mx-auto mt-2"></div>
          <div className="w-[33px] h-[33px] bg-[#ff7d31] rounded-[10px] absolute right-0 top-2"></div>
        </div>

        <p className="text-[#951418] text-[20px]">Ghanou yns</p>
        <p className="text-gray-500 text-[13px]">younsighanou43@gmail.com</p>

        <div className="bg-[#ffe3ce] text-[#951418] w-[124px] h-[28px] rounded-[10px] flex justify-center items-center text-[13px] shadow-md">
          Compte vérifié
        </div>

        <div className="flex gap-8 text-[#951418] mt-2">
          <div className="flex flex-col items-center">
            <p>1</p>
            <span className="text-gray-500">restaurant</span>
          </div>
          <div className="flex flex-col items-center">
            <p>154</p>
            <span className="text-gray-500">commandes</span>
          </div>
        </div>
      </div>

      {/* Menu vertical */}
      <div className="bg-white rounded-[15px] w-[218px] h-[213px] text-[#951418] text-[20px] ml-4">
        <ul className="flex flex-col justify-center items-start h-full">
          {["Profil", "Sécurité", "Notification", "Abonnement"].map((item) => (
            <li
              key={item}
              className={`list-none m-4 px-4 py-2 rounded-[15px] cursor-pointer ${
                activeTab === item ? "bg-[#ff7d31] text-white" : ""
              }`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Contenu dynamique */}
      <div className="ml-4 mt-0">{renderContent()}</div>
    </div>
  );
}

export default Compte;