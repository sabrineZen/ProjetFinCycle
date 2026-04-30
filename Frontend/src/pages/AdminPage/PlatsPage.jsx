import { useState } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEye, FaTrash, FaTimes, FaCheck, FaUtensils } from "react-icons/fa";

function PlatsPage() {
  const [modalOuvert, setModalOuvert] = useState(false);
  const [platSelectionne, setPlatSelectionne] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [restaurantFiltre, setRestaurantFiltre] = useState("Tous les restaurants");
  const [categorieFiltre, setCategorieFiltre] = useState("Toutes les catégories");

  const plats = [
    { id: 1, nom: "Coq au Vin", restaurant: "Le petit Bistot", categorie: "Plat principal", description: "Poulet mijoté dans du vin rouge avec légumes et champignons", prix: 18.50, commandes: 124, disponible: true, image: null },
    { id: 2, nom: "Sushi Maki Mix", restaurant: "Chez wassim", categorie: "Sushil", description: "Assortiment de 12 makis variés avec sauce soja et wasabi", prix: 15.50, commandes: 234, disponible: true, image: null },
    { id: 3, nom: "Pizza Margherita", restaurant: "Pizza Roma", categorie: "Pizza", description: "Pizzza tradionnelle avec mozzarella, tomates et basilic frais", prix: 20.50, commandes: 177, disponible: true, image: null },
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
      <SidebarAdmin />
      <div className="ml-56 p-8 w-full min-h-screen bg-fond">

        {/* Titre */}
        <h1 className="text-3xl font-bold text-secondary">Gestion des plats</h1>
        <p className="text-gray-400 mt-1 mb-8">{plats.length} plat(s) trouvé(s)</p>

        {/* Barre recherche + filtres */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-bordure mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Rechercher un plat ..."
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            className="flex-1 border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button"
          />
          <select value={restaurantFiltre} onChange={(e) => setRestaurantFiltre(e.target.value)}
            className="border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button">
            <option>Tous les restaurants</option>
            <option>Le petit Bistot</option>
            <option>Chez wassim</option>
            <option>Pizza Roma</option>
          </select>
          <select value={categorieFiltre} onChange={(e) => setCategorieFiltre(e.target.value)}
            className="border border-bordure rounded-xl px-4 py-2 text-secondary text-sm outline-none focus:border-button">
            <option>Toutes les catégories</option>
            <option>Plat principal</option>
            <option>Sushil</option>
            <option>Pizza</option>
          </select>
        </div>

        {/* Grille plats */}
        <div className="grid grid-cols-3 gap-6">
          {platsFiltres.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-bordure overflow-hidden">

              {/* Image */}
              <div className="relative h-40 bg-gray-100">
                {!p.disponible && (
                  <div className="absolute inset-0 bg-gray-700 bg-opacity-60 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Indisponible</span>
                  </div>
                )}
                <div className="w-full h-full bg-accent flex items-center justify-center text-white text-4xl">🍽️</div>
              </div>

              {/* Contenu */}
              <div className="p-4">
                <h2 className="font-bold text-secondary text-lg">{p.nom}</h2>
                <p className="text-gray-400 text-sm">{p.restaurant}</p>
                <span className="inline-block bg-button text-white text-xs px-3 py-1 rounded-full mt-2">{p.categorie}</span>
                <p className="text-gray-400 text-sm mt-2">{p.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-button font-bold text-lg">${p.prix}</p>
                  <p className="text-gray-400 text-sm">{p.commandes} commandes</p>
                </div>

                {/* Boutons */}
                <div className="flex gap-3 mt-4">
                  <button onClick={() => ouvrirModal(p)}
                    className="flex-1 bg-button text-white py-2 rounded-xl text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-2">
                    <FaEye /> Voir
                  </button>
                  <button className="bg-secondary text-white p-2 rounded-xl hover:opacity-80 transition">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Voir */}
        {modalOuvert && platSelectionne && (
          <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-[600px] shadow-xl overflow-hidden">

              {/* Image grande */}
              <div className="h-48 bg-accent flex items-center justify-center text-white text-6xl">🍽️</div>

              <div className="p-6">
                <h2 className="text-2xl font-bold text-secondary">{platSelectionne.nom}</h2>
                <p className="text-gray-400 mb-3">{platSelectionne.restaurant}</p>

                <div className="flex gap-2 mb-4">
                  <span className="bg-secondary text-white text-xs px-3 py-1 rounded-full">{platSelectionne.categorie}</span>
                  <span className={`text-xs px-3 py-1 rounded-full ${platSelectionne.disponible ? "bg-orange-100 text-button" : "bg-gray-100 text-gray-400"}`}>
                    {platSelectionne.disponible ? "Disponible" : "Indisponible"}
                  </span>
                </div>

                <p className="text-button font-semibold mb-1">Description</p>
                <p className="text-button text-sm mb-4">{platSelectionne.description}</p>

                <div className="flex gap-8">
                  <div>
                    <p className="text-secondary text-sm font-medium">$ Prix</p>
                    <p className="text-secondary font-bold text-xl">${platSelectionne.prix}</p>
                  </div>

                  <div>
                   <div className="flex items-center gap-2 text-secondary text-sm">
                     <FaUtensils className="text-secondary" /> Commandes
                   </div>

                    <p className="text-secondary font-bold text-xl">{platSelectionne.commandes}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setModalOuvert(false)}
                    className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
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