import { useState } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import {
  FaMapMarkerAlt, FaStar, FaUtensils,
  FaBan, FaTrash, FaCheckCircle, FaBars
} from "react-icons/fa";

function RestaurantsPage() {
  const [recherche, setRecherche] = useState("");
  const [categorieFiltre, setCategorieFiltre] = useState("Tous les catégories");
  const [statusFiltre, setStatusFiltre] = useState("Tous les status");
  const [sidebarOuverte, setSidebarOuverte] = useState(false); // ✅ ajouté

  const restaurants = [
    { id: 1, nom: "Le Petit Bistrot", langue: "Français", proprio: "ghanou", adresse: "123 Rue de la paix", note: 4.9, commandes: 342, plats: 45, revenus: "$32.450", status: "Actif" },
    { id: 2, nom: "Chez les berberes", langue: "Français", proprio: "Nordine KH.", adresse: "Toulouse", note: 4.5, commandes: 342, plats: 45, revenus: "$40.450", status: "Actif" },
  ];

  const restaurantsFiltres = restaurants.filter((r) => {
    const matchRecherche =
      r.nom.toLowerCase().includes(recherche.toLowerCase());
    const matchStatus =
      statusFiltre === "Tous les status" || r.status === statusFiltre;
    return matchRecherche && matchStatus;
  });

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
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 z-30">
        <button onClick={() => setSidebarOuverte(true)}>
          <FaBars className="text-secondary" />
        </button>
        <h1 className="ml-4 font-bold text-secondary">Restaurants</h1>
      </div>

      {/* Content */}
      <div className="w-full min-h-screen bg-fond p-4 pt-20 lg:pt-8 lg:ml-56 lg:p-8">

        {/* Header */}
        <div className="hidden lg:block">
          <h1 className="text-3xl font-bold text-secondary">
            Gestion des restaurants
          </h1>
          <p className="text-gray-400 mt-1 mb-8">
            {restaurants.length} restaurant trouvés(s)
          </p>
        </div>

        {/* Mobile subtitle */}
        <p className="text-gray-400 mb-4 lg:hidden">
          {restaurants.length} restaurants
        </p>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-bordure mb-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Recherche..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="flex-1 border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button"
          />

          <select
            value={categorieFiltre}
            onChange={(e) => setCategorieFiltre(e.target.value)}
            className="border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button"
          >
            <option>Tous les catégories</option>
            <option>Français</option>
            <option>Japonais</option>
            <option>Italien</option>
          </select>

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

        {/* GRID RESPONSIVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6">

          {restaurantsFiltres.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-6 shadow-sm border border-bordure">

              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-xl font-bold text-secondary">{r.nom}</h2>
                  <p className="text-gray-400 text-sm">{r.langue}</p>
                  <p className="text-gray-400 text-sm">Par {r.proprio}</p>
                </div>

                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  r.status === "Actif"
                    ? "bg-orange-100 text-button"
                    : "bg-orange-200 text-orange-600"
                }`}>
                  {r.status}
                </span>
              </div>

              {/* Infos */}
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-2 text-secondary text-sm">
                  <FaMapMarkerAlt className="text-button" /> {r.adresse}
                </div>
                <div className="flex items-center gap-2 text-secondary text-sm">
                  <FaStar className="text-button" /> {r.note} • {r.commandes}
                </div>
                <div className="flex items-center gap-2 text-secondary text-sm">
                  <FaUtensils className="text-button" /> {r.plats}
                </div>
              </div>

              {/* Revenus */}
              <div className="mb-4">
                <p className="text-gray-400 text-sm">Revenus totaux</p>
                <p className="text-button text-xl font-bold">{r.revenus}</p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                {r.status === "Actif" ? (
                  <button className="flex-1 bg-button text-white py-2 rounded-xl text-sm flex items-center justify-center gap-2">
                    <FaBan /> Suspendre
                  </button>
                ) : (
                  <button className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-sm flex items-center justify-center gap-2">
                    <FaCheckCircle /> Réactiver
                  </button>
                )}

                <button className="bg-secondary text-white p-2 rounded-xl">
                  <FaTrash />
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default RestaurantsPage;