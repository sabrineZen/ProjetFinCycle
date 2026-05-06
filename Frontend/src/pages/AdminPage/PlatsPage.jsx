import { useState, useEffect } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEye, FaTrash, FaBars } from "react-icons/fa";

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

  // URL de base du serveur pour les images
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

  // ── Supprimer un plat ──
  const supprimerPlat = async (id) => {
    if (!window.confirm("Supprimer ce plat définitivement ?")) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/plats/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Suppression échouée");
      setPlats((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
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

  // ── Fonction pour formater l'URL de l'image ──
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // Si l'image est déjà une URL complète (http...), on la garde
    if (imagePath.startsWith("http")) return imagePath;
    // Sinon, on nettoie le chemin (enlève "uploads/" si présent) et on ajoute l'adresse du serveur
    const fileName = imagePath.split(/[\\/]/).pop();
    return `${API_URL}/uploads/${fileName}`;
  };

  return (
    <div className="flex">
      {sidebarOuverte && (
        <div className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOuverte(false)} />
      )}

      <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 lg:translate-x-0 lg:w-56 ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"} w-56`}>
        <SidebarAdmin />
      </div>

      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">
        <div className="hidden lg:block mb-6">
          <h1 className="text-3xl font-bold text-secondary">Gestion des plats</h1>
          <p className="text-gray-400 mt-1">{plats.length} plat(s) trouvé(s)</p>
        </div>

        <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-sm border border-bordure mb-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Rechercher un plat..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="flex-1 border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button"
          />
          <div className="flex gap-2 sm:gap-3">
            <select value={restaurantFiltre} onChange={(e) => setRestaurantFiltre(e.target.value)} className="flex-1 border border-bordure rounded-xl px-3 py-2 text-secondary text-xs sm:text-sm">
              {restaurants.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select value={categorieFiltre} onChange={(e) => setCategorieFiltre(e.target.value)} className="flex-1 border border-bordure rounded-xl px-3 py-2 text-secondary text-xs sm:text-sm">
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {chargement && <p className="text-center py-20 text-gray-400">Chargement...</p>}
        {erreur && <p className="text-center py-20 text-red-500">{erreur}</p>}

        {!chargement && !erreur && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {platsFiltres.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-bordure overflow-hidden">
                <div className="relative h-36 lg:h-40 bg-gray-100 flex items-center justify-center">
                  {p.image ? (
                    <img 
                      src={getImageUrl(p.image)} 
                      alt={p.nom} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150?text=Erreur+Image";
                      }} 
                    />
                  ) : (
                    <span className="text-4xl">🍽️</span>
                  )}
                </div>

                <div className="p-3 lg:p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-bold text-secondary text-lg">{p.nom}</h2>
                      <p className="text-gray-400 text-xs italic">Resto: {p.restaurant || 'Restaurant inconnu'}</p>
                    </div>
                    {p.categorie && (
                      <span className="bg-[#FFE0C2] text-[#951418] px-2 py-1 rounded-lg text-[10px] font-bold uppercase">
                        {p.categorie}
                      </span>
                    )}
                  </div>

                  <p className="text-button font-bold mt-3 text-lg">{p.prix} DA</p>
                  
                  <div className="flex gap-2 mt-4 pt-3 border-t border-bordure">
                    <button onClick={() => { setPlatSelectionne(p); setModalOuvert(true); }} className="flex-1 bg-button text-white py-2 rounded-xl text-xs flex items-center justify-center gap-2">
                      <FaEye /> Voir
                    </button>
                    <button onClick={() => supprimerPlat(p.id)} className="bg-red-50 text-red-400 p-2 rounded-xl hover:bg-red-100">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal de détails */}
        {modalOuvert && platSelectionne && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setModalOuvert(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-secondary">{platSelectionne.nom}</h2>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                  {platSelectionne.categorie || 'Sans catégorie'}
                </span>
              </div>
              <p className="text-gray-500 mb-6 leading-relaxed">{platSelectionne.description || 'Pas de description.'}</p>
              <button onClick={() => setModalOuvert(false)} className="w-full bg-secondary text-white py-3 rounded-xl font-bold hover:bg-opacity-90">
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlatsPage;