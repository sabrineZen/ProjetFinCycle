import { useState, useEffect } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTimes, FaCheck, FaEye, FaBars, FaFilePdf } from "react-icons/fa";
import axios from "axios";

function ValidationPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [modalOuvert, setModalOuvert] = useState(false);
  const [restaurantSelectionne, setRestaurantSelectionne] = useState(null);
  const [sidebarOuverte, setSidebarOuverte] = useState(false);
  const [chargement, setChargement] = useState(true);

  // 1. Charger les restaurants depuis le backend
  const fetchRestaurants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/utilisateurs");
      // On ne garde que les restaurateurs en attente
      const enAttente = res.data.filter(u => u.role === 'restaurateur' && u.statut === 'en_attente');
      setRestaurants(enAttente);
      setChargement(false);
    } catch (err) {
      console.error("Erreur chargement:", err);
      setChargement(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // 2. Fonction pour Approuver ou Refuser
  const handleValidation = async (id, action) => {
    const confirmation = window.confirm(`Voulez-vous vraiment ${action === 'approuve' ? 'approuver' : 'refuser'} ce restaurant ?`);
    if (!confirmation) return;

    try {
      await axios.put(`http://localhost:5000/api/admin/utilisateurs/${id}/valider`, { action });
      alert(`Opération réussie : ${action}`);
      setModalOuvert(false);
      fetchRestaurants(); // Rafraîchir la liste
    } catch (err) {
      alert("Erreur lors de la validation");
    }
  };

  const ouvrirModal = (restaurant) => {
    setRestaurantSelectionne(restaurant);
    setModalOuvert(true);
  };

  return (
    <div className="flex">
      {/* Overlay mobile */}
      {sidebarOuverte && (
        <div className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOuverte(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 lg:w-56 ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"} w-56`}>
        <SidebarAdmin />
      </div>

      {/* Topbar mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 z-30">
        <button onClick={() => setSidebarOuverte(true)}><FaBars className="text-secondary" /></button>
        <h1 className="ml-4 font-bold text-secondary">Validation</h1>
      </div>

      {/* Contenu */}
      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-secondary">Validation en attente</h1>
          <p className="text-gray-400 mt-1 mb-8">{restaurants.length} restaurant(s) à vérifier</p>
        </div>

        {chargement ? (
          <p>Chargement des demandes...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6">
            {restaurants.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-bold text-secondary">{r.nom}</h2>
                    <p className="text-gray-400 text-sm">Restaurateur Professionnel</p>
                  </div>
                  <span className="bg-orange-100 text-button text-xs px-3 py-1 rounded-full">en attente</span>
                </div>

                <div className="flex flex-col gap-2 my-4">
                  <div className="flex items-center gap-2 text-secondary text-sm"><FaEnvelope className="text-button" /> {r.email}</div>
                  <div className="flex items-center gap-2 text-secondary text-sm"><FaPhone className="text-button" /> {r.telephone}</div>
                  <div className="flex items-center gap-2 text-secondary text-sm"><FaMapMarkerAlt className="text-button" /> {r.adresseRestaurant}</div>
                </div>

                {/* Lien vers le document réel stocké sur le serveur */}
                <div className="mb-4">
                  <p className="text-gray-400 text-sm mb-2">Document officiel :</p>
                  <a 
                    href={`http://localhost:5000/uploads/${r.documentOfficiel}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
                  >
                    <FaFilePdf /> Consulter le Registre de Commerce
                  </a>
                </div>

                <div className="flex gap-3 mt-4">
                  <button onClick={() => ouvrirModal(r)} className="flex-1 border border-button text-button py-2 rounded-xl text-sm font-medium hover:bg-orange-50 transition flex items-center justify-center gap-2">
                    <FaEye /> Détails
                  </button>
                  <button onClick={() => handleValidation(r.id, 'approuve')} className="flex-1 bg-button text-white py-2 rounded-xl text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-2">
                    <FaCheck /> Approuver
                  </button>
                  <button onClick={() => handleValidation(r.id, 'refuse')} className="bg-secondary text-white p-2 rounded-xl hover:opacity-80 transition">
                    <FaTimes />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de détails */}
        {modalOuvert && restaurantSelectionne && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-10 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-6 lg:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <h2 className="text-2xl font-bold text-secondary">{restaurantSelectionne.nom}</h2>
              <div className="mt-4 space-y-3">
                <p><strong>Propriétaire :</strong> {restaurantSelectionne.nom} {restaurantSelectionne.prenom}</p>
                <p><strong>Email :</strong> {restaurantSelectionne.email}</p>
                <p><strong>Téléphone :</strong> {restaurantSelectionne.telephone}</p>
                <p><strong>Adresse :</strong> {restaurantSelectionne.adresseRestaurant}</p>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setModalOuvert(false)} className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-sm font-medium">✕ Fermer</button>
                <button onClick={() => handleValidation(restaurantSelectionne.id, 'refuse')} className="flex-1 bg-secondary text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                  <FaTimes /> Rejeter
                </button>
                <button onClick={() => handleValidation(restaurantSelectionne.id, 'approuve')} className="flex-1 bg-button text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
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