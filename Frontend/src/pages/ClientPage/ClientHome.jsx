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
import CategoriesPage from "./CategoriesPage";
function Home(){
    const navigate = useNavigate();
       {/* State pour afficher ou masquer le panier et les produits du panier */ }
    const [montrerPanier, setMontrerPanier] = useState(false);
    const [panier, setPanier] = useState([
        { id: 1, name: "Pizza Margherita", prix: 102 },
        { id: 2, name: "Burger Classique", prix: 10 },
        { id: 3, name: "Pizza Margherita", prix: 12 },
       
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
    {/*filtrer les plats */}
    const [texte, setTexte] = useState("");
    const platsFiltres = plats.filter((p) =>
        p.name.toLowerCase().includes(texte.toLowerCase())
    );
    {/*si l'utilisateur a saisi du texte, afficher les plats filtrés, sinon afficher tous les plats */}
    const affichagePlats = texte.trim() ? platsFiltres : plats;

   return(
    <div className=" flex justify-center flex-col ">
        {/* Navbar indépendante */}
        <NavbarHome />
            {/*la barre de panier historique plus+profil */}
          <div className="fixed top-8 right-20 flex items-center gap-6 z-50 ">
                {/*recherche */}
                <Recherche produits={plats} setProduitsFiltres={setTexte} />

                {/* Panier */}
                <button
                    className="p-3 rounded-full hover:bg-orange-100 transition"
                    onClick={() => setMontrerPanier(!montrerPanier)}
                    onBlur={()=>setMontrerPanier(!montrerPanier)}
                >
                    
                    <FaShoppingCart className="text-2xl text-secondary" />
                </button>
                
                {/* Profil (simple icône de personne) ,pas fait encore*/}
                <div className="p-3 rounded-full hover:bg-orange-100 transition">
                    <FaUser className="text-2xl text-secondary" />
                </div>

                </div>
                {/* Affichage Panier  */}
                {montrerPanier && (
                <div className="fixed top-20 right-150 z-50">
                    <Panier produits={panier} />
                </div>
                )}
     
        {/* Section cartes indépendante infos commande+livraison etc... */}
        <div className="flex flex-col md:flex-row gap-45 mt-45  justify-center items-center">
            <CardInfo icon={<FaMedal className="text-2xl text-white" />} hoverClass="hover:bg-gray-200" titre="Restaurants pertinaires" valeur="120" couleur="linear-gradient(to top right, #FF8339, #FF7629) " />
            <CardInfo icon={<FaChartLine className="text-2xl text-white" />} hoverClass="hover:bg-gray-200" titre="Commandes par jour" valeur="10K" couleur="linear-gradient(to top right, #10B981, #059669)" />
            <CardInfo icon={<FaTruck className="text-2xl text-white" />} hoverClass="hover:bg-gray-200" titre="Livraison moyenne" valeur="75" couleur="linear-gradient(to top right, #FFAC4A, #FF9544)" />
        </div>
            {/* En-tête de la section catégories avec un bouton "voir tout" */}
        <div className="flex flex-row  flex-wrap justify-between items-center  pt-10 ">
            <div>
                <h2 className="text-3xl font-semibold text-secondary mt-10 pl-6 pb-2 pt-15">Nos catégories</h2>
                <p className="text-xl font-light text-secondary pl-6 mt-1">explorez nos differents categories de plats</p>
            </div>
            {/* Bouton "voir tout" qui pourrait rediriger vers une page de catégories complète */ }
        <div className="cursor-pointer pr-10 pt-20 text-button text-xl" 
        
                  onClick={() => navigate("/categoriesPage")}//on change de page ici on nvaigue vers la page des catégories complète
>
            voir tout </div>
        </div>
        { /* conteneur de catégories */ }
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
         <div>
                {/* En-tête de la section plats populaires */}
            <h2 className="text-3xl font-semibold text-secondary mt-10 pl-6 pb-2 pt-4"> plats
                <span className="text-[#FE7D32]"> Populaires</span>
            </h2>
                <p className="text-xl font-light text-secondary pl-6 mt-1">découvrez nos plats les plus commandés</p>
        </div>
            {/* conteneur de plats populaires */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 pt-8">
                {affichagePlats.map((plat) => (
                    <PlatPopular key={plat.id} plat={plat} hoverClass={"hover:scale-110 transition-transform duration-300"} />
                ))}
         </div>
            {/* conteneur de restaurants populaires */}
        <h2 className="text-3xl font-semibold text-secondary mt-10 pl-6 pb-2 pt-4"> Restaurants 
            <span className="text-[#FE7D32]"> Populaires</span>
       </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 pt-8">
        {restaurantsPopulaires.map((restaurant) => (
          <RestaurantPopular
            key={restaurant.id}
            hoverClass="hover:scale-110 transition-transform duration-300"
            restaurant={restaurant}
          />
        ))}
      </div>
        {/*section footer */}
      <Footer />

    </div>
   
  )

}
export default Home;