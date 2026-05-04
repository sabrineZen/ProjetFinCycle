import { useState } from "react";
import SidebarAdmin from "../../composants/sidebarAdmin";
import { FaEdit, FaTrash, FaPlus, FaCamera, FaTimes, FaBars } from "react-icons/fa";

function CategoriesAdminPage() {
  const [modalOuvert, setModalOuvert] = useState(false);
  const [categorieEnModification, setCategorieEnModification] = useState(null);
  const [sidebarOuverte, setSidebarOuverte] = useState(false);

  const couleurs = ["#FCCEC1", "#FF8238", "#FFD700", "#FFF9F5", "#FFB391", "#8B2A1B", "#C76366"];

  const [categories, setCategories] = useState([
    { id: 1, nom: "Français", description: "Cuisine française traditionnelle gastronomique", restaurants: 23, plats: 345, couleur: "#FCCEC1" },
    { id: 2, nom: "Italien", description: "Pizza, pâtes et spécialités italiennes", restaurants: 23, plats: 345, couleur: "#FFD700" },
    { id: 3, nom: "Japonais", description: "Sushi, sashimi et cuisine japonaise", restaurants: 23, plats: 345, couleur: "#FF8238" },
    { id: 4, nom: "Fast-food", description: "Burgers, frites et restauration rapide", restaurants: 23, plats: 345, couleur: "#FFF9F5" },
    { id: 5, nom: "Asiatique", description: "Cuisine chinoise, thaï et spécialités asiatiques", restaurants: 23, plats: 345, couleur: "#FCCEC1" },
    { id: 6, nom: "Mexicain", description: "Tacos, burritos et cuisine mexicaine", restaurants: 23, plats: 345, couleur: "#FF8238" },
  ]);

  const [nouvelleCategorie, setNouvelleCategorie] = useState({ nom: "", description: "", couleur: "#FCCEC1" });

  const ajouterCategorie = () => {
    if (nouvelleCategorie.nom.trim()) {
      setCategories([...categories, { ...nouvelleCategorie, id: Date.now(), restaurants: 0, plats: 0 }]);
      setNouvelleCategorie({ nom: "", description: "", couleur: "#FCCEC1" });
      setModalOuvert(false);
    }
  };

  const sauvegarderModification = () => setCategorieEnModification(null);

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
        <h1 className="font-bold text-secondary flex-1">Catégories</h1>
        <button
          onClick={() => setModalOuvert(true)}
          className="bg-button text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1"
        >
          <FaPlus size={10} /> Ajouter
        </button>
      </div>

      {/* ── Contenu principal ── */}
      <div className="
        w-full min-h-screen bg-fond p-4
        pt-20 lg:pt-8
        lg:ml-56 lg:p-8
      ">

        {/* En-tête */}
        <div className="flex justify-between items-start mb-2 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-secondary">Gestion des catégories</h1>
            <p className="text-gray-400 mt-1 text-sm">{categories.length} catégorie(s)</p>
          </div>
          {/* Bouton visible seulement desktop */}
          <button
            onClick={() => setModalOuvert(true)}
            className="hidden lg:flex bg-button text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-valider transition items-center gap-2"
          >
            <FaPlus /> Ajouter une catégorie
          </button>
        </div>

        {/* Grille : 1 col mobile / 2 cols tablette / 3 cols desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mt-6 lg:mt-8">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-bordure overflow-hidden">

              <div className="h-28 lg:h-32 flex items-center justify-center" style={{ backgroundColor: cat.couleur }}>
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white bg-opacity-40 flex items-center justify-center text-3xl lg:text-4xl">
                  🍽️
                </div>
              </div>

              <div className="p-3 lg:p-4">
                {categorieEnModification === cat.id ? (
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-button text-xs mb-1">Nom de la catégorie</p>
                      <input type="text" defaultValue={cat.nom}
                        className="w-full border border-bordure rounded-xl px-3 py-2 text-secondary text-sm outline-none focus:border-button" />
                    </div>
                    <div>
                      <p className="text-button text-xs mb-1">Description</p>
                      <textarea defaultValue={cat.description}
                        className="w-full border border-bordure rounded-xl px-3 py-2 text-secondary text-sm outline-none focus:border-button h-16 resize-none" />
                    </div>
                    <div>
                      <p className="text-button text-xs mb-2">Couleur</p>
                      <div className="flex gap-2 flex-wrap">
                        {couleurs.map((c) => (
                          <div key={c} className="w-7 h-7 rounded-lg cursor-pointer border-2 border-transparent hover:border-button"
                            style={{ backgroundColor: c }} />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <button onClick={() => sauvegarderModification(cat.id)}
                        className="flex-1 bg-button text-white py-2 rounded-xl text-xs font-medium hover:bg-valider transition flex items-center justify-center gap-1">
                        Sauvegarder
                      </button>
                      <button onClick={() => setCategorieEnModification(null)}
                        className="flex-1 border border-bordure text-secondary py-2 rounded-xl text-xs font-medium hover:bg-gray-50 transition flex items-center justify-center gap-1">
                        <FaTimes /> Annuler
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-bold text-secondary text-base lg:text-lg">{cat.nom}</h2>
                    <p className="text-gray-400 text-xs lg:text-sm mt-1 line-clamp-2">{cat.description}</p>
                    <div className="flex gap-2 mt-3">
                      <div className="flex-1 border border-bordure rounded-xl p-2 text-center">
                        <p className="text-gray-400 text-xs">Restaurants</p>
                        <p className="font-bold text-secondary text-sm">{cat.restaurants}</p>
                      </div>
                      <div className="flex-1 border border-bordure rounded-xl p-2 text-center">
                        <p className="text-gray-400 text-xs">Plats</p>
                        <p className="font-bold text-secondary text-sm">{cat.plats}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => setCategorieEnModification(cat.id)}
                        className="flex-1 bg-button text-white py-2 rounded-xl text-xs lg:text-sm font-medium hover:bg-valider transition flex items-center justify-center gap-1">
                        <FaEdit /> Modifier
                      </button>
                      <button className="bg-secondary text-white p-2 rounded-xl hover:opacity-80 transition">
                        <FaTrash size={13} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOuvert && (
          <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl p-6 lg:p-8 w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl lg:text-2xl font-bold text-secondary mb-5">Nouvelle catégorie</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-secondary text-sm font-medium">Nom *</label>
                  <input type="text" value={nouvelleCategorie.nom}
                    onChange={(e) => setNouvelleCategorie({ ...nouvelleCategorie, nom: e.target.value })}
                    className="w-full border border-bordure rounded-xl px-4 py-3 mt-1 text-secondary text-sm outline-none focus:border-button bg-fond" />
                </div>
                <div>
                  <label className="text-secondary text-sm font-medium">Description</label>
                  <textarea value={nouvelleCategorie.description}
                    onChange={(e) => setNouvelleCategorie({ ...nouvelleCategorie, description: e.target.value })}
                    className="w-full border border-bordure rounded-xl px-4 py-3 mt-1 text-secondary text-sm outline-none focus:border-button bg-fond h-20 resize-none" />
                </div>
                <div>
                  <label className="text-secondary text-sm font-medium">Couleur</label>
                  <div className="flex gap-2 mt-2 flex-wrap items-center">
                    {couleurs.map((c) => (
                      <div key={c} onClick={() => setNouvelleCategorie({ ...nouvelleCategorie, couleur: c })}
                        className={`w-9 h-9 rounded-xl cursor-pointer border-2 transition-transform ${nouvelleCategorie.couleur === c ? "border-button scale-110" : "border-transparent"}`}
                        style={{ backgroundColor: c }} />
                    ))}
                    <button className="ml-auto bg-button text-white p-2 rounded-xl"><FaCamera /></button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
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