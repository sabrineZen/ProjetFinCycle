import { useState } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes, FaCheck, FaEye, FaBars } from "react-icons/fa";

function ValidationPage() {
  const [modalOuvert, setModalOuvert] = useState(false);
  const [restaurantSelectionne, setRestaurantSelectionne] = useState(null);
  const [sidebarOuverte, setSidebarOuverte] = useState(false); // ✅ ajouté

  const restaurants = [
    { id: 1, nom: "ghano food", pays: "francais", email: "ghano.younsi@gmail.com", tel: "+213 752556080", adresse: "ighzer amekran, akbou, bejaia", proprio: "ghano younsi", description: "Restaurant traditionnel kabyle proposer des plats autentiques avec des produits locaux", documents: ["Licence commerciale", "Certificat d'hygiene", "Assurance"], date: "12-03-2026" },
    { id: 2, nom: "Ahmed food", pays: "francais", email: "ahmed.yahiaoui@gmail.com", tel: "+213 552756050", adresse: "Feraoun, Amizoure, bejaia", proprio: "ahmed yahiaoui", description: "Restaurant traditionnel kabyle proposer des plats autentiques avec des produits locaux", documents: ["Licence commerciale", "Certificat d'hygiene", "Assurance"], date: "05-05-2026" },
  ];

  const ouvrirModal = (restaurant) => {
    setRestaurantSelectionne(restaurant);
    setModalOuvert(true);
  };

  return (
    <div className="flex">

      {/* Overlay mobile */}
      {sidebarOuverte && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOuverte(false)}
        />
      )}

      {/* Sidebar responsive */}
      <div className={`
        fixed top-0 left-0 h-full z-50 transition-transform duration-300
        lg:translate-x-0 lg:w-56
        ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"}
        w-56
      `}>
        <SidebarAdmin />
      </div>

      {/* Topbar mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 z-30">
        <button onClick={() => setSidebarOuverte(true)}>
          <FaBars className="text-secondary" />
        </button>
        <h1 className="ml-4 font-bold text-secondary">Validation</h1>
      </div>

      {/* Contenu */}
      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">

        {/* Desktop header */}
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-secondary">Validation en attente</h1>
          <p className="text-gray-400 mt-1 mb-8">4 restaurant(s) en attente de validation</p>
        </div>

        {/* Mobile compteur */}
        <p className="text-gray-400 mb-4 lg:hidden">
          4 restaurant(s) en attente
        </p>

        {/* ✅ Grille responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6">
          {restaurants.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">

              {/* Header carte */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-bold text-secondary">{r.nom}</h2>
                  <p className="text-gray-400 text-sm">{r.pays}</p>
                </div>
                <span className="bg-orange-100 text-button text-xs px-3 py-1 rounded-full">
                  en attente
                </span>
              </div>

              {/* Infos */}
              <div className="flex flex-col gap-2 my-4">
                <div className="flex items-center gap-2 text-secondary text-sm">
                  <FaEnvelope className="text-button" /> {r.email}
                </div>
                <div className="flex items-center gap-2 text-secondary text-sm">
                  <FaPhone className="text-button" /> {r.tel}
                </div>
                <div className="flex items-center gap-2 text-secondary text-sm">
                  <FaMapMarkerAlt className="text-button" /> {r.adresse}
                </div>
              </div>

              {/* Description */}
              <p className="text-button text-sm mb-3">{r.description}</p>

              {/* Documents */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Documents fournis:</p>
                <div className="flex gap-2 flex-wrap">
                  {r.documents.map((doc, i) => (
                    <span key={i} className="border border-bordure text-secondary text-xs px-3 py-1 rounded-full">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 mt-4">
                <button onClick={() => ouvrirModal(r)} className="flex-1 border border-button text-button py-2 rounded-xl text-sm font-medium hover:bg-orange-50 transition flex items-center justify-center gap-2">
                  <FaEye /> Détails
                </button>
                <button className="flex-1 bg-button text-white py-2 rounded-xl text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-2">
                  <FaCheck /> Approuver
                </button>
                <button className="bg-secondary text-white p-2 rounded-xl hover:opacity-80 transition">
                  <FaTimes />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal inchangé */}
        {modalOuvert && restaurantSelectionne && (
          <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-6 lg:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-xl">
              
              <h2 className="text-2xl font-bold text-secondary">{restaurantSelectionne.nom}</h2>
              <p className="text-button mb-4">{restaurantSelectionne.pays}</p>

              {/* contenu inchangé */}

              <div className="flex gap-3 mt-6">
                <button onClick={() => setModalOuvert(false)} className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                  ✕ Fermer
                </button>
                <button className="flex-1 bg-secondary text-white py-2 rounded-xl text-sm font-medium hover:opacity-80 transition flex items-center justify-center gap-2">
                  <FaTimes /> Rejeter
                </button>
                <button className="flex-1 bg-button text-white py-2 rounded-xl text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-2">
                  <FaCheck /> Approuver
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ValidationPage;