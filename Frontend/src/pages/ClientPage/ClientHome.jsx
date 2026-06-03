import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api";
import { FaHistory, FaShoppingCart, FaTrash, FaTimes, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
// Composants
import NavbarHome from "../../composants/navbarHome";
import CategoryCard from "../../composants/categoryCard";
import PlatPopular from "../../composants/platPopular";
import RestaurantPopular from "../../composants/retaurantPopular";
import Footer from "../../composants/footer";
import Panier from "../../composants/panier";
import LuxuryInfiniteCircle from "../../composants/LuxuryInfiniteCircle";

// Assets
import pizza from "../../assets/pizza.png";
import burger from "../../assets/burger.png";
import tacos from "../../assets/tacos.png";
import sushi from "../../assets/sushi.png";
import resto1 from "../../assets/resto1.png";
import resto2 from "../../assets/resto2.png";
import resto3 from "../../assets/resto3.png";

// Data

// ON RÉCUPÈRE LES PROPS DEPUIS APP.JS
function Home({ panier, setPanier, ajouterAuPanier }) {
  const navigate = useNavigate();
  
  // ─── ÉTATS LOCAUX ───
  const [montrerPanier, setMontrerPanier] = useState(false);
  const [texteRecherche, setTexteRecherche] = useState("");
  const [plats, setPlats] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chargement, setChargement] = useState(true);

  // ─── CHARGEMENT DES DONNÉES ───
  useEffect(() => {
    const loadData = async () => {
      setChargement(true);
      try {
        const [categoriesRes, platsRes, restosRes] = await Promise.all([
          api.get('/categories'),
          api.get('/plats'),
          api.get('/utilisateurs/restaurateurs'),
        ]);

        setCategories(categoriesRes.data || []);
        setPlats((platsRes.data || []).map((plat) => ({
          ...plat,
          name: plat.nom,
          prix: parseFloat(plat.prix),
          image: plat.image || burger,
        })));
        setRestaurants((restosRes.data || []).map((resto) => ({
          id: resto.id,
          name: resto.nomRestaurant || `${resto.nom} ${resto.prenom || ''}`,
          image: resto.image || resto1,
        })));
      } catch (err) {
        console.error('Erreur chargement client:', err);
      } finally {
        setChargement(false);
      }
    };
    loadData();
  }, []);

  // Filtrage des plats
  const platsFiltrés = texteRecherche.trim() 
    ? plats.filter((p) => p.name.toLowerCase().includes(texteRecherche.toLowerCase()))
    : plats;

  return (
    <div className="flex flex-col bg-[#FFF9F5] min-h-screen overflow-x-hidden font-sans">
      
      {/* ─── NAVBAR (Utilise le panier global) ─── */}
      <NavbarHome 
        panierCount={panier ? panier.length : 0}
        onTogglePanier={() => setMontrerPanier(!montrerPanier)} 
        plats={plats}
        setTexteRecherche={setTexteRecherche}
        montrerPanier={montrerPanier}
      />

      {/* ─── PANIER FLOTTANT (Géré avec l'état global) ─── */}
      <AnimatePresence>
        {montrerPanier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-[300]"
          >
            <Panier 
              produits={panier} 
              setPanier={setPanier} 
              onClose={() => setMontrerPanier(false)} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full pt-28 md:pt-36">
        
        {/* ─── SECTION : NOS UNIVERS ─── */}
        <section id="univers" className="pb-16 px-4 md:px-20 max-w-[1600px] mx-auto">
          
          {/* HEADER AVEC TITRE ET BOUTON VOIR TOUT */}
          <header className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[#FE7D32] text-xs font-bold uppercase tracking-[4px] mb-2">Explorer par thème</p>
              <h2 className="text-4xl md:text-5xl font-black text-secondary uppercase tracking-tighter">
                Nos <span className="text-[#FE7D32]">Univers</span>
              </h2>
            </div>

            {/* LE BOUTON VOIR TOUT */}
            <button 
              onClick={() => navigate("/categoriesAll")} 
              className="group flex items-center gap-3 bg-white border border-gray-100 hover:border-[#FE7D32] px-5 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <span className="text-[10px] font-black text-secondary group-hover:text-[#FE7D32] uppercase tracking-[2px] ml-1">
                Voir tout
              </span>
              <div className="bg-[#FE7D32]/10 group-hover:bg-[#FE7D32] p-1.5 rounded-full text-[#FE7D32] group-hover:text-white transition-colors">
                <FaArrowLeft className="rotate-180" size={10} />
              </div>
            </button>
          </header>

          {/* TES CATÉGORIES (NE SURTOUT PAS SUPPRIMER) */}
          <div className="h-[450px] flex items-center justify-center">
            <LuxuryInfiniteCircle 
              data={categories} 
              itemWidth={300} 
              renderItem={(cat, isCenter) => (
                <div className={`transition-all duration-500 ease-out ${isCenter ? "scale-110 z-40 drop-shadow-2xl" : "opacity-40 scale-90 blur-[1px]"}`}>
                  <CategoryCard
                    category={cat}
                    couleur={cat.couleur}
                    onClick={() => {
                        if(isCenter) {
                            navigate("/categoriesPage", { state: cat });
                        }
                    }}
                  />
                </div>
              )}
            />
          </div>
        </section>

        {/* ─── SECTION : PLATS POPULAIRES ─── */}
        <section id="plats-populaires" className="py-16 px-4 md:px-20 max-w-[1600px] mx-auto">
          <header className="mb-10">
            <h2 className="text-4xl font-black text-secondary uppercase tracking-tighter">
              Plats <span className="text-[#FE7D32]">Populaires</span>
            </h2>
          </header>
          
          {chargement ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FE7D32]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {platsFiltrés.map((plat) => (
                <PlatPopular 
                  key={plat.id} 
                  plat={plat} 
                  onAjouter={() => ajouterAuPanier(plat)} 
                />
              ))}
            </div>
          )}
        </section>

        {/* ─── SECTION : RESTAURANTS POPULAIRES ─── */}
        <section id="partenaires" className="py-16 px-4 md:px-20 max-w-[1600px] mx-auto mb-20">
          <h2 className="text-4xl font-black text-secondary mb-10 uppercase tracking-tighter">
            Restaurants <span className="text-[#FE7D32]">Populaires</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {restaurants.map((res) => (
              <RestaurantPopular key={res.id} restaurant={res} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default Home;