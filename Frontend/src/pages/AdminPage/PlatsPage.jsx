import { useState, useEffect } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEye, FaTrash, FaTimes, FaUtensils, FaBars, FaToggleOn, FaToggleOff } from "react-icons/fa";

function PlatsPage() {
  const [modalOuvert, setModalOuvert]           = useState(false);
  const [platSelectionne, setPlatSelectionne]   = useState(null);
  const [recherche, setRecherche]               = useState("");
  const [restaurantFiltre, setRestaurantFiltre] = useState("Tous les restaurants");
  const [categorieFiltre, setCategorieFiltre]   = useState("Toutes les catégories");
  const [sidebarOuverte, setSidebarOuverte]     = useState(false);
  const [plats, setPlats]                       = useState([]);
  const [chargement, setChargement]             = useState(true);
  const [erreur, setErreur]                     = useState(null);

  // ── Chargement ──
  useEffect(() => {
    const fetchPlats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/plats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Erreur lors du chargement des plats");
        const data = await res.json();
        setPlats(data);
      } catch (err) {
        setErreur(err.message);
      } finally {
        setChargement(false);
      }
    };
    fetchPlats();
  }, []);

  // ── Supprimer ──
  const supprimerPlat = async (id) => {
    if (!window.confirm("Supprimer ce plat définitivement ?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/plats/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Suppression échouée");
      setPlats((prev) => prev.filter((p) => p.id !== id));
      if (platSelectionne?.id === id) setModalOuvert(false);
    } catch (err) {
      alert(err.message);
    }
  };

  // ── Toggle disponibilité ──
  const toggleDisponibilite = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/plats/${id}/disponibilite`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Mise à jour échouée");
      const data = await res.json();

      setPlats((prev) =>
        prev.map((p) => p.id === id ? { ...p, disponible: data.disponible } : p)
      );
      if (platSelectionne?.id === id) {
        setPlatSelectionne((prev) => ({ ...prev, disponible: data.disponible }));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // ── Listes dynamiques pour les filtres ──
  const restaurants = ["Tous les restaurants", ...new Set(plats.map((p) => p.restaurant))];
  const categories  = ["Toutes les catégories", ...new Set(plats.map((p) => p.categorie))];

  // ── Filtrage ──
  const platsFiltres = plats.filter((p) => {
    const matchRecherche  = p.nom.toLowerCase().includes(recherche.toLowerCase());
    const matchRestaurant = restaurantFiltre === "Tous les restaurants" || p.restaurant === restaurantFiltre;
    const matchCategorie  = categorieFiltre === "Toutes les catégories" || p.categorie === categorieFiltre;
    return matchRecherche && matchRestaurant && matchCategorie;
  });

  const ouvrirModal = (plat) => {
    setPlatSelectionne({ ...plat });
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

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full z-50 transition-transform duration-300
        lg:translate-x-0 lg:w-56
        ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"}
        w-56
      `}>
        <SidebarAdmin />
      </div>

      {/* Topbar mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 gap-3 z-30">
        <button onClick={() => setSidebarOuverte(true)} className="text-secondary p-1">
          <FaBars size={20} />
        </button>
        <h1 className="font-bold text-secondary flex-1">Gestion des plats</h1>
      </div>

      {/* Contenu principal */}
      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">

        {/* En-tête desktop */}
        <div className="hidden lg:block mb-6">
          <h1 className="text-3xl font-bold text-secondary">Gestion des plats</h1>
          <p className="text-gray-400 mt-1">{plats.length} plat(s) trouvé(s)</p>
        </div>

        {/* Compteur mobile */}
        <p className="text-gray-400 text-sm mb-4 lg:hidden">{plats.length} plat(s) trouvé(s)</p>

        {/* Barre recherche + filtres */}
        <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-sm border border-bordure mb-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Rechercher un plat..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="flex-1 border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button"
          />
          <div className="flex gap-2 sm:gap-3">
            <select
              value={restaurantFiltre}
              onChange={(e) => setRestaurantFiltre(e.target.value)}
              className="flex-1 border border-bordure rounded-xl px-3 py-2 text-secondary text-xs sm:text-sm outline-none focus:border-button"
            >
              {restaurants.map((r) => <option key={r}>{r}</option>)}
            </select>
            <select
              value={categorieFiltre}
              onChange={(e) => setCategorieFiltre(e.target.value)}
              className="flex-1 border border-bordure rounded-xl px-3 py-2 text-secondary text-xs sm:text-sm outline-none focus:border-button"
            >
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Chargement */}
        {chargement && (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-sm">Chargement en cours...</p>
          </div>
        )}

        {/* Erreur */}
        {erreur && (
          <div className="flex items-center justify-center py-20">
            <p className="text-red-400 text-sm">{erreur}</p>
          </div>
        )}

        {/* Aucun résultat */}
        {!chargement && !erreur && platsFiltres.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-sm">Aucun plat trouvé.</p>
          </div>
        )}

        {/* Grille de plats */}
        {!chargement && !erreur && platsFiltres.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {platsFiltres.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-bordure overflow-hidden">

                {/* Image */}
                <div className="relative h-36 lg:h-40 bg-gray-100">
                  {!p.disponible && (
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-60 flex items-center justify-center z-10">
                      <span className="text-white font-bold text-base lg:text-lg">Indisponible</span>
                    </div>
                  )}
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.nom}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full bg-orange-50 items-center justify-center text-5xl"
                    style={{ display: p.image ? 'none' : 'flex' }}
                  >
                    🍽️
                  </div>
                </div>

                {/* Contenu carte */}
                <div className="p-3 lg:p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-bold text-secondary text-base lg:text-lg leading-tight">{p.nom}</h2>
                      <p className="text-gray-400 text-xs lg:text-sm">{p.restaurant}</p>
                    </div>
                    <span className="inline-block bg-button text-white text-xs px-3 py-1 rounded-full shrink-0">
                      {p.categorie}
                    </span>
                  </div>

                  <p className="text-gray-400 text-xs lg:text-sm mt-2 line-clamp-2">{p.description}</p>

                  <div className="flex justify-between items-center mt-3">
                    <p className="text-button font-bold text-base lg:text-lg">{parseFloat(p.prix).toFixed(2)} €</p>
                    <p className="text-gray-400 text-xs lg:text-sm">{p.commandes} commande(s)</p>
                  </div>

                  {/* Boutons */}
                  <div className="flex gap-2 lg:gap-3 mt-3 lg:mt-4">
                    <button
                      onClick={() => ouvrirModal(p)}
                      className="flex-1 bg-button text-white py-2 rounded-xl text-xs lg:text-sm font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
                    >
                      <FaEye size={12} /> Voir
                    </button>
                    <button
                      onClick={() => toggleDisponibilite(p.id)}
                      className="bg-gray-100 text-gray-500 p-2 rounded-xl hover:opacity-80 transition"
                      title={p.disponible ? "Rendre indisponible" : "Rendre disponible"}
                    >
                      {p.disponible
                        ? <FaToggleOn size={16} className="text-green-500" />
                        : <FaToggleOff size={16} className="text-gray-400" />
                      }
                    </button>
                    <button
                      onClick={() => supprimerPlat(p.id)}
                      className="bg-red-50 text-red-400 p-2 rounded-xl hover:opacity-80 transition"
                      title="Supprimer"
                    >
                      <FaTrash size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MODAL détails ── */}
        {modalOuvert && platSelectionne && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setModalOuvert(false); }}
          >
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">

              {/* Image modal */}
              <div className="relative h-40 lg:h-48 bg-orange-50">
                {platSelectionne.image ? (
                  <img
                    src={platSelectionne.image}
                    alt={platSelectionne.nom}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="w-full h-full items-center justify-center text-6xl"
                  style={{ display: platSelectionne.image ? 'none' : 'flex' }}
                >
                  🍽️
                </div>
              </div>

              <div className="p-5 lg:p-6">

                <h2 className="text-xl lg:text-2xl font-bold text-secondary">{platSelectionne.nom}</h2>
                <p className="text-gray-400 mb-3 text-sm">{platSelectionne.restaurant}</p>

                {/* Badges */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="bg-button text-white text-xs px-3 py-1 rounded-full">
                    {platSelectionne.categorie}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    platSelectionne.disponible
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-400"
                  }`}>
                    {platSelectionne.disponible ? "Disponible" : "Indisponible"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wide">Description</p>
                <p className="text-secondary text-sm mb-4">{platSelectionne.description}</p>

                {/* Stats */}
                <div className="flex gap-6 lg:gap-8 mb-5">
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Prix</p>
                    <p className="text-secondary font-bold text-lg lg:text-xl">
                      {parseFloat(platSelectionne.prix).toFixed(2)} €
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-1">
                      <FaUtensils size={10} /> Commandes
                    </div>
                    <p className="text-secondary font-bold text-lg lg:text-xl">
                      {platSelectionne.commandes}
                    </p>
                  </div>
                </div>

                {/* Actions modal */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setModalOuvert(false)}
                    className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <FaTimes size={12} /> Fermer
                  </button>
                  <button
                    onClick={() => toggleDisponibilite(platSelectionne.id)}
                    className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    {platSelectionne.disponible
                      ? <><FaToggleOff size={14} /> Désactiver</>
                      : <><FaToggleOn size={14} className="text-green-500" /> Activer</>
                    }
                  </button>
                  <button
                    onClick={() => supprimerPlat(platSelectionne.id)}
                    className="flex-1 bg-red-50 text-red-500 py-2 rounded-xl text-sm font-medium hover:opacity-80 transition flex items-center justify-center gap-2"
                  >
                    <FaTrash size={12} /> Supprimer
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