import { useState, useEffect } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEye, FaTrash, FaBars, FaUtensils, FaTimes, FaToggleOn, FaToggleOff } from "react-icons/fa";

function PlatsPage() {
  const [modalOuvert, setModalOuvert] = useState(false);
  const [platSelectionne, setPlatSelectionne] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [restaurantFiltre, setRestaurantFiltre] = useState("Tous les restaurants");
  const [categorieFiltre, setCategorieFiltre] = useState("Toutes les catégories");
  const [sidebarOuverte, setSidebarOuverte] = useState(false);
  const [plats, setPlats] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  const API_URL = "http://localhost:5000";

  // ── Chargement des données ──
  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const res = await fetch(`${API_URL}/api/admin/plats`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors du chargement des plats");
        const data = await res.json();
        setPlats(Array.isArray(data) ? data : []);
      } catch (err) {
        setErreur(err.message);
      } finally {
        setChargement(false);
      }
    };
    fetchPlats();
  }, []);

  // ── Actions ──
  const supprimerPlat = async (id) => {
    if (!window.confirm("Supprimer ce plat définitivement ?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/plats/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Suppression échouée");
      setPlats((prev) => prev.filter((p) => p.id !== id));
      setModalOuvert(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const ouvrirModal = (plat) => {
    console.log('description:', plat.description );
    setPlatSelectionne(plat);
    setModalOuvert(true);
  };

  // ── Formater l'URL de l'image ──
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    const fileName = imagePath.split(/[\\/]/).pop();
    return `${API_URL}/uploads/${fileName}`;
  };

  // ── Listes pour filtres ──
  const restaurants = ["Tous les restaurants", ...new Set(plats.map((p) => p.restaurant || "Inconnu"))];
  const categories = ["Toutes les catégories", ...new Set(plats.map((p) => p.categorie || "N/A"))];

  // ── Filtrage ──
  const platsFiltres = plats.filter((p) => {
    const nomPlat = p.nom ? p.nom.toLowerCase() : "";
    const matchRecherche = nomPlat.includes(recherche.toLowerCase());
    const matchRestaurant = restaurantFiltre === "Tous les restaurants" || p.restaurant === restaurantFiltre;
    const matchCategorie = categorieFiltre === "Toutes les catégories" || p.categorie === categorieFiltre;
    return matchRecherche && matchRestaurant && matchCategorie;
  });

  return (
    <div className="flex">
      {/* Overlay Mobile */}
      {sidebarOuverte && (
        <div className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOuverte(false)} />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 lg:w-56 ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"} w-56`}>
        <SidebarAdmin />
      </div>

      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary">Gestion des plats</h1>
            <p className="text-gray-400 mt-1">{platsFiltres.length} plat(s) trouvé(s)</p>
          </div>
          <button className="lg:hidden text-2xl" onClick={() => setSidebarOuverte(true)}>
            <FaBars />
          </button>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6 flex flex-col sm:row gap-3">
          <input
            type="text"
            placeholder="Rechercher un plat..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 outline-none focus:border-orange-500"
          />
          <div className="flex gap-2">
            <select value={restaurantFiltre} onChange={(e) => setRestaurantFiltre(e.target.value)} className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm">
              {restaurants.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={categorieFiltre} onChange={(e) => setCategorieFiltre(e.target.value)} className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {chargement && <p className="text-center py-20 text-gray-400">Chargement des plats...</p>}
        {erreur && <p className="text-center py-20 text-red-500">{erreur}</p>}

        {/* Grille de Plats */}
        {!chargement && !erreur && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {platsFiltres.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div className="relative h-40 bg-gray-100">
                  {p.image ? (
                    <img src={getImageUrl(p.image)} alt={p.nom} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-bold text-secondary text-lg">{p.nom}</h2>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-[10px] font-bold uppercase">
                      {p.categorie || 'N/A'}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs mb-3 italic">{p.description || 'Restaurant inconnu'}</p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <p className="text-orange-600 font-bold text-xl">{p.prix} DA</p>
                    <div className="flex gap-2">
                      <button onClick={() => ouvrirModal(p)} className="p-2 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-100">
                        <FaEye />
                      </button>
                      <button onClick={() => supprimerPlat(p.id)} className="p-2 bg-red-50 text-red-400 rounded-xl hover:bg-red-100">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de Détails */}
        {modalOuvert && platSelectionne && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={() => setModalOuvert(false)}>
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative h-48 bg-gray-200">
                {platSelectionne.image ? (
                  <img src={getImageUrl(platSelectionne.image)} alt={platSelectionne.nom} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">🍽️</div>
                )}
                <button onClick={() => setModalOuvert(false)} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white">
                  <FaTimes />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-secondary">{platSelectionne.nom}</h2>
                  <p className="text-orange-600 font-bold text-2xl">{platSelectionne.prix} DA</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Restaurant</p>
                    <p className="text-secondary">{platSelectionne.restaurant}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Description</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {platSelectionne.description || "Aucune description disponible pour ce plat."}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button onClick={() => setModalOuvert(false)} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-secondary hover:bg-gray-50">
                    Fermer
                  </button>
                  <button onClick={() => supprimerPlat(platSelectionne.id)} className="px-5 py-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlatsPage;