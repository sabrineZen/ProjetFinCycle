import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarHome from "../../composants/navbarHome";
import CardInfo from "../../composants/cardInfo";
import CategoryCard from "../../composants/categoryCard";
import PlatPopular from "../../composants/platPopular";
import RestaurantPopular from "../../composants/retaurantPopular";
import Footer from "../../composants/footer";
import Panier from "../../composants/panier";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import Recherche from "../../composants/rechercheInput";
import HistoriqueAchats from "../../composants/historique";

function Home() {
  const navigate = useNavigate();
  const [montrerPanier, setMontrerPanier] = useState(false);
  const [panier, setPanier] = useState([
    { id: 1, name: "Pizza Margherita", prix: 102 },
    { id: 2, name: "Burger Classique", prix: 10 },
    { id: 3, name: "Pizza Margherita", prix: 12 },
    { id: 4, name: "Pizza carre", prix: 12 },

  ]);

  const categories = [
    { id: 1, name: "Plat traditionnel", couleur: "linear-gradient(to top right, #FFEFE7, #FFEBE1)" },
    { id: 2, name: "grillades", couleur: "linear-gradient(to top right, #FF8238, #FF7C31)" },
    { id: 3, name: "fastfood", couleur: "linear-gradient(to top right, #FFB391, #FFA67F)" },
    { id: 4, name: "Salades", couleur: "linear-gradient(to top right, #FFCEB2, #FFD9C3)" },
    { id: 5, name: "Desserts", couleur: "linear-gradient(to top right, #FF995D, #FF996D)" },
    { id: 6, name: "Boissons", couleur: "linear-gradient(to top right, #C76366, #C76370)" },
    { id: 7, name: "Plats asiatique", couleur: "linear-gradient(to top right, #FCCEC1, #FCCEC2)" },
  ];

  const plats = [
    { id: 1, name: "Pizza" },
    { id: 2, name: "Burger" },
    { id: 3, name: "Sushi" },
    { id: 4, name: "Tacos" },
    { id: 5, name: "Pâtes" },
  ];

  const restaurantsPopulaires = [
    { id: 1, name: "Pizza Margherita" },
    { id: 2, name: "Burger Classique" },
    { id: 3, name: "Sushi California Roll" },
    { id: 4, name: "Sushi California Roll" },
  ];

  const [texte, setTexte] = useState("");
  const platsFiltres = plats.filter((p) =>
    p.name.toLowerCase().includes(texte.toLowerCase())
  );
  const affichagePlats = texte.trim() ? platsFiltres : plats;

  return (
    <div className="flex justify-center flex-col">
      {/* Navbar */}
      <NavbarHome />

      {/* Barre panier + profil */}
      <div className="fixed top-4 sm:top-6 right-4 sm:right-8 md:right-20 flex items-center gap-3 sm:gap-6 z-50">
        <Recherche produits={plats} setProduitsFiltres={setTexte} />
        <button
            className={`p-3 rounded-full transition ${
                montrerPanier ? "bg-orange-100" : "hover:bg-orange-100"
            }`}
            onClick={() => setMontrerPanier(!montrerPanier)}
            >
            <FaShoppingCart className="text-2xl text-secondary" />
        </button>
        <div className="p-2 sm:p-3 rounded-full hover:bg-orange-100 transition">
          <FaUser className="text-xl sm:text-2xl text-secondary" />
        </div>
      </div>

      {/* Panier */}
      {montrerPanier && (
        <div className="fixed top-16 sm:top-20 right-2 sm:right-10 z-50">
          <Panier produits={panier} />
        </div>
      )}

      {/* Cards infos */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-6 mt-32 sm:mt-40 md:mt-45 justify-center items-center px-4">
        <CardInfo icon={<FaMedal className="text-xl sm:text-2xl text-white" />} hoverClass="hover:bg-gray-200" titre="Restaurants pertinaires" valeur="120" couleur="linear-gradient(to top right, #FF8339, #FF7629)" />
        <CardInfo icon={<FaChartLine className="text-xl sm:text-2xl text-white" />} hoverClass="hover:bg-gray-200" titre="Commandes par jour" valeur="10K" couleur="linear-gradient(to top right, #10B981, #059669)" />
        <CardInfo icon={<FaTruck className="text-xl sm:text-2xl text-white" />} hoverClass="hover:bg-gray-200" titre="Livraison moyenne" valeur="75" couleur="linear-gradient(to top right, #FFAC4A, #FF9544)" />
      </div>

      {/* Section catégories */}
      <div className="flex flex-row flex-wrap justify-between items-center pt-10 px-4 sm:px-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-secondary mt-6 sm:mt-10 pb-2 pt-6 sm:pt-15">Nos catégories</h2>
          <p className="text-base sm:text-xl font-light text-secondary mt-1">explorez nos differents categories de plats</p>
        </div>
        <div
          className="cursor-pointer pr-2 sm:pr-10 pt-6 sm:pt-20 text-button text-base sm:text-xl"
          onClick={() => navigate("/categoriesPage")}
        >
          voir tout
        </div>
      </div>

      <div className="flex space-x-4 p-4 pt-10 gap-5 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            hoverClass="hover:scale-110 transition-transform duration-300"
            category={cat}
            couleur={cat.couleur}
          />
        ))}
      </div>

      {/* Plats populaires */}
      <div className="px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-secondary mt-10 pb-2 pt-4">
          plats <span className="text-[#FE7D32]">Populaires</span>
        </h2>
        <p className="text-base sm:text-xl font-light text-secondary mt-1">découvrez nos plats les plus commandés</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 pt-8">
        {affichagePlats.map((plat) => (
          <PlatPopular key={plat.id} plat={plat} hoverClass="hover:scale-110 transition-transform duration-300" />
        ))}
      </div>

      {/* Restaurants populaires */}
      <div className="px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-secondary mt-10 pb-2 pt-4">
          Restaurants <span className="text-[#FE7D32]">Populaires</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 pt-8">
        {restaurantsPopulaires.map((restaurant) => (
          <RestaurantPopular
            key={restaurant.id}
            hoverClass="hover:scale-110 transition-transform duration-300"
            restaurant={restaurant}
          />
        ))}
      </div>

      <Footer />
    </div>
  );
}
export default Home;