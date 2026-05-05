import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Composants
import NavbarHome from "../../composants/navbarHome";
import CategoryCard from "../../composants/categoryCard";
import Footer from "../../composants/footer";
import Panier from "../../composants/panier";

// Data
import { categories as categoriesData } from "../../data/categories";

function AllCategories() {
  const navigate = useNavigate();
  
  // États pour la Navbar (Panier et Recherche)
  const [montrerPanier, setMontrerPanier] = useState(false);
  const [texteRecherche, setTexteRecherche] = useState("");
  const [panier, setPanier] = useState([]); // Idéalement, utilise un Context pour partager le panier entre Home et ici

  return (
    <div className="flex flex-col bg-[#FFF9F5] min-h-screen overflow-x-hidden font-sans">
      
      {/* NAVBAR : Identique au Home pour la cohérence */}
      <NavbarHome 
        panierCount={panier.length}
        onTogglePanier={() => setMontrerPanier(!montrerPanier)} 
        plats={[]} // Tu peux passer tes plats ici si tu veux la recherche
        setTexteRecherche={setTexteRecherche}
        montrerPanier={montrerPanier}
      />

      {/* PANIER FLOTTANT (Le même système que sur ton Home) */}
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
                <Panier produits={panier} setPanier={setPanier} onClose={() => setMontrerPanier(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CONTENU PRINCIPAL */}
      <main className="w-full pt-32 md:pt-40 px-6 md:px-20 max-w-[1600px] mx-auto flex-grow">
        
        {/* HEADER DE LA PAGE */}
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-[#FE7D32] text-xs font-bold uppercase tracking-[4px] mb-2">Catalogue complet</p>
            <h1 className="text-4xl md:text-6xl font-black text-secondary uppercase tracking-tighter">
              Toutes les <span className="text-[#FE7D32]">Catégories</span>
            </h1>
          </div>
          
          <button
            className="group flex items-center gap-3 font-bold text-secondary hover:text-[#FE7D32] transition-all"
            onClick={() => navigate(-1)}
          >
            <span className="text-2xl">←</span> RETOUR
          </button>
        </header>

        {/* GRILLE DES CATÉGORIES (Compatible Style Home) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-20">
          {categoriesData.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CategoryCard
                category={cat}
                couleur={cat.couleur}
                onClick={() => navigate("/categoriesPage", { state: cat })}
              />
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AllCategories;