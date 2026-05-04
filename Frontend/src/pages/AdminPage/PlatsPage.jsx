import { useState } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEye, FaTrash, FaTimes, FaUtensils, FaBars } from "react-icons/fa";

function PlatsPage() {
  const [modalOuvert, setModalOuvert] = useState(false);
  const [platSelectionne, setPlatSelectionne] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [restaurantFiltre, setRestaurantFiltre] = useState("Tous les restaurants");
  const [categorieFiltre, setCategorieFiltre] = useState("Toutes les catégories");
  const [sidebarOuverte, setSidebarOuverte] = useState(false);

  const plats = [
    { id: 1, nom: "Coq au Vin", restaurant: "Le petit Bistot", categorie: "Plat principal", description: "Poulet mijoté dans du vin rouge avec légumes et champignons", prix: 18.50, commandes: 124, disponible: true, image: null },
    { id: 2, nom: "Sushi Maki Mix", restaurant: "Chez wassim", categorie: "Sushi", description: "Assortiment de 12 makis variés avec sauce soja et wasabi", prix: 15.50, commandes: 234, disponible: true, image: null },
    { id: 3, nom: "Pizza Margherita", restaurant: "Pizza Roma", categorie: "Pizza", description: "Pizza traditionnelle avec mozzarella, tomates et basilic frais", prix: 20.50, commandes: 177, disponible: true, image: null },
    { id: 4, nom: "Coq au Vin", restaurant: "Le petit Bistot", categorie: "Plat principal", description: "Le coq est malade", prix: 18.50, commandes: 124, disponible: false, image: null },
  ];

  const platsFiltres = plats.filter((p) => {
    const matchRecherche = p.nom.toLowerCase().includes(recherche.toLowerCase());
    const matchRestaurant = restaurantFiltre === "Tous les restaurants" || p.restaurant === restaurantFiltre;
    const matchCategorie = categorieFiltre === "Toutes les catégories" || p.categorie === categorieFiltre;
    return matchRecherche && matchRestaurant && matchCategorie;
  });

  const ouvrirModal = (plat) => {
    setPlatSelectionne(plat);
    setModalOuvert(true);
  };

  return (
    <div className="flex">

      {/* ── Overlay mobile sidebar ── */}
      {sidebarOuverte && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOuverte(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <div className={`
        fixed top-0 left-0 h-full z-50 transition-transform duration-300
        lg:translate-x-0 lg:w-56
        ${sidebarOuverte ? "translate-x-0" : "-translate-x-full"}
        w-56
      `}>
        <SidebarAdmin />
      </div>

      {/* ── Topbar mobile/tablette ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-bordure flex items-center px-4 gap-3 z-30">
        <button onClick={() => setSidebarOuverte(true)} className="text-secondary p-1">
          <FaBars size={20} />
        </button>
        <h1 className="font-bold text-secondary flex-1">Gestion des plats</h1>
      </div>

      {/* ── Contenu principal ── */}
      <div className="
        w-full min-h-screen bg-fond p-4
        pt-20 lg:pt-8
        lg:ml-56 lg:p-8
      ">

        {/* En-tête desktop */}
        <div className="hidden lg:block mb-2">
          <h1 className="text-3xl font-bold text-secondary">Gestion des plats</h1>
          <p className="text-gray-400 mt-1">{plats.length} plat(s) trouvé(s)</p>
        </div>

        {/* Compteur mobile */}
        <p className="text-gray-400 text-sm mb-4 lg:hidden">{plats.length} plat(s) trouvé(s)</p>

        {/* Barre recherche + filtres */}
        <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-sm border border-bordure mb-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Rechercher un plat ..."
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
              <option>Tous les restaurants</option>
              <option>Le petit Bistot</option>
              <option>Chez wassim</option>
              <option>Pizza Roma</option>
            </select>
            <select
              value={categorieFiltre}
              onChange={(e) => setCategorieFiltre(e.target.value)}
              className="flex-1 border border-bordure rounded-xl px-3 py-2 text-secondary text-xs sm:text-sm outline-none focus:border-button"
            >
              <option>Toutes les catégories</option>
              <option>Plat principal</option>
              <option>Sushi</option>
              <option>Pizza</option>
            </select>
          </div>
        </div>

        {/* Grille plats : 1 col mobile / 2 cols tablette / 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {platsFiltres.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-bordure overflow-hidden">

              {/* Image */}
              <div className="relative h-36 lg:h-40 bg-gray-100">
                {!p.disponible && (
                  <div className="absolute inset-0 bg-gray-700 bg-opacity-60 flex items-center justify-center">
                    <span className="text-white font-bold text-base lg:text-lg">Indisponible</span>
                  </div>
                )}
                <div className="w-full h-full bg-accent flex items-center justify-center text-white text-4xl">🍽️</div>
              </div>

              {/* Contenu */}
              <div className="p-3 lg:p-4">
                <h2 className="font-bold text-secondary text-base lg:text-lg">{p.nom}</h2>
                <p className="text-gray-400 text-xs lg:text-sm">{p.restaurant}</p>
                <span className="inline-block bg-button text-white text-xs px-3 py-1 rounded-full mt-2">{p.categorie}</span>
                <p className="text-gray-400 text-xs lg:text-sm mt-2 line-clamp-2">{p.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-button font-bold text-base lg:text-lg">${p.prix}</p>
                  <p className="text-gray-400 text-xs lg:text-sm">{p.commandes} commandes</p>
                </div>

                {/* Boutons */}
                <div className="flex gap-2 lg:gap-3 mt-3 lg:mt-4">
                  <button
                    onClick={() => ouvrirModal(p)}
                    className="flex-1 bg-button text-white py-2 rounded-xl text-xs lg:text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-2"
                  >
                    <FaEye size={12} /> Voir
                  </button>
                  <button className="bg-secondary text-white p-2 rounded-xl hover:opacity-80 transition">
                    <FaTrash size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Voir */}
        {modalOuvert && platSelectionne && (
          <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">

              {/* Image grande */}
              <div className="h-40 lg:h-48 bg-accent flex items-center justify-center text-white text-6xl">🍽️</div>

              <div className="p-5 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-secondary">{platSelectionne.nom}</h2>
                <p className="text-gray-400 mb-3 text-sm">{platSelectionne.restaurant}</p>

                <div className="flex gap-2 mb-4 flex-wrap">
                  <span className="bg-secondary text-white text-xs px-3 py-1 rounded-full">{platSelectionne.categorie}</span>
                  <span className={`text-xs px-3 py-1 rounded-full ${platSelectionne.disponible ? "bg-orange-100 text-button" : "bg-gray-100 text-gray-400"}`}>
                    {platSelectionne.disponible ? "Disponible" : "Indisponible"}
                  </span>
                </div>

                <p className="text-button font-semibold mb-1 text-sm">Description</p>
                <p className="text-button text-sm mb-4">{platSelectionne.description}</p>

                <div className="flex gap-6 lg:gap-8">
                  <div>
                    <p className="text-secondary text-sm font-medium">$ Prix</p>
                    <p className="text-secondary font-bold text-lg lg:text-xl">${platSelectionne.prix}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-secondary text-sm">
                      <FaUtensils className="text-secondary" /> Commandes
                    </div>
                    <p className="text-secondary font-bold text-lg lg:text-xl">{platSelectionne.commandes}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-5 lg:mt-6">
                  <button
                    onClick={() => setModalOuvert(false)}
                    className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
                  >
                    <FaTimes /> Fermer
                  </button>
                  <button className="flex-1 bg-button text-white py-2 rounded-xl text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-2">
                    <FaTrash /> Supprimer
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