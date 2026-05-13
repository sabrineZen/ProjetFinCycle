import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SidebarAdmin from "../../composants/sidebarAdmin";
import {
  FaMapMarkerAlt, FaStar, FaUtensils,
  FaBan, FaTrash, FaCheckCircle, FaBars
} from "react-icons/fa";

function RestaurantsPage() {
  const [recherche, setRecherche]         = useState("");
  const [statusFiltre, setStatusFiltre]   = useState("Tous les status");
  const [sidebarOuverte, setSidebarOuverte] = useState(false);
  const [restaurants, setRestaurants]     = useState([]);
  const [chargement, setChargement]       = useState(true);
  const [erreur, setErreur]               = useState(null);
  const [suppressionId, setSuppressionId] = useState(null);
  const [searchParams] = useSearchParams();                          // ← ajoute ici
  const restaurantIdFocus = Number(searchParams.get('id'));          // ← et ici
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/utilisateurs/restaurateurs`);
        if (!res.ok) throw new Error("Erreur lors du chargement");
        const data = await res.json();
        setRestaurants(data);
      } catch (e) {
        setErreur(e.message);
      } finally {
        setChargement(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleSupprimer = async (id) => {
    const confirme = window.confirm("Voulez-vous vraiment supprimer ce restaurateur ?");
    if (!confirme) return;

    setSuppressionId(id);
    try {
      const res = await fetch(`/api/utilisateurs/restaurateurs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${res.status} - ${text}`);
      }
      // Retire le restaurant de la liste sans refetch
      setRestaurants(prev => prev.filter(r => r.id !== id));
    } catch (e) {
      alert("Erreur lors de la suppression : " + e.message);
    } finally {
      setSuppressionId(null);
    }
  };
  const restaurantsFiltres = restaurants.filter((r) => {
    const matchRecherche = r.nomRestaurant?.toLowerCase().includes(recherche.toLowerCase());
    const matchStatus =
      statusFiltre === "Tous les status" ||
      (statusFiltre === "Actif"    && r.statut === "approuve") ||
      (statusFiltre === "Suspendu" && r.statut === "refuse");
    return matchRecherche && matchStatus;
  });
  const handleChangerStatut = async (id, nouveauStatut) => {
  try {
    const res = await fetch(`/api/admin/utilisateurs/${id}/valider`, { // Vérifie que cette route correspond à ton adminRoutes.js
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: nouveauStatut }),
    });

    if (res.ok) {
      // Met à jour la liste localement sans recharger la page
      setRestaurants(prev => prev.map(r => r.id === id ? { ...r, statut: nouveauStatut } : r));
    } else {
      alert("Erreur lors de la modification");
    }
  } catch (e) {
    console.error("Erreur statut:", e);
  }
};

  return (
    <div className="flex">
      {sidebarOuverte && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOuverte(false)}
        />
      )}

      <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 lg:w-56 ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"} w-56`}>
        <SidebarAdmin />
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 z-30">
        <button onClick={() => setSidebarOuverte(true)}>
          <FaBars className="text-secondary" />
        </button>
        <h1 className="ml-4 font-bold text-secondary">Restaurants</h1>
      </div>

      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">

        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-secondary">Gestion des restaurants</h1>
          <p className="text-gray-400 mt-1 mb-8">{restaurants.length} restaurant(s) trouvé(s)</p>
        </div>

        <p className="text-gray-400 mb-4 lg:hidden">{restaurants.length} restaurants</p>

        {/* Filtres */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-bordure mb-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Recherche..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="flex-1 border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button"
          />
          <select
            value={statusFiltre}
            onChange={(e) => setStatusFiltre(e.target.value)}
            className="border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button"
          >
            <option>Tous les status</option>
            <option>Actif</option>
            <option>Suspendu</option>
          </select>
        </div>

        {/* États : chargement / erreur / liste */}
        {chargement && (
          <p className="text-gray-400 text-center mt-10">Chargement...</p>
        )}
        {erreur && (
          <p className="text-red-500 text-center mt-10">{erreur}</p>
        )}

        {!chargement && !erreur && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6">
            {restaurantsFiltres.length === 0 ? (
              <p className="text-gray-400 col-span-2 text-center mt-10">Aucun restaurant trouvé.</p>
            ) : (
              restaurantsFiltres.map((r) => {
                // Mapping statut BDD → label affiché
                const statutLabel = r.statut === "approuve" ? "Actif"
                                  : r.statut === "refuse"   ? "Suspendu"
                                  : "En attente";
                const estActif = r.statut === "approuve";

                return (
                  // APRÈS
                  <div
                    key={r.id}
                    className={`bg-white rounded-2xl p-6 shadow-sm border transition-all duration-500 ${
                      restaurantIdFocus === r.id
                        ? 'border-button bg-orange-50 shadow-md'   // ← surbrillance si venu du dashboard
                        : 'border-bordure'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h2 className="text-xl font-bold text-secondary">{r.nomRestaurant}</h2>
                        <p className="text-gray-400 text-sm">Par {r.nom} {r.prenom}</p>
                        <p className="text-gray-400 text-sm">{r.email}</p>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                        estActif ? "bg-orange-100 text-button" : "bg-gray-100 text-gray-500"
                      }`}>
                        {statutLabel}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center gap-2 text-secondary text-sm">
                        <FaMapMarkerAlt className="text-button" /> {r.adresseRestaurant || "—"}
                      </div>
                    </div>

                    <div className="flex gap-3">
                    {/* CAS 1 : ACTIF (approuve) -> Affiche bouton Suspendre */}
                    {r.statut === "approuve" && (
                      <button 
                        onClick={() => handleChangerStatut(r.id, "refuse")}
                        className="flex-1 bg-button text-white py-2 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-orange-400 transition-colors"
                      >
                        <FaBan /> Suspendre
                      </button>
                    )}

                    {/* CAS 2 : SUSPENDU (refuse) -> Affiche bouton Réactiver */}
                    {r.statut === "refuse" && (
                      <button 
                        onClick={() => handleChangerStatut(r.id, "approuve")}
                        className="flex-1 bg-[#FFF4EC] border border-bordure text-secondary py-2 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-[#fee8d8] transition-colors"
                      >
                        <FaCheckCircle className="text-[#951418]" /> Réactiver
                      </button>
                    )}

                    {/* CAS 3 : EN ATTENTE -> Affiche un texte ou rien */}
                    {r.statut === "en_attente" && (
                      <div className="flex-1 py-2 text-center text-sm text-gray-400 italic">
                        En attente de validation
                      </div>
                    )}

                    {/* Bouton Poubelle (toujours présent) */}
                    <button
                      onClick={() => handleSupprimer(r.id)}
                      disabled={suppressionId === r.id}
                      className={`bg-secondary text-white p-2 rounded-xl transition-opacity ${
                        suppressionId === r.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                      }`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantsPage;