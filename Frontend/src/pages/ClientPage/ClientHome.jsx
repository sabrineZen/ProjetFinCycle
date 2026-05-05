import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Composants
import NavbarHome from "../../composants/navbarHome";
import CategoryCard from "../../composants/categoryCard";
import PlatPopular from "../../composants/platPopular";
import RestaurantPopular from "../../composants/retaurantPopular";
import Footer from "../../composants/footer";
import Panier from "../../composants/panier";
import LuxuryInfiniteCircle from "../../composants/LuxuryInfiniteCircle";

// Data
import { categories as categoriesData } from "../../data/categories";

function Home() {
  const navigate = useNavigate();
  
  // ─── ÉTATS ───
  const [montrerPanier, setMontrerPanier] = useState(false);
  const [texteRecherche, setTexteRecherche] = useState("");
  const [panier, setPanier] = useState([]);
  const [plats, setPlats] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [chargement, setChargement] = useState(true);

  // ─── CHARGEMENT DES DONNÉES (Simulation API) ───
  useEffect(() => {
    const loadData = async () => {
      setChargement(true);
      setTimeout(() => {
        setPlats([
          { id: 1, name: "Burger Gourmet", prix: 13.50, image: "/burger.png" },
          { id: 2, name: "Pizza Royale", prix: 15.00, image: "/pizza.png" },
          { id: 3, name: "Sushi Mix", prix: 18.00, image: "/sushi.png" },
          { id: 4, name: "Tacos XL", prix: 12.00, image: "/tacos.png" },
        ]);
        setRestaurants([
          { id: 1, name: "Maison Opera", image: "/resto1.jpg" },
          { id: 2, name: "Le Palace", image: "/resto2.jpg" },
          { id: 3, name: "L'Ardoise", image: "/resto3.jpg" },
        ]);
        setChargement(false);
      }, 800);
    };
    loadData();
  }, []);

  const ajouterAuPanier = (plat) => {
    setPanier((prev) => [...prev, { ...plat, instanceId: Date.now() }]);
  };

  const platsFiltrés = texteRecherche.trim() 
    ? plats.filter((p) => p.name.toLowerCase().includes(texteRecherche.toLowerCase()))
    : plats;

  return (
    <div className="flex flex-col bg-[#FFF9F5] min-h-screen overflow-x-hidden font-sans">
      
      {/* ─── NAVBAR ─── */}
      <NavbarHome 
        panierCount={panier.length}
        onTogglePanier={() => setMontrerPanier(!montrerPanier)} 
        plats={plats}
        setTexteRecherche={setTexteRecherche}
        montrerPanier={montrerPanier}
      />

      {/* ─── PANIER FLOTTANT ─── */}
      <AnimatePresence>
        {montrerPanier && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setMontrerPanier(false)} 
              className="fixed inset-0 z-[250] bg-black/5 backdrop-blur-[4px]" 
            />
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: -20, scale: 0.95 }} 
              className="fixed top-[100px] right-4 md:right-16 z-[300] w-full max-w-[420px]"
            >
              <div className="bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden border border-white/50">
                <Panier 
                  produits={panier} 
                  setPanier={setPanier} 
                  onClose={() => setMontrerPanier(false)} 
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="w-full pt-28 md:pt-36">
        
        {/* ─── SECTION : NOS UNIVERS (Infinite Circle) ─── */}
        <section id="univers" className="pb-16 px-4 md:px-20 max-w-[1600px] mx-auto">
          <header className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[#FE7D32] text-xs font-bold uppercase tracking-[4px] mb-2">Explorer par thème</p>
              <h2 className="text-4xl md:text-5xl font-black text-secondary uppercase tracking-tighter">
                Nos <span className="text-[#FE7D32]">Univers</span>
              </h2>
            </div>
            
          </header>

          <div className="h-[450px] flex items-center justify-center">
            <LuxuryInfiniteCircle 
              data={categoriesData} 
              itemWidth={300} 
              renderItem={(cat, isCenter) => (
                <div className={`transition-all duration-500 ease-out ${isCenter ? "scale-110 z-40 drop-shadow-2xl" : "opacity-40 scale-90 blur-[1px]"}`}>
                  <CategoryCard
                    category={cat}
                    couleur={cat.couleur}
                    // CORRECTION ICI : On envoie l'objet 'cat' complet au state
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