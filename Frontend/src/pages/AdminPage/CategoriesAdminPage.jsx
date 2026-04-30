import { useState } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEdit, FaTrash, FaPlus, FaCamera, FaTimes } from "react-icons/fa";

function CategoriesAdminPage() {
  const [modalOuvert, setModalOuvert] = useState(false);
  const [categorieEnModification, setCategorieEnModification] = useState(null);

  const couleurs = ["#FCCEC1", "#FF8238", "#FFD700", "#FFF9F5", "#FFB391", "#8B2A1B", "#C76366"];

  const [categories, setCategories] = useState([
    { id: 1, nom: "Français", description: "Cuisine française traditionnelle gastronomique", restaurants: 23, plats: 345, couleur: "#FCCEC1" },
    { id: 2, nom: "Italien", description: "Pizza,pates et spécialités italiennes", restaurants: 23, plats: 345, couleur: "#FFD700" },
    { id: 3, nom: "Japonais", description: "Sushi,sashimi et cuisine japonaise", restaurants: 23, plats: 345, couleur: "#FF8238" },
    { id: 4, nom: "Fast-food", description: "Burgers,frites et restauration rapide", restaurants: 23, plats: 345, couleur: "#FFF9F5" },
    { id: 5, nom: "Asiatique", description: "Cuisine chinoise,thai et autres spécialités asiatiques", restaurants: 23, plats: 345, couleur: "#FCCEC1" },
    { id: 6, nom: "Mexicain", description: "Tacos,burritos et cuisine mexicaine", restaurants: 23, plats: 345, couleur: "#FF8238" },
  ]);

  const [nouvelleCategorie, setNouvelleCategorie] = useState({ nom: "", description: "", couleur: "#FCCEC1" });

  const ajouterCategorie = () => {
    if (nouvelleCategorie.nom.trim()) {
      setCategories([...categories, { ...nouvelleCategorie, id: Date.now(), restaurants: 0, plats: 0 }]);
      setNouvelleCategorie({ nom: "", description: "", couleur: "#FCCEC1" });
      setModalOuvert(false);
    }
  };

  const sauvegarderModification = (id) => {
    setCategorieEnModification(null);
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="ml-56 p-8 w-full min-h-screen bg-fond">

        {/* Titre + bouton ajouter */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-3xl font-bold text-secondary">Gestion des catégoriés</h1>
            <p className="text-gray-400 mt-1">{categories.length} catégorié(s)</p>
          </div>
          <button onClick={() => setModalOuvert(true)}
            className="bg-button text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-valider transition flex items-center gap-2">
            <FaPlus /> Ajouter une catégorie
          </button>
        </div>

        {/* Grille catégories */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-bordure overflow-hidden">

              {/* Image colorée */}
              <div className="h-32 flex items-center justify-center" style={{ backgroundColor: cat.couleur }}>
                <div className="w-20 h-20 rounded-full bg-white bg-opacity-40 flex items-center justify-center text-4xl">🍽️</div>
              </div>

              <div className="p-4">
                {/* Mode modification */}
                {categorieEnModification === cat.id ? (
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-button text-sm mb-1">Nom de la catégorie</p>
                      <input type="text" defaultValue={cat.nom}
                        className="w-full border border-bordure rounded-xl px-3 py-2 text-secondary text-sm outline-none focus:border-button" />
                    </div>
                    <div>
                      <p className="text-button text-sm mb-1">Description</p>
                      <textarea defaultValue={cat.description}
                        className="w-full border border-bordure rounded-xl px-3 py-2 text-secondary text-sm outline-none focus:border-button h-16 resize-none" />
                    </div>
                    <div>
                      <p className="text-button text-sm mb-2">Couleur</p>
                      <div className="flex gap-2 flex-wrap">
                        {couleurs.map((c) => (
                          <div key={c} className="w-8 h-8 rounded-lg cursor-pointer border-2 border-transparent hover:border-button"
                            style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => sauvegarderModification(cat.id)}
                        className="flex-1 bg-button text-white py-2 rounded-xl text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-1">
                        Sauvegarder
                      </button>
                      <button onClick={() => setCategorieEnModification(null)}
                        className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-1">
                        <FaTimes /> Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Mode affichage */
                  <div>
                    <h2 className="font-bold text-secondary text-lg">{cat.nom}</h2>
                    <p className="text-gray-400 text-sm mt-1">{cat.description}</p>
                    <div className="flex gap-3 mt-3">
                      <div className="flex-1 border border-bordure rounded-xl p-2 text-center">
                        <p className="text-gray-400 text-xs">Restaurant</p>
                        <p className="font-bold text-secondary">{cat.restaurants}</p>
                      </div>
                      <div className="flex-1 border border-bordure rounded-xl p-2 text-center">
                        <p className="text-gray-400 text-xs">Plats</p>
                        <p className="font-bold text-secondary">{cat.plats}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => setCategorieEnModification(cat.id)}
                        className="flex-1 bg-button text-white py-2 rounded-xl text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-2">
                        <FaEdit /> Modifier
                      </button>
                      <button className="bg-secondary text-white p-2 rounded-xl hover:opacity-80 transition">
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal Nouvelle catégorie */}
        {modalOuvert && (
          <div className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-[550px] shadow-xl">
              <h2 className="text-2xl font-bold text-secondary mb-6">Nouvelle catégorie</h2>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-secondary text-sm font-medium">Nom de la categories*</label>
                  <input type="text" value={nouvelleCategorie.nom}
                    onChange={(e) => setNouvelleCategorie({...nouvelleCategorie, nom: e.target.value})}
                    className="w-full border border-bordure rounded-xl px-4 py-3 mt-1 text-secondary text-sm outline-none focus:border-button bg-fond" />
                </div>
                <div>
                  <label className="text-secondary text-sm font-medium">Description</label>
                  <textarea value={nouvelleCategorie.description}
                    onChange={(e) => setNouvelleCategorie({...nouvelleCategorie, description: e.target.value})}
                    className="w-full border border-bordure rounded-xl px-4 py-3 mt-1 text-secondary text-sm outline-none focus:border-button bg-fond h-24 resize-none" />
                </div>
                <div>
                  <label className="text-secondary text-sm font-medium">Couleur</label>
                  <div className="flex gap-3 mt-2 items-center">
                    {couleurs.map((c) => (
                      <div key={c} onClick={() => setNouvelleCategorie({...nouvelleCategorie, couleur: c})}
                        className={`w-10 h-10 rounded-xl cursor-pointer border-2 ${nouvelleCategorie.couleur === c ? "border-button" : "border-transparent"}`}
                        style={{ backgroundColor: c }} />
                    ))}
                    <button className="ml-auto bg-button text-white p-2 rounded-xl">
                      <FaCamera />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setModalOuvert(false)}
                  className="flex-1 bg-secondary text-white py-3 rounded-xl text-sm font-medium hover:opacity-80 transition flex items-center justify-center gap-2">
                  <FaTimes /> Annuler
                </button>
                <button onClick={ajouterCategorie}
                  className="flex-1 bg-button text-white py-3 rounded-xl text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-2">
                  <FaPlus /> Ajouter
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default CategoriesAdminPage;